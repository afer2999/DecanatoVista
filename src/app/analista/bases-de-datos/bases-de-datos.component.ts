import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bases-de-datos',
  templateUrl: './bases-de-datos.component.html',
  styleUrls: ['./bases-de-datos.component.css']
})
export class BasesDeDatosComponent implements OnInit {
  private mr: any;
  public vecBasesdeDatos: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecBasesdeDatos = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verBasesdeDatos();
    this.instanciaVariables();
  }

  async verBasesdeDatos() {
    this.swPublicacion.getUsuarios(20, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecBasesdeDatos = data.usuario;
      }
    })
  }

  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      strNombre: '', strDescripcion: '', dateFechaPublicacion: '', detEstado: ''})
  }
  modalAddRBasedeDatos(nombModal: any) {
    this.opcion = 1;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }

  cerrarModal() {
    this.mr.close();
  }



}
