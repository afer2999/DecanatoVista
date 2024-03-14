import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertifyService } from 'src/app/recursos/alertify.service';


@Component({
  selector: 'app-articulos-cientificos',
  templateUrl: './articulos-cientificos.component.html',
  styleUrls: ['./articulos-cientificos.component.css']
})
export class ArticulosCientificosComponent implements OnInit {
  private mr: any;
  public vecUsuarios: Array<any>; public vecArticulo: Array<any>; public vecPersonaArticulo: Array<any>; private numRegistro: any;
  public vecArtCongreso: Array<any>; public vecLibro: Array<any>; public vecProcedencia: Array<any>;
  private documento01: any; private documento02: any; private documento03: any; private documento04: any; private documento05: any; private documento06: any;
  public rutaCarga: SafeResourceUrl | undefined;
  private opcion = 11;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private alerti: AlertifyService,
    private swPublicacion: swPublicaciones, private modalService: NgbModal, private sanitizer: DomSanitizer) {
    this.vecUsuarios = []; this.vecArticulo = [];
    this.vecPersonaArticulo = []; this.vecArtCongreso = []; this.vecLibro = []; this.vecProcedencia = [];
  }

  ngOnInit() {
    this.instanciaVariables();
    this.verCargasArticulos();
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
  //VER LOS ARCHIVOS CARGADOS
  async verCargasArticulos() {
    this.swPublicacion.getUsuarios(18, localStorage.getItem('loginID'), 2, 3, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecUsuarios = data.usuario;
      }
    })
    //CARGAMOS LAS PROCEDENCIAS
    this.swPublicacion.getUsuarios(21, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecProcedencia = data.usuario;
      }
    })
  }
  //ABRIR UN MODAL
  modalAddUsuario(nombModal: any, numop: any) {
    this.opcion = numop;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }
  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecArticulo = []; this.vecPersonaArticulo = []; this.numRegistro = 0; this.vecArtCongreso = []; this.vecLibro = [];
    this.documento01 = ''; this.documento02 = ''; this.documento03 = ''; this.documento04 = ''; this.documento05 = ''; this.documento06 = '';
    this.vecArticulo.push({
      intIdArticulo: '', strCodigoArticulo: '', strNombreArticulo: '', strDescripcion: '', enlace: '', intCampo: 1,
      intLineasInvestigacion: 1, intProcedencia: 1, dateFechaPublicacion: '', bitComision: 1, intEstado: 1, registro: localStorage.getItem('loginID'), distributivo: ''
    })
    this.vecPersonaArticulo.push({
      intArticulo: 0, intPersona: localStorage.getItem('loginID'), bitFilial: 0, bitPertinencia: 0,
      intEstado: 1, distributivo: ''
    });
    this.vecArtCongreso.push({
      intArticulo: 0, strDescripcion: '', textLinkArticuloCongreso: '', textLibrodeMemoria: '', textCartadeAceptacion: '',
      textCertificadoPonente: '', intTipoObra: 3, intCongreso: 1, bitComision: 1, intEstado: 2
    });
    this.vecLibro.push({ isbn: '', pares: '' })
  }
  //REGISTRO DE INFORMACION EN LA TABLA DE ARTICULOS
  ingresoArticulo(op: any) {
    if ((op == 1) && (this.documento01 == '' || this.documento02 == ''))
      this.alerti.error('complete todos los campos');
    else
      if ((op == 2) && (this.documento02 == '' || this.documento03 == '' || this.documento04 == '' || this.documento05 == ''))
        this.alerti.error('complete todos los campos');
      else
        if ((op == 3) && (this.documento06 == '' || this.documento02 == ''))
          this.alerti.error('complete todos los campos');
        else {
          this.swPublicacion.postAddUsuario(this.vecArticulo[0]['intIdArticulo'], this.vecArticulo[0]['strCodigoArticulo'],
            this.vecArticulo[0]['strNombreArticulo'], this.vecArticulo[0]['strDescripcion'],
            this.vecArticulo[0]['intCampo'], this.vecArticulo[0]['intLineasInvestigacion'], this.vecArticulo[0]['intProcedencia'],
            this.vecArticulo[0]['dateFechaPublicacion'], this.vecArticulo[0]['bitComision'], this.vecArticulo[0]['intEstado'],
            this.vecArticulo[0]['registro'], 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
              this.swPublicacion.getUsuarios(24, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
                if (data.success) {
                  this.numRegistro = data.usuario[0]['intIdArticulo'];
                  this.ingresoPersonaArticulo(this.generaRutas(op == 1 ? 2 : op == 2 ? 6 : 8, data.usuario[0]['intIdArticulo']), op);
                }
              })
            });
        }
  }
  //REGISTRAMOS EL DISTRIBUTIVO PARA EL ARTICULO REGISTRADO
  ingresoPersonaArticulo(rutaArchivo: any, num: any) {
    this.swPublicacion.postAddUsuario(this.numRegistro, this.vecPersonaArticulo[0]['intPersona'],
      this.vecPersonaArticulo[0]['bitFilial'], this.vecPersonaArticulo[0]['bitPertinencia'],
      2, rutaArchivo, 'na', 'na', 'na', 'na',
      'na', 'na', 'na', 'na', 'na', 12).subscribe((data: any) => {
        this.tokenDrive(this.documento02, rutaArchivo);
        if (num == 1)
          this.ingresoArticuloCientifico();
        if (num == 2)
          this.ingresoArticuloCongreso();
        if (num == 3)
          this.ingresoLibro();
      });
  }
  //INGRESAMOS UN ARTICULO CIENTIFICO
  ingresoArticuloCientifico() {
    this.swPublicacion.postAddUsuario(this.vecPersonaArticulo[0]['intPersona'], '', '', '', 1, 1, 1,
      1, '', '', '', this.generaRutas(1, this.numRegistro), 0, 1, this.vecArticulo[0]['intProcedencia'], 8).subscribe((data: any) => {

        this.tokenDrive(this.documento01, this.generaRutas(1, this.numRegistro));
        this.verCargasArticulos();
        this.mr.close();
        this.alerti.success('Articulo científico registrado correctamente');
      });
  }
  // INGRESAMOS UN ARTICULO A UN CONGRESO
  ingresoArticuloCongreso() {
    this.swPublicacion.postAddUsuario(this.numRegistro, '', this.vecArtCongreso[0]['textLibrodeMemoria'], this.generaRutas(3, this.numRegistro),
      this.generaRutas(4, this.numRegistro), this.generaRutas(5, this.numRegistro), 1, 1, 0, this.vecArticulo[0]['intProcedencia'], 'na', 'na', 'na', 'na', 'na', 16).subscribe((data: any) => {

        this.tokenDrive(this.documento03, this.generaRutas(3, this.numRegistro));
        this.tokenDrive(this.documento04, this.generaRutas(4, this.numRegistro));
        this.tokenDrive(this.documento05, this.generaRutas(5, this.numRegistro));
        this.verCargasArticulos();
        this.mr.close();
        this.alerti.success('Articulo de congreso registrado correctamente');
      });
  }
  //REGISTRO DE UN LIBRO
  ingresoLibro() {
    this.swPublicacion.postAddUsuario(this.numRegistro, '', this.vecLibro[0]['isbn'], 1, 0, 0, this.vecLibro[0]['pares'], this.generaRutas(7, this.numRegistro),
      'na', 'na', 'na', 'na', 'na', 'na', 'na', 17).subscribe((data: any) => {

        this.tokenDrive(this.documento06, this.generaRutas(7, this.numRegistro));
        this.verCargasArticulos();
        this.mr.close();
        this.alerti.success('Libro registrado correctamente');
      });
  }
  verArchivoCarga(objRegistro: any) {
    console.log(objRegistro)
  }
  //OBTENER EL EVENTO DEL UPLOAD PARA LA CARGA DE ARCHIVOS
  cargandoArchivos(evt: any, op: any) {
    const file = evt.target.files[0];
    if (file) {
      if (op == 1)
        this.documento01 = file;
      if (op == 2)
        this.documento02 = file;
      if (op == 3)
        this.documento03 = file;
      if (op == 4)
        this.documento04 = file;
      if (op == 5)
        this.documento05 = file;
      if (op == 6)
        this.documento06 = file;
    }
  }
  //OBTENER EL TOKEN PARA LA CARGA DE ARCHIVOS
  async tokenDrive(archivo: any, ruta: string) {
    await this.verDataToken();
    this.cargaDrive(archivo, localStorage.getItem('archivoToken'), ruta);
  }
  //CARGAMOS LOS ARCHIVOS AL DRIVE
  async cargaDrive(archivo: any, token: any, raiz: string) {
    let formArchivo = new FormData();
    formArchivo.append('idAplicacion', "1");
    formArchivo.append('idCredencial', "1");
    formArchivo.append('activo', "true");
    formArchivo.append('ruta', raiz);
    formArchivo.append('file', archivo);
    this.swPublicacion.subirArchivos(formArchivo, token).subscribe(data => {
      console.log(data);
    });
  }

  async verArticulos() {
    await this.verDataToken();
    this.swPublicacion.mostrarArchivo(localStorage.getItem('archivoToken'), "publicaciones/2023/articulos/cartas/0604120550_1212.pdf").subscribe((data: any) => {
      if (data.success) {
        this.rutaCarga = this.bypassAndSanitize(this.toDataURL(data.download));
      }
    })
  }

  bypassAndSanitize(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

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

  //GENERAMOS LAS RUTAS DONDE SE ALOJAN LOS ARCHIVOS
  generaRutas(op: number, numero: string) {
    var today = new Date();
    var year = today.getFullYear();
    if (op == 1)
      return ("publicaciones/" + year + "/articulos/cartas/" + localStorage.getItem('loginCedula') + "_carta_" + numero + ".pdf");
    if (op == 2)
      return ("publicaciones/" + year + "/articulos/distributivos/" + localStorage.getItem('loginCedula') + "_distributivo_" + numero + ".pdf");

    if (op == 3)
      return ("publicaciones/" + year + "/congresos/articulo/" + localStorage.getItem('loginCedula') + "_articulo_" + numero + ".pdf");
    if (op == 4)
      return ("publicaciones/" + year + "/congresos/cartas/" + localStorage.getItem('loginCedula') + "_carta_" + numero + ".pdf");
    if (op == 5)
      return ("publicaciones/" + year + "/congresos/certificado/" + localStorage.getItem('loginCedula') + "_certificado_" + numero + ".pdf");
    if (op == 6)
      return ("publicaciones/" + year + "/congresos/distributivos/" + localStorage.getItem('loginCedula') + "_distributivo_" + numero + ".pdf");

    if (op == 7)
      return ("publicaciones/" + year + "/libros/publicacion/" + localStorage.getItem('loginCedula') + "_libro_" + numero + ".pdf");
    if (op == 8)
      return ("publicaciones/" + year + "/libros/distributivos/" + localStorage.getItem('loginCedula') + "_distributivo_" + numero + ".pdf");
    else
      return '';
  }

  cerrrarModal() {
    this.mr.close();
  }
}
