import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/recursos/alertify.service';

@Component({
  selector: 'app-bases-de-datos',
  templateUrl: './bases-de-datos.component.html',
  styleUrls: ['./bases-de-datos.component.css']
})
export class BasesDeDatosComponent implements OnInit {
  private mr: any;
  public vecBasesdeDatos: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private alerti: AlertifyService,
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
      strNombre: '', strDescripcion: '', intEstado: 1
    })
  }
  modalAddRBasedeDatos(nombModal: any) {
    this.opcion = 1;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }
  //FUNCION PARA GUARDAR LA BD
  guardarBaseDatos() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0].strNombre, this.vecBuscar[0].strDescripcion, this.vecBuscar[0].intEstado, 'na', 'na', 'na', 'na', 'na', 'na', 'na',
      'na', 'na', 'na', 'na', 'na', 28).subscribe((data: any) => {
        if (data.consulta) {
          this.alerti.success('Datos registrados');
          this.verBasesdeDatos();
          this.instanciaVariables();
          this.cerrarModal();
        }
      });
  }

  cerrarModal() {
    this.mr.close();
  }



}
