import { Component, OnInit } from '@angular/core';
import { configuracion } from '../../recursos/config.service';

@Component({
  selector: 'app-inicio-publicacion',
  templateUrl: './inicio-publicacion.component.html',
  styleUrls: ['./inicio-publicacion.component.css']
})
export class InicioPublicacionComponent implements OnInit {
  isLoading = true;
  constructor(private loadjs:configuracion) { }

  ngOnInit() {
    this.loadjs.cargarScriptInicio();
     this.OpenMenu();

  }
  OpenMenu() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2200);
  }

}
