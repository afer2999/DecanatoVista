import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { AlertifyService } from '../../recursos/alertify.service';

@Component({
  selector: 'app-lista-libros-aprobados',
  templateUrl: './lista-libros-aprobados.component.html',
  styleUrls: ['./lista-libros-aprobados.component.css'],
})
export class ListaLibrosAprobadosComponent implements OnInit {
  private mr: any;
  public vecArticulos: Array<any>; public vecBuscar: Array<any>;

  public vecProcedencia: Array<any>; public vecLinea: Array<any>; public vecCampoA: Array<any>; public vecObra: Array<any>;

  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private alerti: AlertifyService,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) {
    this.vecArticulos = []; this.vecBuscar = []
    this.vecProcedencia = []; this.vecCampoA = []; this.vecLinea = []; this.vecObra = [];
  }

  ngOnInit() {
    this.verTodosArticulos();
    this.instanciaVariables();
  }

  async verTodosArticulos() {
    this.swPublicacion.getUsuarios(28, 1, 1, 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecArticulos = data.usuario;
      }
    })
    //CARGAMOS LAS PROCEDENCIAS
    this.swPublicacion.getUsuarios(21, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecProcedencia = data.usuario;
      }
    })
    //CARGAMOS LAS LINEAS DE INVESTIGACION
    this.swPublicacion.getUsuarios(22, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecLinea = data.usuario;
      }
    })
    //CARGAMOS LOS CAMPOS AMPLIOS
    this.swPublicacion.getUsuarios(45, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecCampoA = data.usuario;
      }
    })
    //CARGAMOS LOS TIPO DE OBRAS
    this.swPublicacion.getUsuarios(30, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecObra = data.usuario;
      }
    })
  }

  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      idArticulo: '', codigoArticulo: '', nombreArticulo: '', detalleArticulo: '', campoArticulo: '', lineaArticulo: '', procedeArticulo: '', fechaArticulo: '',
      estadoArticulo: '', filial: '', pertinencia: '', estadoSolicita: '', cumplimiento: '', nombreLibro: '', isbnLibro: '', obraLibro: '', paresLibro: '', tomo: 0, paisLibro: '',
    });
  }
  //VER INFORMACIÓN SELECCIONADA
  async verData(objUser: any, nombModal: any) {
    console.log(objUser)
    this.instanciaVariables();
    this.vecBuscar[0]['idArticulo'] = objUser.intArticulo
    this.vecBuscar[0]['codigoArticulo'] = objUser.strCodigoArticulo
    this.vecBuscar[0]['nombreArticulo'] = objUser.strNombreArticulo
    this.vecBuscar[0]['detalleArticulo'] = objUser.strDescripcion
    this.vecBuscar[0]['campoArticulo'] = objUser.intCampo
    this.vecBuscar[0]['lineaArticulo'] = objUser.intLineasInvestigacion
    this.vecBuscar[0]['procedeArticulo'] = objUser.intProcedencia
    this.vecBuscar[0]['fechaArticulo'] = objUser.dateFechaPublicacion
    this.vecBuscar[0]['comisionArticulo'] = objUser.bitComision
    this.vecBuscar[0]['estadoArticulo'] = objUser.estadoArticulo
    this.vecBuscar[0]['filial'] = objUser.bitFilial
    this.vecBuscar[0]['pertinencia'] = objUser.bitPertinencia
    this.vecBuscar[0]['estadoSolicita'] = objUser.intEstado
    this.vecBuscar[0]['cumplimiento'] = objUser.intContrato
    this.vecBuscar[0]['nombreLibro'] = objUser.strNombreCapitulo
    this.vecBuscar[0]['isbnLibro'] = objUser.strIsbn
    this.vecBuscar[0]['obraLibro'] = objUser.intTipoObra
    this.vecBuscar[0]['paresLibro'] = objUser.revisaPares
    this.vecBuscar[0]['intTomo'] = objUser.intTomo
    this.vecBuscar[0]['paisLibro'] = objUser.strPais
    this.vecBuscar[0]['idAutor'] = objUser.intPersona
    await this.verArticulos(objUser.distributivo, 'distributivo');
    await this.verArticulos(objUser.cartaAceptacion, 'carta');
    this.mr = this.modalService.open(nombModal);
  }
  //ACTUALIZAR LA INFORMACION DEL ARTICULO
  editarArticulo() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idArticulo'], this.vecBuscar[0]['codigoArticulo'], this.vecBuscar[0]['nombreArticulo'],
      this.vecBuscar[0]['detalleArticulo'], this.vecBuscar[0]['lineaArticulo'], this.vecBuscar[0]['procedeArticulo'], this.vecBuscar[0]['fechaArticulo'],
      this.vecBuscar[0]['comisionArticulo'], this.vecBuscar[0]['estadoArticulo'], 'na', 'na', 'na', 'na', 'na', 'na', 18).subscribe((data: any) => {
        if (data.consulta)
          this.editarArticuloAutor();
      });
  }
  //ACTUALIZAR LA INFORMACION DEL ARTICULO DE UN AUTOR
  editarArticuloAutor() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idArticulo'], this.vecBuscar[0]['filial'], this.vecBuscar[0]['pertinencia'],
      this.vecBuscar[0]['estadoSolicita'], this.vecBuscar[0]['cumplimiento'], this.vecBuscar[0]['idAutor'], 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 19).subscribe((data: any) => {
        if (data.consulta)
          this.editarLibro();
      });
  }
  //ACTUALIZAR LA INFORMACION DE UN LIBRO
  editarLibro() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idArticulo'], this.vecBuscar[0]['nombreLibro'], this.vecBuscar[0]['isbnLibro'],
      this.vecBuscar[0]['obraLibro'], this.vecBuscar[0]['paresLibro'], this.vecBuscar[0]['intTomo'], this.vecBuscar[0]['paisLibro'], 'na',
      'na', 'na', 'na', 'na', 'na', 'na', 'na', 24).subscribe((data: any) => {
        if (data.consulta) {
          this.alerti.success('Información actualizada');
          this.cerrarModal();
          window.location.reload();
        }
      });
  }
  //RECUPERAMOS EL DOCUMENTO DESDE EL DRIVE
  async verArticulos(ruta: string, posicion: string) {
    await this.verDataToken();
    this.swPublicacion.mostrarArchivo(localStorage.getItem('archivoToken'), ruta).subscribe((data: any) => {
      if (data.success) {
        this.vecBuscar[0][posicion] = data.download;
      }
    })
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

  //CERRAR UN MODAL
  cerrarModal() {
    this.mr.close();
  }
}
