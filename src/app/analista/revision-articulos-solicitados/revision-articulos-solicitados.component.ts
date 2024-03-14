import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/recursos/alertify.service';

@Component({
  selector: 'app-revision-articulos-solicitados',
  templateUrl: './revision-articulos-solicitados.component.html',
  styleUrls: ['./revision-articulos-solicitados.component.css']
})
export class RevisionArticulosSolicitadosComponent implements OnInit {
  private mr: any;
  public vecArticulos: Array<any>; public vecBuscar: Array<any>; public vecProcedencia: Array<any>; public vecLinea: Array<any>;
  public vecRevista: Array<any>; public vecObra: Array<any>; public vecCampoA: Array<any>;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal, private alerti: AlertifyService) {
    this.vecArticulos = []; this.vecBuscar = []; this.vecProcedencia = [];
    this.vecCampoA = []; this.vecLinea = []; this.vecRevista = []; this.vecObra = [];
  }

  ngOnInit() {
    this.verTodosArticulos();
    this.instanciaVariables();
  }

  async verTodosArticulos() {
    this.swPublicacion.getUsuarios(26, 3, 2, 'na', 'na', 'na').subscribe((data: any) => {
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
    //CARGAMOS LAS REVISTAS CIENTIFICAS
    this.swPublicacion.getUsuarios(29, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecRevista = data.usuario;
      }
    })
    //CARGAMOS LOS TIPO DE OBRAS
    this.swPublicacion.getUsuarios(30, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecObra = data.usuario;
      }
    })
    //CARGAMOS LOS CAMPOS AMPLIOS
    this.swPublicacion.getUsuarios(45, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecCampoA = data.usuario;
      }
    })
  }
  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];

    this.vecBuscar.push({
      idArticulo: '', codigoArticulo: '', nombreArticulo: '', detalleArticulo: '', campoArticulo: '', lineaArticulo: '', procedeArticulo: '', fechaArticulo: '',
      comisionArticulo: '', estadoArticulo: '', detalleRegCient: '', doiRegCient: '', linkRegCient: '', revistaRegCient: '', obraRegCient: '', volumenRegCient: '',
      numeroRegCient: '', paginaRegCient: '', indexadoRegCient: '', comisionRegCient: '', estadoRegCient: '', filial: '', pertinencia: '', estadoAnalista: '',
      distributivo: '', carta: '', cumplimiento: -1
    });
  }
  //VER INFORMACIÓN SELECCIONADA
  async verData(objUser: any, nombModal: any) {
    this.instanciaVariables();

    this.vecBuscar[0]['idArticulo'] = objUser.idArticulo;
    this.vecBuscar[0]['codigoArticulo'] = objUser.codigoArticulo;
    this.vecBuscar[0]['nombreArticulo'] = objUser.nombreArticulo;
    this.vecBuscar[0]['detalleArticulo'] = objUser.detalleArticulo;
    this.vecBuscar[0]['campoArticulo'] = objUser.campoArticulo;
    this.vecBuscar[0]['lineaArticulo'] = objUser.lineaArticulo;
    this.vecBuscar[0]['procedeArticulo'] = objUser.procedeArticulo;
    this.vecBuscar[0]['fechaArticulo'] = objUser.fechaArticulo;
    this.vecBuscar[0]['comisionArticulo'] = objUser.comisionArticulo;
    this.vecBuscar[0]['estadoArticulo'] = objUser.estadoArticulo;
    this.vecBuscar[0]['detalleRegCient'] = objUser.detalleRegCient;
    this.vecBuscar[0]['doiRegCient'] = objUser.doiRegCient;
    this.vecBuscar[0]['linkRegCient'] = objUser.linkRegCient;
    this.vecBuscar[0]['revistaRegCient'] = objUser.revistaRegCient;
    this.vecBuscar[0]['obraRegCient'] = objUser.obraRegCient;
    this.vecBuscar[0]['volumenRegCient'] = objUser.volumenRegCient;
    this.vecBuscar[0]['numeroRegCient'] = objUser.numeroRegCient;
    this.vecBuscar[0]['paginaRegCient'] = objUser.paginaRegCient;
    this.vecBuscar[0]['indexadoRegCient'] = objUser.indexadoRegCient;
    this.vecBuscar[0]['comisionRegCient'] = objUser.comisionRegCient;
    this.vecBuscar[0]['estadoRegCient'] = objUser.estadoRegCient;
    this.vecBuscar[0]['filial'] = objUser.bitFilial;
    this.vecBuscar[0]['pertinencia'] = objUser.bitPertinencia;
    this.vecBuscar[0]['estadoAnalista'] = objUser.intEstado;
    this.vecBuscar[0]['cumplimiento'] = objUser.intContrato;
    
    await this.verArticulos(objUser.distributivo, 'distributivo');
    await this.verArticulos(objUser.cartaAceptacion, 'carta');
    this.mr = this.modalService.open(nombModal);
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
  //ACTUALIZAR LA INFORMACION DEL ARTICULO
  editarArticulo() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idArticulo'], this.vecBuscar[0]['codigoArticulo'], this.vecBuscar[0]['nombreArticulo'],
      this.vecBuscar[0]['detalleArticulo'], this.vecBuscar[0]['lineaArticulo'], this.vecBuscar[0]['procedeArticulo'], this.vecBuscar[0]['fechaArticulo'],
      this.vecBuscar[0]['comisionRegCient'], this.vecBuscar[0]['estadoArticulo'], 'na', 'na', 'na', 'na', 'na', 'na', 18).subscribe((data: any) => {
        if (data.consulta)
          this.editarArticuloAutor();
      });
  }
  //ACTUALIZAR LA INFORMACION DEL ARTICULO DE UN AUTOR
  editarArticuloAutor() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idArticulo'], this.vecBuscar[0]['filial'], this.vecBuscar[0]['pertinencia'],
      this.vecBuscar[0]['estadoAnalista'], this.vecBuscar[0]['cumplimiento'], 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 19).subscribe((data: any) => {
        if (data.consulta)
          this.editarArticuloCientifico();
      });
  }
  //ACTUALIZAR LA INFORMACION DEL ARTICULO DE UN AUTOR
  editarArticuloCientifico() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idArticulo'], '-', this.vecBuscar[0]['doiRegCient'], this.vecBuscar[0]['linkRegCient'],
      this.vecBuscar[0]['revistaRegCient'], this.vecBuscar[0]['campoArticulo'], this.vecBuscar[0]['lineaArticulo'], this.vecBuscar[0]['obraRegCient'],
      this.vecBuscar[0]['volumenRegCient'], this.vecBuscar[0]['numeroRegCient'], this.vecBuscar[0]['paginaRegCient'], this.vecBuscar[0]['indexadoRegCient'],
      this.vecBuscar[0]['comisionRegCient'], this.vecBuscar[0]['estadoRegCient'], 'na', 20).subscribe((data: any) => {
        if (data.consulta)
          this.alerti.success('Información actualizada');
      });
  }
  //CERRAR UN MODAL
  cerrarModal() {
    this.mr.close();
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
}
