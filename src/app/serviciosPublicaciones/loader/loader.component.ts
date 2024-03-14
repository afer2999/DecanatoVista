import { Component, Input } from '@angular/core';

import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../loader/formatoloader.component'


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styles: [`
  .modal-dialog {
    width: 0px;
    padding-top: 30px;
    padding-bottom: 130px;
}
.dark-modal .modal-content {
  background-color: #292b2c;
  color: white;
}
.dark-modal .close {
  color: white;
}
.light-blue-backdrop {
  background-color: #5cb3fd;
}
`]
})
export class LoaderComponent {
  public mr: any
  //public imagen: string

  constructor(private modalService: NgbModal) {
  }

  abrir() {
    this.mr = this.modalService.open(NgbdModalContent, { size: 'sm', backdrop: 'static', keyboard: false });

  }
  cerrar() {
    this.mr.close();
  }

}
