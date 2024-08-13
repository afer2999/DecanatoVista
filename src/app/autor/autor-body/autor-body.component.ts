import { Component, OnInit } from '@angular/core';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { SesionUsuario } from '../../AutenticacionCas/SesionUsuario';
import { Router } from '@angular/router';
import { configuracion } from '../../recursos/config.service';
import { AlertifyService } from 'src/app/recursos/alertify.service';
import { CasClient } from 'src/app/AutenticacionCas/CasClient';
import { ToolsService } from '../../recursos/tools.service';

@Component({
  selector: 'app-autor-body',
  templateUrl: './autor-body.component.html',
  styleUrls: ['./autor-body.component.css']
})
export class AutorBodyComponent implements OnInit {

  public nombUsuario: any; public intRol: number = 3; private strRol: any;
  public nombreAutor: any;
  public nombresUsuarios: any;
  public cedula: any; public totalRegional: number = 0; public totalCientifico: number = 0; totalCongreso: number = 0; totalLibro: number = 0;
  public vecRolPersona: Array<any>; public selectRol: number;


  constructor(private tools: ToolsService, private swPublicacion: swPublicaciones, private rutaCambio: Router, private config: configuracion, private router: Router, private alerti: AlertifyService,
    private casClose: CasClient) {
    this.nombUsuario = localStorage.getItem('loginCorreo');
    this.nombreAutor = localStorage.getItem('loginNombre');
    this.nombresUsuarios = localStorage.getItem('loginNombreAutor');
    this.cedula = localStorage.getItem('cedula');
    this.vecRolPersona = []; this.selectRol = 0; this.strRol = '';
  }

  ngOnInit() {
    if (localStorage.getItem('loginID') == null || localStorage.getItem('loginID') == '' ||
      localStorage.getItem('loginCorreo') == null || localStorage.getItem('loginCorreo') == '' ||
      localStorage.getItem('loginNombre') == null || localStorage.getItem('loginNombre') == '') {
      this.alerti.error('Acceso no autorizado');
      this.router.navigate(["/"]);
    } else {
      if (localStorage.getItem('banCargar') == '0') {
        location.reload();
        localStorage.setItem('banCargar', '1')
      }
      this.strRol = localStorage.getItem('idUser')?.toString();
      this.selectRol = parseInt(this.strRol);
      this.consumirRoles();
      this.tools.ColorUsuario(2);
      this.obtenerTotalRegistros();
    }
  }
  async consumirRoles() {
    this.swPublicacion.getUsuarios(6, localStorage.getItem('loginCedula'), 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecRolPersona = data.usuario;
      }
    })
  }
  cambiarRol() {
    this.rutaCambio.navigate([this.config.cambiaRol(this.selectRol)]);
  }
  async obtenerTotalRegistros() {
    const resTotal = await new Promise<any>(resolve =>
      this.swPublicacion.getUsuarios(18, localStorage.getItem('loginID'), 1, 1, 'na', 'na').subscribe(translated => {
        resolve(translated)
      }));
    console.log(resTotal)
    if (resTotal.success) {
      for (let objT of resTotal.usuario) {
        if (objT.strCodigoArticulo.indexOf('RR') >= 0)
          this.totalRegional++;
        if (objT.strCodigoArticulo.indexOf('RC') >= 0)
          this.totalCientifico++;
        if (objT.strCodigoArticulo.indexOf('C') >= 0)
          this.totalCongreso++;
        if (objT.strCodigoArticulo.indexOf('L') >= 0)
          this.totalLibro++;
      }
    }
  }

  salirPublicaciones() {
    this.remove();
    //this.router.navigate(['/']);
  }
  public remove() {
    this.casClose.Logout();
    window.sessionStorage.removeItem('ticketUser')
    window.sessionStorage.removeItem('loginUser')
    window.sessionStorage.removeItem('clientName')
  }

}
