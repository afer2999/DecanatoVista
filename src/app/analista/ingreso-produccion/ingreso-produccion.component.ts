import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertifyService } from 'src/app/recursos/alertify.service';
import { rutasSWPublicaciones } from 'src/app/rutasService/rutasServicios';

@Component({
  selector: 'app-ingreso-produccion',
  templateUrl: './ingreso-produccion.component.html',
  styleUrls: ['./ingreso-produccion.component.css']
})
export class IngresoProduccionComponent implements OnInit {
  private mr: any;
  public vecUsuarios: Array<any>; public vecArticulo: Array<any>; public vecPersonaArticulo: Array<any>; private numRegistro: any;
  public vecArtCongreso: Array<any>; public vecLibro: Array<any>; public vecProcedencia: Array<any>; public vecAutores: Array<any>;
  public vecBuscaAutores: Array<any>;
  private documento01: any; private documento02: any; private documento03: any; private documento04: any; private documento05: any; private documento06: any;
  public rutaCarga: SafeResourceUrl | undefined; public enlaceCarga: string = '';
  private opcion = 11; private intNumRegistro: number;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private alerti: AlertifyService,
    private swPublicacion: swPublicaciones, private modalService: NgbModal, private sanitizer: DomSanitizer) {
    this.vecUsuarios = []; this.vecArticulo = [];
    this.vecPersonaArticulo = []; this.vecArtCongreso = []; this.vecLibro = []; this.vecProcedencia = []; this.vecAutores = [];
    this.vecBuscaAutores = []; this.intNumRegistro = -1;
  }

  ngOnInit() {
    this.instanciaVariables();
    this.verCargasArticulos();
    this.verDataToken();
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
    this.vecUsuarios = [];
    this.swPublicacion.getUsuarios(44, localStorage.getItem('loginID'), 2, 3, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        for (let objProd of data.usuario) {
          var buscar = this.vecUsuarios.filter(item => item.intIdArticulo == objProd.intIdArticulo)
          if (buscar.length == 0)
            this.vecUsuarios.push(objProd)
        }
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
  //MODAL PARA AGREGAR VER/AUTORES
  verModAutores(objUser: any, nombModal: any) {
    this.instanciaVariables();
    this.vecBuscaAutores[0]['articulo'] = objUser.intArticulo;
    this.verAutores(objUser.intArticulo);
    this.mr = this.modalService.open(nombModal);
  }
  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecArticulo = []; this.vecPersonaArticulo = []; this.numRegistro = 0; this.vecArtCongreso = []; this.vecLibro = []; this.vecBuscaAutores = [];
    this.documento01 = ''; this.documento02 = ''; this.documento03 = ''; this.documento04 = ''; this.documento05 = ''; this.documento06 = '';
    this.vecArticulo.push({
      intIdArticulo: '', strCodigoArticulo: '', strNombreArticulo: '', strDescripcion: '', enlace: '', intCampo: 1,
      intLineasInvestigacion: 1, intProcedencia: 1, dateFechaPublicacion: '', bitComision: 1, intEstado: 1, registro: '-1', distributivo: ''
    })
    this.vecPersonaArticulo.push({
      intArticulo: 0, intPersona: '-1', bitFilial: 0, bitPertinencia: 0,
      intEstado: 1, distributivo: ''
    });
    this.vecArtCongreso.push({
      intArticulo: 0, strDescripcion: '', textLinkArticuloCongreso: '', textLibrodeMemoria: '', textCartadeAceptacion: '',
      textCertificadoPonente: '', intTipoObra: 3, intCongreso: 1, bitComision: 1, intEstado: 2
    });
    this.vecLibro.push({ isbn: '', pares: '' });
    this.vecBuscaAutores.push({ codigo: '', cedula: '', nombres: '', cargo: '', dependencia: '', articulo: '' });
    this.intNumRegistro = -1;
  }
  //REGISTRO DE INFORMACION EN LA TABLA DE ARTICULOS
  ingresoArticulo(op: any) {
    if ((op == 1) && (this.documento01 == '' || this.intNumRegistro == -1))
      this.alerti.error('complete todos los campos');
    else
      if ((op == 2) && (this.documento03 == '' || this.documento04 == '' || this.documento05 == '' || this.intNumRegistro == -1))
        this.alerti.error('complete todos los campos');
      else
        if ((op == 3) && (this.documento02 == '' || this.intNumRegistro == -1))
          this.alerti.error('complete todos los campos');
        else {
          this.swPublicacion.postAddUsuario(this.vecArticulo[0]['intIdArticulo'], this.vecArticulo[0]['strCodigoArticulo'],
            this.vecArticulo[0]['strNombreArticulo'], this.vecArticulo[0]['strDescripcion'],
            this.vecArticulo[0]['intCampo'], this.vecArticulo[0]['intLineasInvestigacion'], this.vecArticulo[0]['intProcedencia'],
            this.vecArticulo[0]['dateFechaPublicacion'], this.vecArticulo[0]['bitComision'], this.vecArticulo[0]['intEstado'],
            this.intNumRegistro, 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
              this.swPublicacion.getUsuarios(24, this.intNumRegistro, 'na', 'na', 'na', 'na').subscribe((data: any) => {
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
    this.swPublicacion.postAddUsuario(this.numRegistro, this.intNumRegistro,
      this.vecPersonaArticulo[0]['bitFilial'], this.vecPersonaArticulo[0]['bitPertinencia'],
      2, '-', 'na', 'na', 'na', 'na',
      'na', 'na', 'na', 'na', 'na', 12).subscribe((data: any) => {
        //this.tokenDrive(this.documento02, rutaArchivo);
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
    this.swPublicacion.postAddUsuario(this.intNumRegistro, '', '', '', 1, 1, 1,
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

        this.tokenDrive(this.documento02, this.generaRutas(7, this.numRegistro));
        this.verCargasArticulos();
        this.mr.close();
        this.alerti.success('Libro registrado correctamente');
      });
  }
  async verArchivoCarga(nombModal: any, rutaArchivo: any) {
    this.rutaCarga = ''; this.enlaceCarga = '';
    if (rutaArchivo == '-')
      this.alerti.warning('Archivo no disponible');
    else {
      await this.verDataToken();
      this.swPublicacion.mostrarArchivo(localStorage.getItem('archivoToken'), rutaArchivo).subscribe((data: any) => {
        if (data.success) {
          this.construirPDF(data.download, nombModal);
        }
      })
    }
  }
  //OBTENER EL 64 COMPLETO Y SANITIZAR
  async construirPDF(ruta: any, modal: any) {
    let rutaLocal: any = await this.toDataURL(ruta);
    this.rutaCarga = this.bypassAndSanitize(rutaLocal);
    this.enlaceCarga = ruta;
    this.mr = this.modalService.open(modal);
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
    formArchivo.append('idAplicacion', rutasSWPublicaciones.idAppArchivo);
    formArchivo.append('idCredencial', "1");
    formArchivo.append('activo', "true");
    formArchivo.append('ruta', raiz);
    formArchivo.append('file', archivo);
    this.swPublicacion.subirArchivos(formArchivo, token).subscribe(data => {
      console.log(data);
    });
  }
  //SANITIZA EL BASE 64
  bypassAndSanitize(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  //CONVERTIR UNA URL EN BASE 64
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
      return ("publicaciones/" + year + "/articulos/cartas/" + this.intNumRegistro + "_carta_" + numero + ".pdf");
    if (op == 2)
      return ("publicaciones/" + year + "/articulos/distributivos/" + this.intNumRegistro + "_distributivo_" + numero + ".pdf");

    if (op == 3)
      return ("publicaciones/" + year + "/congresos/articulo/" + this.intNumRegistro + "_articulo_" + numero + ".pdf");
    if (op == 4)
      return ("publicaciones/" + year + "/congresos/cartas/" + this.intNumRegistro + "_carta_" + numero + ".pdf");
    if (op == 5)
      return ("publicaciones/" + year + "/congresos/certificado/" + this.intNumRegistro + "_certificado_" + numero + ".pdf");
    if (op == 6)
      return ("publicaciones/" + year + "/congresos/distributivos/" + this.intNumRegistro + "_distributivo_" + numero + ".pdf");

    if (op == 7)
      return ("publicaciones/" + year + "/libros/publicacion/" + this.intNumRegistro + "_libro_" + numero + ".pdf");
    if (op == 8)
      return ("publicaciones/" + year + "/libros/distributivos/" + this.intNumRegistro + "_distributivo_" + numero + ".pdf");
    else
      return '';
  }
  //VER LOS AUTORES DE UN ARTICULO
  verAutores(numArticulo: string) {
    this.vecAutores = [];
    this.swPublicacion.getUsuarios(42, numArticulo, 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecAutores = data.usuario;
      }
    })
  }
  //BUSCAR UN USUARIO PARA AUTOR
  buscarUsuario() {
    this.intNumRegistro = -1;
    this.swPublicacion.getUsuarios(43, this.vecBuscaAutores[0]['cedula'], 2, 3, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.intNumRegistro = data.usuario[0]['intIdPersona'];
        this.vecBuscaAutores[0]['codigo'] = data.usuario[0]['intIdPersona'];
        this.vecBuscaAutores[0]['cedula'] = data.usuario[0]['strCedula'];
        this.vecBuscaAutores[0]['nombres'] = data.usuario[0]['strNombres'] + ' ' + data.usuario[0]['strApellidos'];
        this.vecBuscaAutores[0]['cargo'] = data.usuario[0]['strCargo'];
        this.vecBuscaAutores[0]['dependencia'] = data.usuario[0]['strDependencia'];
      }
      else {
        this.intNumRegistro = -1;
        this.vecBuscaAutores[0]['codigo'] = '';
        this.vecBuscaAutores[0]['nombres'] = '';
        this.vecBuscaAutores[0]['cargo'] = '';
        this.vecBuscaAutores[0]['dependencia'] = '';
        this.alerti.error('No se encontró al autor');
      }
    })
  }
  //FUNCION PARA INSERTAR UN NUEVO AUTOR
  agregarAutor() {
    if (this.vecBuscaAutores[0]['codigo'] == '')
      this.alerti.error('Seleccione un autor');
    else {
      this.swPublicacion.postAddUsuario(this.vecBuscaAutores[0]['articulo'], this.vecBuscaAutores[0]['codigo'],
        0, 0, 2, '-', 'na', 'na', 'na', 'na',
        'na', 'na', 'na', 'na', 'na', 12).subscribe((data: any) => {
          if (data.consulta) {
            this.alerti.success('Autor Registrado correctamente');
            this.vecBuscaAutores[0]['codigo'] = '';
            this.vecBuscaAutores[0]['nombres'] = '';
            this.vecBuscaAutores[0]['cargo'] = '';
            this.vecBuscaAutores[0]['dependencia'] = '';
            this.verAutores(this.vecBuscaAutores[0]['articulo']);
          }
        });
    }
  }
  //QUITAR UN AUTOR DE UN ARTICULO
  quitarAutor(dataAutor: any) {
    this.alerti.confirm('Está seguro de eliminar al autor', () => {
      this.swPublicacion.postAddUsuario(dataAutor.intArticulo, dataAutor.intPersona, 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na',
        'na', 'na', 'na', 'na', 'na', 22).subscribe((data: any) => {
          if (data.consulta) {
            this.alerti.success('Autor eliminado');
            this.verAutores(this.vecBuscaAutores[0]['articulo']);
          }
        });
    });
  }
  cerrrarModal() {
    this.mr.close();
  }
}
