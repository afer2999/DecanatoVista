import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/recursos/alertify.service';

@Component({
  selector: 'app-lista-articulos-aprobado',
  templateUrl: './lista-articulos-aprobado.component.html',
  styleUrls: ['./lista-articulos-aprobado.component.css']
})
export class ListaArticulosAprobadoComponent implements OnInit {
  private mr: any;
  public vecArticulos: any; public vecBuscar: Array<any>; public vecProcedencia: Array<any>; public vecLinea: Array<any>;
  public vecRevista: Array<any>; public vecObra: Array<any>; public vecCampoA: Array<any>;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal, private alerti: AlertifyService) {
    this.vecArticulos = []; this.vecBuscar = []; this.vecProcedencia = [];
    this.vecCampoA = []; this.vecLinea = []; this.vecRevista = []; this.vecObra = [];
  }

  ngOnInit() {
    this.verTodosArticulos('RR');
    this.instanciaVariables();
  }

  async verTodosArticulos(codigo: string) {
    this.vecArticulos = [];
    this.swPublicacion.getUsuarios(47, codigo, 1, 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        for (let objArt of data.usuario) {
          if (this.vecArticulos.filter((objBusca: any) => objBusca.titulo == objArt.nombreArticulo).length == 0)
            this.vecArticulos.push({ datoArticulo: objArt, titulo: objArt.nombreArticulo });
        }
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
        console.log(this.vecObra)
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
      distributivo: '', carta: '', cumplimiento: -1, autor: '', idAutor: ''
    });
  }
  //VER INFORMACIÓN SELECCIONADA
  async verData(objArticulo: any, nombModal: any) {
    this.instanciaVariables();
console.log(objArticulo)
    this.vecBuscar[0]['idArticulo'] = objArticulo.idArticulo;
    this.vecBuscar[0]['codigoArticulo'] = objArticulo.codigoArticulo;
    this.vecBuscar[0]['nombreArticulo'] = objArticulo.nombreArticulo;
    this.vecBuscar[0]['detalleArticulo'] = objArticulo.detalleArticulo;
    this.vecBuscar[0]['campoArticulo'] = objArticulo.campoArticulo;
    this.vecBuscar[0]['lineaArticulo'] = objArticulo.lineaArticulo;
    this.vecBuscar[0]['procedeArticulo'] = objArticulo.procedeArticulo;
    this.vecBuscar[0]['fechaArticulo'] = objArticulo.fechaArticulo;
    this.vecBuscar[0]['comisionArticulo'] = objArticulo.comisionArticulo;
    this.vecBuscar[0]['estadoArticulo'] = objArticulo.estadoArticulo;
    this.vecBuscar[0]['detalleRegCient'] = objArticulo.detalleRegCient;
    this.vecBuscar[0]['doiRegCient'] = objArticulo.doiRegCient;
    this.vecBuscar[0]['linkRegCient'] = objArticulo.linkRegCient;
    this.vecBuscar[0]['revistaRegCient'] = objArticulo.revistaRegCient;
    this.vecBuscar[0]['obraRegCient'] = objArticulo.obraRegCient;
    this.vecBuscar[0]['volumenRegCient'] = objArticulo.volumenRegCient;
    this.vecBuscar[0]['numeroRegCient'] = objArticulo.numeroRegCient;
    this.vecBuscar[0]['paginaRegCient'] = objArticulo.paginaRegCient;
    this.vecBuscar[0]['indexadoRegCient'] = objArticulo.indexadoRegCient;
    this.vecBuscar[0]['comisionRegCient'] = objArticulo.comisionRegCient;
    this.vecBuscar[0]['estadoRegCient'] = objArticulo.estadoRegCient;
    this.vecBuscar[0]['filial'] = objArticulo.bitFilial;
    this.vecBuscar[0]['pertinencia'] = objArticulo.bitPertinencia;
    this.vecBuscar[0]['estadoAnalista'] = objArticulo.intEstado;
    this.vecBuscar[0]['cumplimiento'] = objArticulo.intContrato;
    this.vecBuscar[0]['autor'] = objArticulo.strNombres + '' + objArticulo.strApellidos;
    this.vecBuscar[0]['idAutor'] = objArticulo.intPersona;

    await this.verArticulos(objArticulo.distributivo, 'distributivo');
    await this.verArticulos(objArticulo.cartaAceptacion, 'carta');
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
    console.log(this.vecBuscar)
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
      this.vecBuscar[0]['estadoAnalista'], this.vecBuscar[0]['cumplimiento'], this.vecBuscar[0]['idAutor'], 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 19).subscribe((data: any) => {
        if (data.consulta)
          this.editarArticuloCientifico();
      });
  }
  //ACTUALIZAR LA INFORMACION DEL ARTICULO DE UN AUTOR
  editarArticuloCientifico() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idArticulo'], this.vecBuscar[0]['detalleArticulo'], this.vecBuscar[0]['doiRegCient'], this.vecBuscar[0]['linkRegCient'],
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
