import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {
  public strDay: any;
  public strMes2: any;

  constructor() { }

  ColorUsuario(rol: number) {
    if (rol == 0) {
      $('head').append('<link rel="stylesheet"  href="assets/estilosAdmin/css/administrador.css" type="text/css"/>');
    }
    if (rol == 1) {
      $('head').append('<link rel="stylesheet"  href="assets/estilosAdmin/css/director.css" type="text/css"/>');
    }
    if (rol == 2) {
      $('head').append('<link rel="stylesheet"  href="assets/estilosAdmin/css/docente.css" type="text/css"/>');
    }
    if (rol == 3) {
      $('head').append('<link rel="stylesheet"  href="assets/estilosAdmin/css/analista1.css" type="text/css"/>');
    }
  }

}
