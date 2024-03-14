import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';


@Component({
  selector: 'app-admin-gestion-actividades',
  templateUrl: './admin-gestion-actividades.component.html',
  styleUrls: ['./admin-gestion-actividades.component.css']
})
export class AdminGestionActividadesComponent implements OnInit {
  private mr: any;
  public vecActividades: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecActividades = []; this.vecBuscar = [] }

  ngOnInit() {
    this.verTodosvecActividades();
    this.instanciaVariables();
  }
  async verTodosvecActividades() {
    this.swPublicacion.getUsuarios(10, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecActividades = data.usuario;
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
  verDataActividades(objPersona: any, mombModal: any) {console.log(objPersona)
    this.modalAddActividades(mombModal);
        
    this.vecBuscar[0]['intIdPadreOpcion']=objPersona.intIdPadreOpcion
    this.vecBuscar[0]['strNombre']=objPersona.strNombre
    this.vecBuscar[0]['intEstado']=objPersona.intEstado
    this.vecBuscar[0]['strIcono']=objPersona.strIcono
    this.vecBuscar[0]['tipo']=objPersona.tipo

    this.opcion = 2;
  }

  cerrarModal() {
    this.mr.close();
  }


}
