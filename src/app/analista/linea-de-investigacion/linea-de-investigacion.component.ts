import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-linea-de-investigacion',
  templateUrl: './linea-de-investigacion.component.html',
  styleUrls: ['./linea-de-investigacion.component.css']
})
export class LineaDeInvestigacionComponent implements OnInit {
  private mr: any;
  public vecLineaInvestigacion: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecLineaInvestigacion = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verLineaInvestigacion();
    this.instanciaVariables();
  }

  async verLineaInvestigacion() {
    this.swPublicacion.getUsuarios(22, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecLineaInvestigacion = data.usuario;
      }
    })
  }

  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      strNombre: '', strDescripcion: '', detEstado: ''
    })
  }

  //MODAL AGREGAR LINEA DE INVESTIGACION
  modalAddLineaInvestigacion(nombModal: any) {
    this.opcion = 1;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }
  cerrarModal() {
    this.mr.close();
  }



}
