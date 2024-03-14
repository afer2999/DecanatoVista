import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-gestion-congresos',
  templateUrl: './gestion-congresos.component.html',
  styleUrls: ['./gestion-congresos.component.css']
})
export class GestionCongresosComponent implements OnInit {
  private mr: any;
  public vecArticulos: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecArticulos = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verTodosArticulos();
    this.instanciaVariables();
  }

  async verTodosArticulos() {
    this.swPublicacion.getUsuarios(5, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecArticulos = data.usuario;
      }
    })
  }

  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      strCodigoArticulo: '', strNombreArticulo: '', dateFechaPublicacion: '', intEstado: ''})
  }


}
