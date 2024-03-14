import { Component, OnInit } from '@angular/core';
import { SesionUsuario } from "../../AutenticacionCas/SesionUsuario";
import { CasClient } from "../../AutenticacionCas/CasClient";

@Component({
  selector: 'app-ingreso-publicaciones',
  templateUrl: './ingreso-publicaciones.component.html',
  styleUrls: ['./ingreso-publicaciones.component.css']
})
export class IngresoPublicacionesComponent implements OnInit {

  constructor(private casclient: CasClient, private session: SesionUsuario
  ) { }

  async ngOnInit() {
    //this.procesar.abrir();
    if (!this.casclient.getLogin()) {
      this.casclient.saveTicket();
      await this.casclient.verificaLogin().then();
    }
    if (this.casclient.isAuthenticated() && this.casclient.getLogin()) {
      await this.session.InicioSesion();
    }
  }

}
