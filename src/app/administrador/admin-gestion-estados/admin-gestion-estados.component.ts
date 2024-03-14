import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';


@Component({
  selector: 'app-admin-gestion-estados',
  templateUrl: './admin-gestion-estados.component.html',
  styleUrls: ['./admin-gestion-estados.component.css']
})
export class AdminGestionEstadosComponent implements OnInit {
  private mr: any;
  public vecPersonaRol: Array<any>; public vecBuscar: Array<any>;
  public vecRoles: Array<any>; public vecUsuarios: Array<any>; public vecRolLibre: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) {
    this.vecPersonaRol = []; this.vecBuscar = []; this.vecRoles = []; this.vecUsuarios = [];
    this.vecRolLibre = []
  }

  ngOnInit() {
    this.verTodosEstados();
    this.verTodosUsuarios();
    this.verTodosRoles();
    this.instanciaVariables();
  }
  async verTodosEstados() {
    this.swPublicacion.getUsuarios(9, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecPersonaRol = data.usuario;
      }
    })
  }

  async verTodosUsuarios() {
    this.vecUsuarios = [];
    this.swPublicacion.getUsuarios(2, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecUsuarios = data.usuario;
      }
    })
  }
  async verTodosRoles() {
    this.vecRoles = [];
    this.swPublicacion.getUsuarios(7, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecRoles = data.usuario;
      }
    })
  }
  verUsuarioSelecion(usuario: any) {
    console.log(usuario)
    this.vecRolLibre = [];
    this.swPublicacion.getUsuarios(8, usuario, 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        for (let objRol of this.vecRoles) {
          let ban = 0;
          for (let objUser of data.usuario) {
            if (objUser.intIdRol == objRol.intIdRol)
              ban = 1;
          }
          if (ban == 0)
            this.vecRolLibre.push({
              intEstado: objRol.intEstado,
              intIdRol: objRol.intIdRol,
              strDescripcion: objRol.strDescripcion,
              strIcono: objRol.strIcono,
              strNombre: objRol.strNombre
            });
        }
      }
      else
        this.vecRolLibre = this.vecRoles;
    })
    console.log(this.vecRolLibre)
  }
  //ABRIR UN MODAL
  modalAddRol(nombModal: any) {
    this.opcion = 5;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      idUsuario: '', idRol: '', intEstado: ''
    })
  }
  ingresarUsuario() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['idUsuario'], this.vecBuscar[0]['idRol'], this.vecBuscar[0]['intEstado'],
      'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
        location.reload();
      });
  }


  verDataPersona(objPersona: any, mombModal: any) {console.log(objPersona)
    this.modalAddRol(mombModal);
    this.verUsuarioSelecion(objPersona.strCedula);
    this.vecBuscar[0]['idUsuario'] = objPersona.intIdPersona;
    this.vecBuscar[0]['idRol'] = objPersona.intIdRol;
    this.vecBuscar[0]['intEstado'] = objPersona.intEstado;
    this.opcion = 2;

    this.vecRolLibre.push({
      intEstado: objPersona.intEstado,
      intIdRol: objPersona.intIdRol,
      strDescripcion: '',
      strIcono: '',
      strNombre: objPersona.strNombre
    });

  }
  cerrarModal() {
    this.mr.close();
  }



}
