import { Component, OnInit } from '@angular/core';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { Router, CanActivate } from "@angular/router";

@Component({
  selector: 'app-analista-slider',
  templateUrl: './analista-slider.component.html',
  styleUrls: ['./analista-slider.component.css']
})
export class AnalistaSliderComponent implements OnInit {
  public vecPadreOpcion: Array<any>; public vecSubOpcion: Array<any>;
  constructor(private router: Router, private swPublicacion: swPublicaciones) {
    this.vecPadreOpcion = []; this.vecSubOpcion = [];

  }

  ngOnInit(): void {

    this.verOpcionesPadreMenu();
    this.verOpcionesSubMenu();
  }

  async verOpcionesPadreMenu() {
    this.vecPadreOpcion = [];
    this.swPublicacion.getUsuarios(14, localStorage.getItem('idUser'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecPadreOpcion = data.usuario;
      }
    })
  }
  async verOpcionesSubMenu() {
    this.vecSubOpcion = [];
    this.swPublicacion.getUsuarios(15, localStorage.getItem('idUser'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecSubOpcion = data.usuario;
      }
    })
  }

  irRutaHijo(opcion:any){
    this.router.navigate(["/analistaInicio/"+opcion.strUrl]);
  }
}
