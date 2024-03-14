
import { Component, OnInit, ViewChild } from '@angular/core';
import { utilitarioService } from '../../../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf'; 'jspdf'
import autoTable from 'jspdf-autotable'; 'jspdf-autotable';
import { style } from '@angular/animations';
import { toString } from '@ng-bootstrap/ng-bootstrap/util/util';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { configuracion } from '../../recursos/config.service';
import { AlertifyService } from 'src/app/recursos/alertify.service';

@Component({
  selector: 'app-autor-gestion-registro',
  templateUrl: './autor-gestion-registro.component.html',
  styleUrls: ['./autor-gestion-registro.component.css']
})
export class AutorGestionRegistroComponent implements OnInit {
  private mr: any; public rutaCarga: SafeResourceUrl | undefined;

  public vecArticulos: Array<any>; public vecSolicitudes: Array<any>; public vecTipo: Array<any>;
  public intNomb: number; public selecTipo: number;
  constructor(public dtTriggerUsuario: Subject<any>, public swCentral: swCentralPublicaciones, private confMensaje: configuracion,
    private swPublicacion: swPublicaciones, private modalService: NgbModal, private sanitizer: DomSanitizer, private alerti: AlertifyService) {
    this.vecArticulos = []; this.intNomb = 0; this.vecSolicitudes = []; this.selecTipo = 0; this.vecTipo = [];
  }

  ngOnInit() {
    this.intNomb = localStorage.getItem('localNombramiento') == 'true' ? 1 : 0;
    this.verTodosUsuarios();
    this.verDataToken();
  }
  //VER EL TOKEN REGISTRADO EN LA BASE DE DATOS
  async verDataToken() {
    this.swPublicacion.getUsuarios(25, 'na', 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('archivoToken', data.usuario[0]['strToken']);
      }
      else {
        this.swPublicacion.postTokenPDF().subscribe((data: any) => {
          if (data.success) {

            this.swPublicacion.postAddUsuario(data.token, data.created, data.exp, localStorage.getItem('loginID'), 'na', 'na', 'na',
              'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 15).subscribe((data: any) => {
                this.verDataToken();
              });
          }
        });
      }
    })
  }
  async verTodosUsuarios() {
    this.vecArticulos = []; this.vecSolicitudes = []; this.vecTipo = [];


    this.swPublicacion.getUsuarios(23, localStorage.getItem('loginID'), 1, 1, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecTipo = data.usuario;
      }
    })

    this.swPublicacion.getUsuarios(18, localStorage.getItem('loginID'), 1, 1, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecArticulos = data.usuario;
      }
    })

    this.swPublicacion.getUsuarios(40, localStorage.getItem('loginCedula'), 1, 1, 'na', 'na').subscribe((data: any) => {
      if (data.success) this.vecSolicitudes = data.usuario;
    })
  }

  //ABRIR UN MODAL
  modalAddUsuario(nombModal: any) {
    this.mr = this.modalService.open(nombModal);
  }

  agregarSolicitud() {
    this.swPublicacion.postAddUsuario(1, localStorage.getItem('loginCedula'), localStorage.getItem('loginNombre'),
      localStorage.getItem('loginApellido'), 0, this.selecTipo, 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 9).subscribe((data: any) => {
        if (data.consulta) {
          this.verTodosUsuarios();
          this.envioCorreo();
        }
        else
          this.alerti.error('No se pudo generar la solicitud');
      });
  }
  envioCorreo() {
    let contenido = this.confMensaje.bodyMensaje(1) + localStorage.getItem('loginNombre') + this.confMensaje.bodyMensaje(2) + this.confMensaje.bodyMensaje(3);
    this.swPublicacion.envioCorreo("Solicitud recibida", localStorage.getItem('loginCorreo'), btoa(contenido)).subscribe((res: any) => {
      if (res.resEnvio) {
        this.mr.close();
        this.alerti.success('Solicitud enviada');
      }
    });
  }
  //RECUPERAMOS EL DOCUMENTO DESDE EL DRIVE
  async verArticulos(objeto: any, modal: any) {
    await this.verDataToken();
    if (objeto.rutaCertificado != '-') {

      this.swPublicacion.mostrarArchivo(localStorage.getItem('archivoToken'), objeto.rutaCertificado).subscribe((data: any) => {
        if (data.success) {
          this.construirPDF(data.download, modal);
        }
      })
    }
  }
  //OBTENER EL 64 COMPLETO Y SANITIZAR
  async construirPDF(ruta: any, nombModal: any) {
    let rutaLocal: any = await this.toDataURL(ruta);
    this.rutaCarga = this.bypassAndSanitize(rutaLocal);
    this.mr = this.modalService.open(nombModal);
  }
  //CONVERTIR UNA RUTA EN BASE 64
  toDataURL = async (url: any) => {
    var res = await fetch(url);
    var blob = await res.blob();
    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    return result
  };
  //DEPURA LA URL CONVERTIDA EN BASE 64
  bypassAndSanitize(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  cerrarModal(){
    this.mr.close();
  }

}

