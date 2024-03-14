import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';

@Component({
  selector: 'app-admin-asignar-permiso',
  templateUrl: './admin-asignar-permiso.component.html',
  styleUrls: ['./admin-asignar-permiso.component.css']
})
export class AdminAsignarPermisoComponent implements OnInit {
  private mr: any;
  public vecRoles: Array<any>; public vecActividad: Array<any>; public vecOpcion: Array<any>;
  public vecAsignaciones: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) {
    this.vecRoles = []; this.vecActividad = []; this.vecOpcion = []; this.vecBuscar = [];
    this.vecAsignaciones = [];
  }

  ngOnInit() {
    this.verPermisosSistema();
    this.instanciaVariables();
  }
  async verPermisosSistema() {
    this.vecRoles = []; this.vecActividad = []; this.vecOpcion = []; this.vecAsignaciones = [];
    this.swPublicacion.getUsuarios(7, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecRoles = data.usuario;
      }
    })

    this.swPublicacion.getUsuarios(10, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecActividad = data.usuario;
      }
    })

    this.swPublicacion.getUsuarios(11, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecOpcion = data.usuario;
      }
    })

    this.swPublicacion.getUsuarios(12, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecAsignaciones = data.usuario;
      }
    })

  }
  //ABRIR UN MODAL
  modalAddActividades(nombModal: any) {
    this.opcion = 7;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      intRol: '', intOpcion: '', intPadreOpcion: '', bitInsertar: false, bitModificar: false, bitEliminar: false, intEstado: '1'
    })
  }
  ingresarUsuario() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['intRol'], this.vecBuscar[0]['intOpcion'], this.vecBuscar[0]['intPadreOpcion'],
      this.vecBuscar[0]['bitInsertar'], this.vecBuscar[0]['bitModificar'], this.vecBuscar[0]['bitEliminar'], this.vecBuscar[0]['intEstado'],
      'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
        location.reload();
      });
  }
  verDataActividades(objPersona: any, mombModal: any) {
    this.modalAddActividades(mombModal);
    this.vecBuscar[0]['intIdPersona'] = objPersona.intIdPersona;

    this.vecBuscar[0]['intRol'] = objPersona.idRol
    this.vecBuscar[0]['intOpcion'] = objPersona.idOpcion
    this.vecBuscar[0]['intPadreOpcion'] = objPersona.idPadre
    this.vecBuscar[0]['bitInsertar'] = objPersona.insertar
    this.vecBuscar[0]['bitModificar'] = objPersona.editar
    this.vecBuscar[0]['bitEliminnar'] = objPersona.borrar
    this.vecBuscar[0]['intEstado'] = objPersona.estadoOpcPadre

    this.opcion = 23;
  }
  cerrarModal() {
    this.mr.close();
  }

}
