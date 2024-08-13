import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-revistas',
  templateUrl: './revistas.component.html',
  styleUrls: ['./revistas.component.css']
})
export class RevistasComponent implements OnInit {
  private mr: any;
  public vecRevistas: Array<any>; public vecBaseDatos: Array<any>; public vecBuscar: Array<any>;
  private opcion = 1;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones,
    private swPublicacion: swPublicaciones, private modalService: NgbModal) { this.vecRevistas = []; this.vecBuscar = []; this.vecBaseDatos= [] }

  ngOnInit() {
    this.verRevistas();
    this.instanciaVariables();
  }

  async verRevistas() {
    this.swPublicacion.getUsuarios(19, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecRevistas = data.usuario;
      }
    })

    this.swPublicacion.getUsuarios(20, localStorage.getItem('loginID'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecBaseDatos = data.usuario;
      }
    })

  }

  //INSTANCIA VARIABLES
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      intIdRevista: "", strNombre: "", strPais: "", strIssn: "", intBasedeDatos: 1, strDescripcion: "", strFactorSJR: "", strCuartilSJR: "", strFactorJCR: "",
      strCuartilJCR: "", intEstado: 0, strLink: ""
    })
  }
  //MODAL AGREGAR REVISTA
  modalAddRevista(nombModal: any) {
    this.mr = this.modalService.open(nombModal);
    this.opcion = 13;
    this.instanciaVariables();
  }

  verRevista(nombModal:any, objRevista: any){
    this.opcion = 13;
    this.instanciaVariables();
    this.mr = this.modalService.open(nombModal);
  }

  //FUNCION PARA GUARDAR LA REVISTA
  ingresarRevista() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0].intIdRevista, this.vecBuscar[0].strNombre, this.vecBuscar[0].strPais, this.vecBuscar[0].strISSN,
      this.vecBuscar[0].intBasedeDatos, this.vecBuscar[0].strDescripcion, this.vecBuscar[0].strFactorSJR, this.vecBuscar[0].strCuartilSJR, this.vecBuscar[0].strFactorJCR,
      this.vecBuscar[0].strCuartilJCR, this.vecBuscar[0].intEstado, this.vecBuscar[0].strLink, 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
        location.reload()
      });
  }
  verDataRevista(objPersona: any, mombModal: any) {console.log(objPersona)
    this.instanciaVariables();
    this.vecBuscar[0]['intIdRevista'] = objPersona.intIdRevista;
    this.vecBuscar[0]['strNombre'] = objPersona.strNombre;
    this.vecBuscar[0]['strPais'] = objPersona.strPais;
    this.vecBuscar[0]['strISSN'] = objPersona.strIssn;
    this.vecBuscar[0]['intBasedeDatos'] = objPersona.intBasedeDatos;
    this.vecBuscar[0]['strDescripcion'] = objPersona.strDescripcion;
    this.vecBuscar[0]['strFactorSJR'] = objPersona.strFactorSJR;
    this.vecBuscar[0]['strCuartilSJR'] = objPersona.strCuartilSJR;
    this.vecBuscar[0]['strFactorJCR'] = objPersona.strFactorJCR;
    this.vecBuscar[0]['strCuartilJCR'] = objPersona.strCuartilJCR;
    this.vecBuscar[0]['intEstado'] = objPersona.estRevista;
    this.vecBuscar[0]['strLink'] = objPersona.strLink;
    this.opcion = 14;
    this.mr = this.modalService.open(mombModal);
    console.log(this.vecBaseDatos)

  }

  cerrarRevista() {
    this.mr.close();
  }


}
