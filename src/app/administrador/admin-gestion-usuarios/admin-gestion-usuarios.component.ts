import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { LoaderComponent } from '../../serviciosPublicaciones/loader/loader.component'

import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'jspdf-autotable';

@Component({
  selector: 'app-admin-gestion-usuarios',
  templateUrl: './admin-gestion-usuarios.component.html',
  styleUrls: ['./admin-gestion-usuarios.component.css']
})
export class AdminGestionUsuariosComponent implements OnInit { 
  private mr: any;
  public vecUsuarios: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;public verModAddActividad: boolean = false;
  constructor(public swCentral: swCentralPublicaciones, private cargando: LoaderComponent, 
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecUsuarios = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verTodosUsuarios();
    this.instanciaVariables();  
  }

  async verTodosUsuarios() {
    this.cargando.abrir();
    this.swPublicacion.getUsuarios(2, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecUsuarios = data.usuario;
      }
    })
    this.cargando.cerrar();
  }
  //ABRIR UN MODAL
  modalAddUsuario(nombModal: any) {
    this.opcion = 1;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
    
  }
  //BUSCAR EN LA CENTRALIZADA
  verUsuario() {
    this.swCentral.getPersonaCedula(this.vecBuscar[0]['strCedula']).subscribe((data: any) => {
      if (data.success) {
        this.verCargo();
        this.vecBuscar[0]['intIdPersona'] = data.datos.per_id;
        this.vecBuscar[0]['strNombres'] = data.datos.per_nombres;
        this.vecBuscar[0]['strApellidos'] = data.datos.per_primerApellido + ' ' + data.datos.per_segundoApellido;
        this.vecBuscar[0]['strCorreo'] = data.datos.per_email;
        this.vecBuscar[0]['strTelefono'] = data.datos.per_telefonoCelular;
        this.vecBuscar[0]['bitNombramiento'] = '1';
        this.vecBuscar[0]['strDependencia'] = '';
        this.vecBuscar[0]['intEstado'] = '1';
      }
    })
  }

  //BUSCAR EN LA CENTRALIZADA EL CARGO
  verCargo() {
    this.swCentral.getPersonaCargo(this.vecBuscar[0]['strCedula']).subscribe((data: any) => {
      if (data.success) {
        this.vecBuscar[0]['strCargo'] = data.cargo.puesto;
      }
    })
  }
  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      intIdPersona: '', strCedula: '', strNombres: '', strApellidos: '', strCorreo: '', strTelefono: '', strCargo: '',
      bitNombramiento: '', strDependencia: '', intEstado: ''
    })
  }

  ingresarUsuario() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['intIdPersona'], this.vecBuscar[0]['strCedula'], this.vecBuscar[0]['strNombres'],
      this.vecBuscar[0]['strApellidos'], this.vecBuscar[0]['strCorreo'], this.vecBuscar[0]['strTelefono'], this.vecBuscar[0]['strCargo'],
      this.vecBuscar[0]['bitNombramiento'], this.vecBuscar[0]['strDependencia'], this.vecBuscar[0]['intEstado'], 'na', 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
        location.reload();
      });
  }
  verDataPersona(objPersona: any, mombModal: any) {
    this.modalAddUsuario(mombModal);
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
  confirmar(objPersona: any) {
    if(confirm("Are you sure to delete "+ objPersona.strApellidos)) {
      console.log("Implement delete functionality here");
    }
  }
  cerrarModal() {    
    this.mr.close();
  }

}
