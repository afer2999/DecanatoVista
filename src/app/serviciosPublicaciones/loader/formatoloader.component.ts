import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { style } from '@angular/animations';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div  style="text-align:center; vertical-align:middle;">
  <h3> Por Favor Espere.</h3>
  <img [src]="'../../../assets/lodingdtic.gif'" width="100" />
  <h3> Cargando Información.</h3>
</div>`

})
export class NgbdModalContent {
  constructor(public activeModal: NgbActiveModal) { }
}


