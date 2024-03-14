import { Injectable } from "@angular/core";
import { CasClient } from "../AutenticacionCas/CasClient";
import { Location } from "@angular/common";
import { Router, CanActivate } from "@angular/router";
import { swCentralPublicaciones } from "../serviciosPublicaciones/serviciosCentral.service";
import { swPublicaciones } from '../serviciosPublicaciones/serviciosPublicaciones.service';
import { configuracion } from '../recursos/config.service';


@Injectable()
export class SesionUsuario implements CanActivate {
  private idUsuario: any;
  correo: any;
  lstListadoMenu: any;
  roleleccionado: any;
  constructor(
    private router: Router, private casclient: CasClient, private swCentral: swCentralPublicaciones, private swPublicacion: swPublicaciones,
    private config: configuracion
  ) { }

  async InicioSesion() {
    this.swCentral.getPersonaCorreo(this.casclient.getLogin()).subscribe((data: any) => {
      if (data.success) {
        console.log(data.datos)
        localStorage.setItem('loginID', data.datos.per_id);
        localStorage.setItem('loginCorreo', data.datos.per_email);
        localStorage.setItem('loginNombre', data.datos.per_nombres);
        localStorage.setItem('loginNombreAutor',data.datos.per_nombres + ' ' + data.datos.per_primerApellido + ' ' + data.datos.per_segundoApellido);
        localStorage.setItem('loginApellido', data.datos.per_primerApellido + ' ' + data.datos.per_segundoApellido);
        this.verDatosPersona(data.datos.per_id);
      }
    })
  }

  async verDatosPersona(codigo: any) {
    this.swCentral.getPersonaCodigo(codigo).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('loginCedula', data.datos.pid_valor);
        this.verCargo(localStorage.getItem('loginCedula'));
      }
    })
  }
  //BUSCAR EN LA CENTRALIZADA EL CARGO
  verCargo(datoUser: any) {
    this.swCentral.getPersonaCargo(datoUser).subscribe((data: any) => {
      if (data.success) {
        this.consumirRoles(datoUser);
      }
      else
        this.router.navigate(["/"]);
    })
  }
  //VER TODOS LOS ROLES DEL USUARIO
  async consumirRoles(usuario: any) {
    this.swPublicacion.getUsuarios(6, usuario, 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('localNombramiento', data.usuario[0]['bitNombramiento']);
        this.cambiarRol(data.usuario[0]['intIdRol']);
      }
    })
  }

  cambiarRol(numRuta: any) {
    this.router.navigate([this.config.cambiaRol(numRuta)]);
  }

  //Cerrar la sesion del Usuario
  CerrarCession() {
    this.casclient.SalirSistema();
    this.casclient.Logout();
    sessionStorage.removeItem("tokenKey");
    sessionStorage.removeItem("IdProcesoSeleccionado");
    sessionStorage.removeItem("desProceso");
    this.canActivate();
  }

  canActivate(): boolean {
    if (!this.casclient.isAuthenticated()) {
      this.router.navigate(["logout"]);
      return false;
    }
    return true;
  }

}
