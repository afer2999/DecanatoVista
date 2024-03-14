import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tipo-certificado',
  templateUrl: './tipo-certificado.component.html',
  styleUrls: ['./tipo-certificado.component.css']
})
export class TipoCertificadoComponent implements OnInit {
  private mr: any;
  public vecTipoCertificado: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecTipoCertificado= []; this.vecBuscar = [] }

  ngOnInit() {
    this.verTipoCertificado();
    this.instanciaVariables();
  }

  async verTipoCertificado() {
    this.swPublicacion.getUsuarios(23, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecTipoCertificado = data.usuario;
      }
    })
  }

  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      strNombres: '', strDescripcion: '', detEstado: ''})
  }

  //MODAL AGREGAR REVISTA
  modalAddTipoCertificado(nombModal: any) {
    this.opcion = 1;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }


}
