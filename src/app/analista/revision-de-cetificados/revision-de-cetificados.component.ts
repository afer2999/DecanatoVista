import { Component, OnInit } from '@angular/core';
import { configuracion } from '../../recursos/config.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { recursosPublicaciones } from '../../recursos/interfaz';
import { rutasSWPublicaciones } from '../../rutasService/rutasServicios';
import jsPDF from 'jspdf'; 'jspdf'
import autoTable from 'jspdf-autotable'; 'jspdf-autotable';
import { AlertifyService } from 'src/app/recursos/alertify.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';
import { LoaderComponent } from '../../serviciosPublicaciones/loader/loader.component'

@Component({
  selector: 'app-revision-de-cetificados',
  templateUrl: './revision-de-cetificados.component.html',
  styleUrls: ['./revision-de-cetificados.component.css']
})
export class RevisionDeCetificadosComponent implements OnInit {
  private mr: any; Firmax: any = ""; Firmay: any = "";
  public vecArticulos: Array<any>; public vecCertificados: Array<any>;
  private vecAjustes: Array<any>; public vecSolicitudes: Array<any>;
  private numPagina: number; private urlFrima: string; public rutaCarga: SafeResourceUrl | undefined; private rutaFirma: string = '';
  private objRecupera64: any;

  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private confPublica: configuracion, private cargando: LoaderComponent,
    private swPublicacion: swPublicaciones, private modalService: NgbModal, private alerti: AlertifyService, private sanitizer: DomSanitizer) {
    this.vecArticulos = []; this.vecCertificados = []; this.numPagina = 2; this.urlFrima = '';
    this.vecAjustes = []; this.vecSolicitudes = [];
  }

  ngOnInit() {
    this.instanciaVariables();
    this.verTodosArticulos();
    this.verDataToken();
    this.Firmax = "85"; this.Firmay = "165";
  }

  async verTodosArticulos() {
    this.swPublicacion.getUsuarios(32, localStorage.getItem('loginID'), '1', '1', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecSolicitudes = data.usuario;
      }
    })

    this.swPublicacion.getUsuarios(31, 'na', '1', '1', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecAjustes = data.usuario;
      }
    })

  }
  //TRANSFORMAR EL 64 EN BLOB
  dataURItoBlob(base64: any, fileName: string): File {
    this.cargando.abrir();
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blobData = new Blob([bytes], { type: 'application/pdf' });
    return new File([blobData], fileName, { type: 'application/pdf' });
    this.cargando.cerrar();
  };
  //CARGAMOS LOS ARCHIVOS AL DRIVE
  async cargaDrive(archivo: any, token: any, raiz: string, numSolicita: any) {
    this.cargando.abrir();
    let formArchivo = new FormData();
    formArchivo.append('idAplicacion', rutasSWPublicaciones.idAppArchivo);
    formArchivo.append('idCredencial', "1");
    formArchivo.append('activo', "true");
    formArchivo.append('ruta', raiz);
    formArchivo.append('file', archivo);
    this.swPublicacion.subirArchivos(formArchivo, token).subscribe(data => {
      if (data.success) {
        this.swPublicacion.postAddUsuario(numSolicita, raiz, 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 21).subscribe((data: any) => {
          this.swPublicacion.getUsuarios(24, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
            if (data.success) {
              this.verTodosArticulos();
              this.alerti.success('Archivo cargado');
              this.instanciaVariables();
              this.verTodosArticulos();
              this.cerrrarModal();
            }
          })
        });
      }
    });
    this.cargando.cerrar();
  }
  //VER EL TOKEN REGISTRADO EN LA BASE DE DATOS
  async verDataToken() {
    this.swPublicacion.getUsuarios(25, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('archivoToken', data.usuario[0]['strToken']);
      }
      else {
        this.swPublicacion.postTokenPDF().subscribe((data: any) => {
          if (data.success) {
            this.swPublicacion.postAddUsuario(data.token, data.created, data.exp, localStorage.getItem('loginID'), 'na', 'na', 'na',
              'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 15).subscribe((data: any) => {
                this.verDataToken();
              });
          }
        });
      }
    })
  }
  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecAjustes = [];
  }
  //ABRE EL MODAL QUE MUESTRA EL CERTIFICADO FIRMADO
  async verArticulos(objConsulta: any, nombModal: any) {
    this.rutaCarga = '';
    this.mr = this.modalService.open(nombModal);
    await this.verDataToken();
    this.swPublicacion.mostrarArchivo(localStorage.getItem('archivoToken'), objConsulta.rutaCertificado.toString()).subscribe((data: any) => {
      if (data.success) {
        this.construirPDF(data.download);
      }
    })
  }
  //CONTRUYE EL PDF PARA FIRMAR
  async mostrarCertificado(objFirma: any, nombModal: any) {
    this.rutaCarga = ''; this.rutaFirma = ''; this.objRecupera64 = objFirma;

    if (objFirma.intTipoCertificado == 4) {
      await this.generarPDFConsolidado(objFirma);
      this.mr = this.modalService.open(nombModal);
    }
    if (objFirma.intTipoCertificado == 2) {
      await this.generarPDFContrato(objFirma);
      this.mr = this.modalService.open(nombModal);
    }
  }
  //HCER LA PETICION AL TRANSVERSAL DE FIRMAEC DESDE EL BOTON DEL MODAL
  firmarArchivo() {
    this.vecCertificados = [];
    this.vecCertificados.push({ "nombre": '202301', "archivo": this.rutaFirma });
    this.AbrirFirmaEc();
  }
  //ABRIMOS EL TRANSVERSAL DE FIRMAEC
  async AbrirFirmaEc() {
    var content = {
      "idAplicacion": rutasSWPublicaciones.idAppArchivo,
      "jwtsecret": rutasSWPublicaciones.claveArchivo,
      "activo": "true",
      "cedula": localStorage.getItem('loginCedula'),
      "listado": this.vecCertificados
    };
    await this.verDataToken();
    const datos = await new Promise<any>((resolve) => this.confPublica.FirmarEc(localStorage.getItem('archivoToken'), content).subscribe((translated) => { resolve(translated); }));
    if (datos.success) {
      this.urlFrima = "firmaec://" + recursosPublicaciones.keyFirmaEC + "/firmar?token=" + datos.data + "&tipo_certificado=2%26llx%3D" + this.Firmax + "%26lly%3D"
        + this.Firmay + "%26pagina%3D" + this.numPagina + "%26estampado%3DQR%26url%3Dhttp%3A%2F%2Fapifirmaec.espoch.edu.ec%2Fapi%26razon%3Dfirmado%20desde%20https%3A%2F%2Fsai.espoch.edu.ec";
      window.open(this.urlFrima, '_blank');
    }
  }
  //RECUPERAMOS EL ARCHIVO FIRMADO Y GUARDAMOS EN EL DRIVE
  subirFirma() {
    let archivoFile: any;
    let rutaFirma = 'publicaciones/certificados/' + this.objRecupera64.nomCertificado + '/' + this.objRecupera64.strCedula + '_' + this.objRecupera64.intIdCertificado + '.pdf';
    this.swPublicacion.obtener64Firmado(localStorage.getItem('archivoToken')).subscribe((data: any) => {
      if (data.success) {
        archivoFile = this.dataURItoBlob(data.listado[0]['archivoFirmado'], this.objRecupera64.strCedula + '_' + this.objRecupera64.intIdCertificado + '.pdf');//OBTENGO EL FILE
        this.cargaDrive(archivoFile, localStorage.getItem('archivoToken'), rutaFirma, this.objRecupera64.intIdCertificado);
      }
    })
  }
  //CERTIFICADO CONSOLIDADO
  generarPDFConsolidado(objSolicita: any) {console.log(objSolicita)
    let numLineas: number = 95; let numColumnas: number = 20;
    var imgData = '';
    var imgData = recursosPublicaciones.imagenBase64Poli;

    let vecAdd: any[] = [];

    this.swPublicacion.getUsuarios(33, objSolicita.intIdPersona, '1', '1', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        for (let objSol of data.usuario) {
          numLineas += 15;
          vecAdd.push([objSol.nombTipo, objSol.strNombreArticulo, objSol.detallePublicacion, objSol.strPais + '\n ' + objSol.dateFechaPublicacion.split('T')[0],
          objSol.bitPertinencia == true ? 'SI' : 'NO']);
        }

        const doc = new jsPDF('p', 'mm', 'letter');
        doc.setFont("bolditalic", "italic", "bold");
        doc.setFontSize(11);
        doc.text(this.vecAjustes[0]['strNombre'] + '\n' + this.vecAjustes[0]['strDetalle'], 125, 33);

        doc.setFontSize(17);
        doc.setFont("helvetica", "bold");
        doc.text('CERTIFICA', 90, 50);

        doc.setFont("bolditalic", "courier");
        doc.setFontSize(10);
        doc.text('Que ' + objSolicita.strNombres + ' ' + objSolicita.strApellidos + ', Cédula de identidad No. ' +
          objSolicita.strCedula + ', ' + objSolicita.strCargo + ' de la ' + objSolicita.strDependencia
          + 'ha publicado los siguientes: artículos científicos en revistas indexadas u obras de relevancia.', 13, 57, { align: 'justify', lineHeightFactor: 1.5, maxWidth: 185 });

        autoTable(doc, {
          margin: { top: 75 },
          headStyles: { halign: 'center' },
          bodyStyles: { fontSize: 10 },
          head: [['TIPO DE PUBLICACIÓN', 'TÍTULO DEL ARTÍCULO U OBRA DE RELEVANCIA', 'DESCRIPCIÓN DE LA PUBLICACIÓN',
            'PAIS AÑO Y FECHA DE PUBLICACIÓN', 'PERTINENCIA']],
          body: vecAdd,
        })

        doc.setFont("helvetica", "italic", "bold");
        doc.setFontSize(11);
        doc.text('OBSERVACIONES: La presente certificación es emitida luego de la verificación de las publicaciones en las distintas bases de datos; debido a la evaluación '
          + 'que están sujetas las diferentes revistas.', 13, numLineas, { align: 'justify', lineHeightFactor: 1.2, maxWidth: 185 })

        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        doc.text('Es todo lo que puedo certificar, luego de la respectiva verificación en la base de datos de la Producción Científica de la Dirección de Publicaciones.',
          13, numLineas + 13, { align: 'justify', lineHeightFactor: 1.2, maxWidth: 185 })


        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        var fecha = new Date();
        doc.text('Riobamba,' + fecha.getDate() + ' de ' + this.verMes(fecha.getMonth()) + ' de ' + fecha.getFullYear(),
          125, numLineas + 26, { align: 'left', lineHeightFactor: 1.2, maxWidth: 185 })

        this.Firmay = numLineas + 50;
        this.Firmax = numColumnas + 170;
        doc.text(this.vecAjustes[0]['strNombre'] + '\n' + this.vecAjustes[0]['strDetalle'], 85, numLineas + 50);

        doc.setFont("bolditalic", "italic", "bold");
        doc.setFontSize(9);
        doc.text('Revisado por: ' + this.vecAjustes[1]['strNombre'] + '\n' + this.vecAjustes[2]['strNombre'], 13, numLineas + 63);
        this.rutaCarga = this.bypassAndSanitize('data:application/pdf;base64,' + btoa(doc.output()));
        this.rutaFirma = btoa(doc.output());
      }
      else
        this.alerti.error('No se puede generar');
    })
  }
  //CERTIFICADO DE CONTRATO
  async generarPDFContrato(objSolicita: any) {
    let numLineas: number = 95; let numColumnas: number = 20;
    var imgData = '';
    var imgData = recursosPublicaciones.imagenBase64Poli;

    let vecAdd: any[] = [];
    this.swPublicacion.getUsuarios(34, objSolicita.intIdPersona, '1', '1', 'na', 'na').subscribe((data: any) => {
      console.log(data)
      if (data.success) {
        console.log(data)
        console.log(data.usuario[0]['intContrato'])
        for (let objSol of data.usuario) {
          numLineas += 25;
          vecAdd.push([objSol.nombTipo, objSol.strNombreArticulo, objSol.detallePublicacion, objSol.intEstado == 1 ? 'PUBLICADO' : 'ACEPTADO', objSol.bitFilial == true ? 'SI' : 'NO',
          objSol.strPais + '\n ' + objSol.dateFechaPublicacion.split('T')[0], objSol.intTipoObra == 11 ? 'Revista Regional' : objSol.intTipoObra == 11 ? 'Revista Científica' : '',
          objSol.intTipoObra == 1 ? 'Revisado por pares' : objSol.intTipoObra == 3 ? 'Congreso Indexado' : objSol.intTipoObra == 1 ? 'Indexado en SCOPUS' : '']);
        }

        const doc = new jsPDF('p', 'mm', 'letter');
        doc.setFont("bolditalic", "italic", "bold");
        doc.setFontSize(11);
        doc.text(this.vecAjustes[0]['strNombre'] + '\n' + this.vecAjustes[0]['strDetalle'], 125, 33);

        doc.setFontSize(17);
        doc.setFont("helvetica", "bold");
        doc.text('CERTIFICA', 90, 50);

        doc.setFont("bolditalic", "courier");
        doc.setFontSize(8);
        doc.text('Que ' + objSolicita.strNombres + ' ' + objSolicita.strApellidos + ', Cédula de identidad No. ' + objSolicita.strCedula + ', ' + objSolicita.strCargo + ' de la '
          + objSolicita.strDependencia + ', ha publicado los siguientes: artículos científicos en revistas indexadas u obras de relevancia considerado en función a lo que establece la '
          + 'Resolución 429.CP.2022,  que aprueba las directrices Institucionales establecidas en los CONTRATOS DE PROFESORES OCASIONALES  SOBRE PUBLICACIONES E INVESTIGACIÓN.', 13, 57, { align: 'justify', lineHeightFactor: 1.5, maxWidth: 185 });

        autoTable(doc, {
          margin: { top: 75 },
          headStyles: { halign: 'center' },
          bodyStyles: { fontSize: 10 },
          head: [['TIPO OBRA', 'TÍTULO', 'DESCRIPCIÓN', 'ESTADO', 'FILIAL ESPOCH', 'PAÍS FECHA DE PUBLICACIÓN', 'REVISTA INDEXADA REGIONAL/CIENTÍFICA', 'OBRA DE RELEVANCIA']],
          body: vecAdd,
        })

        doc.setFont("helvetica", "italic", "bold");
        doc.setFontSize(11);
        doc.text('APLICACIÓN DE LA RESOLUCIÓN:   ' + (data.usuario[0]['intContrato'] == 1 ? 'SI ' : 'NO ') + 'CUMPLE', 13, numLineas, { align: 'justify', lineHeightFactor: 1.2, maxWidth: 185 })

        doc.setFont("helvetica", "italic", "bold");
        doc.setFontSize(11);
        doc.text('OBSERVACIONES: La presente certificación es emitida luego de la verificación de las publicaciones en las distintas bases de datos; debido a la '
          + 'evaluación que están sujetas las diferentes revistas y congresos', 13, numLineas + 10, { align: 'justify', lineHeightFactor: 1.2, maxWidth: 185 })

        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        doc.text('Es todo lo que puedo certificar, luego de la respectiva verificación en la base de datos de la Producción Científica de la Dirección de Publicaciones.',
          13, numLineas + 26, { align: 'justify', lineHeightFactor: 1.2, maxWidth: 185 })


        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        var fecha = new Date();
        doc.text('Riobamba,' + fecha.getDate() + ' de ' + this.verMes(fecha.getMonth()) + ' de ' + fecha.getFullYear(),
          125, numLineas + 40, { align: 'left', lineHeightFactor: 1.2, maxWidth: 185 })

        this.Firmay = numLineas + 63;
        this.Firmax = numColumnas + 170;

        doc.text(this.vecAjustes[0]['strNombre'] + '\n' + this.vecAjustes[0]['strDetalle'], 85, numLineas + 63);

        doc.setFont("bolditalic", "italic", "bold");
        doc.setFontSize(9);
        doc.text('Revisado por: ' + this.vecAjustes[1]['strNombre'] + '\n' + this.vecAjustes[2]['strNombre'], 13, numLineas + 71);
        this.rutaCarga = this.bypassAndSanitize('data:application/pdf;base64,' + btoa(doc.output()));
        this.rutaFirma = btoa(doc.output());
      }
      else
        this.alerti.error('No se puede generar');
    })
  }
  //OBTENER EL 64 COMPLETO Y SANITIZAR
  async construirPDF(ruta: any) {
    let rutaLocal: any = await this.toDataURL(ruta);
    this.rutaCarga = this.bypassAndSanitize(rutaLocal)
  }
  //CONVERTIR UNA RUTA EN BASE 64
  toDataURL = async (url: any) => {
    var res = await fetch(url);
    var blob = await res.blob();
    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    return result
  };
  //DEPURA LA URL CONVERTIDA EN BASE 64
  bypassAndSanitize(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  verMes(numMes: any) {
    return numMes == 0 ? 'enero' : numMes == 1 ? 'febrero' : numMes == 2 ? 'marzo' : numMes == 3 ? 'abril' : numMes == 4 ? 'mayo' : numMes == 5 ? 'junio' : numMes == 6 ? 'julio' :
      numMes == 7 ? 'agosto' : numMes == 8 ? 'septiembre' : numMes == 9 ? 'octubre' : numMes == 10 ? 'noviembre' : 'diciembre';
  }
  cerrrarModal() {
    this.mr.close();
  }
}

