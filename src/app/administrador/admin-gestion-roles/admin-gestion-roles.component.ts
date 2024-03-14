import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';


@Component({
  selector: 'app-admin-gestion-roles',
  templateUrl: './admin-gestion-roles.component.html',
  styleUrls: ['./admin-gestion-roles.component.css']
})
export class AdminGestionRolesComponent implements OnInit {
  private mr: any;
  public vecRoles:Array<any>; public vecBuscar:Array<any>;
  private opcion=1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecRoles = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verTodosRoles();
    this.instanciaVariables();
  }
  async verTodosRoles() {
    this.swPublicacion.getUsuarios(1, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecRoles = data.usuario;
      }
    })
  }
//ABRIR UN MODAL
modalAddRol(nombModal: any) {
  this.opcion = 4;
  this.instanciaVariables();
  this.mr = this.modalService.open(nombModal);
}
instanciaVariables() {
  this.vecBuscar = [];
  this.vecBuscar.push({
    intIdRol: '', strNombre: '', strDescripcion: '', strIcono: '', intEstado: 1})
}
ingresarUsuario() {
  this.swPublicacion.postAddUsuario (this.vecBuscar[0]['intIdRol'], this.vecBuscar[0]['strNombre'], this.vecBuscar[0]['strDescripcion'], this.vecBuscar[0]['strIcono'],
    this.vecBuscar[0]['intEstado'], 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
      location.reload();
    });
}
verDataPersona(objPersona: any, mombModal: any) {
  this.modalAddRol(mombModal);
  this.vecBuscar[0]['intIdRol'] = objPersona.intIdRol;
  this.vecBuscar[0]['strNombre'] = objPersona.strNombre;
  this.vecBuscar[0]['strDescripcion'] = objPersona.strDescripcion;
  this.vecBuscar[0]['strIcono'] = objPersona.strIcono;
  this.vecBuscar[0]['intEstado'] = objPersona.intEstado;
  this.opcion = 22;
}

cerrarModal() {
  this.mr.close();
}

}
