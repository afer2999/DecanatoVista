import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';

@Component({
  selector: 'app-admin-permisos',
  templateUrl: './admin-permisos.component.html',
  styleUrls: ['./admin-permisos.component.css']
})
export class AdminPermisosComponent implements OnInit {
  private mr: any;
  public vecPermisos: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecPermisos = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verPermisosSistema();
    this.instanciaVariables();
  }
  async verPermisosSistema() {
    this.swPublicacion.getUsuarios(11, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecPermisos = data.usuario;
      }
    })
  }
  //ABRIR UN MODAL
  modalAddActividades(nombModal: any) {
    this.opcion = 6;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      intIdPadreOpcion: '', strNombre: '', intEstado: 1, strIcono: '', tipo: '1'
    })
  }
  ingresarUsuario() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['intIdPadreOpcion'], this.vecBuscar[0]['strNombre'], this.vecBuscar[0]['intEstado'],
      this.vecBuscar[0]['strIcono'], this.vecBuscar[0]['tipo'], 'na', 'na',
      'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
        location.reload();
      });
  }
  verDataActividades(objPersona: any, mombModal: any) {
    this.modalAddActividades(mombModal);
    this.vecBuscar[0]['intIdPersona'] = objPersona.intIdPersona;
    this.vecBuscar[0]['strCedula'] = objPersona.strCedula;
    this.vecBuscar[0]['strNombres'] = objPersona.strNombres;
    this.vecBuscar[0]['strApellidos'] = objPersona.strApellidos;
    this.vecBuscar[0]['strCorreo'] = objPersona.strCorreo;
    this.vecBuscar[0]['strTelefono'] = objPersona.strTelefono;
    this.vecBuscar[0]['strCargo'] = objPersona.strCargo;
    this.vecBuscar[0]['bitNombramiento'] = objPersona.bitNombramiento;
    this.vecBuscar[0]['strDependencia'] = objPersona.strDependencia;
    this.vecBuscar[0]['intEstado'] = objPersona.intEstado;
    this.opcion = 2;
  }

  cerrarModal() {    
    this.mr.close();
  }

}
