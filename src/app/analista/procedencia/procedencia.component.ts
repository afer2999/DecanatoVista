import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-procedencia',
  templateUrl: './procedencia.component.html',
  styleUrls: ['./procedencia.component.css']
})
export class ProcedenciaComponent implements OnInit {
  private mr: any;
  public vecProcedencia: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecProcedencia = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verProcedencia();
    this.instanciaVariables();
  }

  async verProcedencia() {
    this.swPublicacion.getUsuarios(21, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecProcedencia = data.usuario;
      }
    })
  }

  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      intIdProcedencia: "", strNombre: "", strDescripcion: "", intEstado: 1
    })
  }

  //MODAL AGREGAR PROCEDENCIA
  modalAddProcedencia(nombModal: any) {
    this.opcion = 26;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }

  ingresarProcedencia() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0].intIdProcedencia, this.vecBuscar[0].strNombre, this.vecBuscar[0].strDescripcion, this.vecBuscar[0].intEstado,
      'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
        if (data.consulta) {
          this.verProcedencia(); this.instanciaVariables(); this.cerrarProcedencia();
        }
      });
  }

  //verDataProcedencia(objPersona:any, mombModal:any)  {
  //this.modalAddProcedencia(mombModal);
  //this.vecBuscar[0].['intIdProcedencia'] = objPersona.intIdProcedencia;
  //this.vecBuscar[0].['strNombre'] = objPersona.strNombre;
  //this.vecBuscar[0].['strDescripcion'] = objPersona.strDescripcion;
  //this.vecBuscar[0].['intEstado'] = objPersona.intEstado;
  //this.opcion=27;
  //}



  cerrarProcedencia() {
    this.mr.close();
  }


}
