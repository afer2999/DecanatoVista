import { Injectable } from '@angular/core';
import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';

@Injectable()
export class EjecutarScript {


  RecargarPestaña() {
    this.loadScript("../assets/js/bloquear.js");
  }

  //Js de la Pagina Princiapl FanPage
  cargarFanPageDitc() {
    this.loadScript("../../assets/estilosPublic/core/assets/vendor/domready/ready.min7016.js");
  }

//Cargar Script
  public loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }
}
