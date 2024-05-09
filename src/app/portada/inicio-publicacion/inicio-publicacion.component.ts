import { Component, OnInit } from '@angular/core';
import { configuracion } from '../../recursos/config.service';
import { Subject } from 'rxjs';
import { swCentralPublicaciones } from '../../serviciosPublicaciones/serviciosCentral.service';
import { swPublicaciones } from '../../serviciosPublicaciones/serviciosPublicaciones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertifyService } from 'src/app/recursos/alertify.service';
import { rutasSWPublicaciones } from 'src/app/rutasService/rutasServicios';

@Component({
  selector: 'app-inicio-publicacion',
  templateUrl: './inicio-publicacion.component.html',
  styleUrls: ['./inicio-publicacion.component.css']
})
export class InicioPublicacionComponent implements OnInit {
  private mr: any;
  isLoading = true; public txtUsuarioInicio: string = ''; public lblRoles: string = '';
  private opcion = 1; public vecBuscar: Array<any>; public vecBuscaAutores: Array<any>; public vecAutores: Array<any>;
  constructor(private loadjs: configuracion, public swCentral: swCentralPublicaciones, private modalService: NgbModal, private swPublicacion: swPublicaciones, private alerti: AlertifyService,) { this.vecBuscar = []; this.vecAutores = []; this.vecBuscaAutores = []; }

  ngOnInit() {
    this.loadjs.cargarScriptInicio();
    this.OpenMenu();
    this.instanciaVariables();
  }
  OpenMenu() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2200);
  }


  modalAddUsuario(nombModal: any) {
    this.opcion = 1;
    this.mr = this.modalService.open(nombModal);
  }
  instanciaVariables() {
    this.vecBuscar = [];
    this.vecBuscar.push({
      intIdPersona: '', strCedula: '', strNombres: '', strApellidos: '', strCorreo: '', strTelefono: '', strCargo: '',
      bitNombramiento: '', strDependencia: '', intEstado: ''
    })
  }
  //BUSCAR EN LA CENTRALIZADA
  verUsuario() {
    this.swCentral.getPersonaCedula(this.vecBuscar[0]['strCedula']).subscribe((data: any) => {
      if (data.success) {
        this.verCargo();
        this.vecBuscar[0]['intIdPersona'] = data.datos.per_id;
        this.vecBuscar[0]['strNombres'] = data.datos.per_nombres;
        this.vecBuscar[0]['strApellidos'] = data.datos.per_primerApellido + ' ' + data.datos.per_segundoApellido;
        this.vecBuscar[0]['strCorreo'] = data.datos.per_email;
        this.vecBuscar[0]['strTelefono'] = data.datos.per_telefonoCelular;
        this.vecBuscar[0]['bitNombramiento'] = '1';
        this.vecBuscar[0]['strDependencia'] = '';
        this.vecBuscar[0]['intEstado'] = '1';
      }
    })
  }
  //BUSCAR EN LA CENTRALIZADA EL CARGO
  verCargo() {
    this.swCentral.getPersonaCargo(this.vecBuscar[0]['strCedula']).subscribe((data: any) => {
      if (data.success) {
        this.vecBuscar[0]['strCargo'] = data.cargo.puesto;
      }
    })
  }
  ingresarUsuario() {
    this.swPublicacion.postAddUsuario(this.vecBuscar[0]['intIdPersona'], this.vecBuscar[0]['strCedula'], this.vecBuscar[0]['strNombres'],
      this.vecBuscar[0]['strApellidos'], this.vecBuscar[0]['strCorreo'], this.vecBuscar[0]['strTelefono'], this.vecBuscar[0]['strCargo'],
      this.vecBuscar[0]['bitNombramiento'], this.vecBuscar[0]['strDependencia'], this.vecBuscar[0]['intEstado'], 'na', 'na', 'na', 'na', 'na', this.opcion).subscribe((data: any) => {
        
        this.swPublicacion.postAddUsuario(this.vecBuscar[0]['intIdPersona'], 2, 1, 'na', 'na', 'na', 'na',
        'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na', 5).subscribe((data: any) => {
          location.reload();

          this.alerti.success("Usuario Registrado");
        });

      });
  }

  buscarUsuario() {
    this.alerti.success("Autor Registrado");
    this.swPublicacion.getUsuarios(43, this.vecBuscaAutores[0]['cedula'], 2, 3, 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecBuscaAutores[0]['codigo'] = data.usuario[0]['intIdPersona'];
        this.vecBuscaAutores[0]['cedula'] = data.usuario[0]['strCedula'];
        this.vecBuscaAutores[0]['nombres'] = data.usuario[0]['strNombres'] + ' ' + data.usuario[0]['strApellidos'];
        this.vecBuscaAutores[0]['cargo'] = data.usuario[0]['strCargo'];
        this.vecBuscaAutores[0]['dependencia'] = data.usuario[0]['strDependencia'];

        this.alerti.success("Autor Registrado");
      }
      else {
        this.vecBuscaAutores[0]['codigo'] = '';
        this.vecBuscaAutores[0]['nombres'] = '';
        this.vecBuscaAutores[0]['cargo'] = '';
        this.vecBuscaAutores[0]['dependencia'] = '';
        this.alerti.error('No se encontró al autor');
      }
    })
  }
  agregarAutor() {
    if (this.vecBuscaAutores[0]['codigo'] == '')
      this.alerti.error('Seleccione un autor');
    else {
      this.swPublicacion.postAddUsuario(this.vecBuscaAutores[0]['articulo'], this.vecBuscaAutores[0]['codigo'],
        0, 0, 2, '-', 'na', 'na', 'na', 'na',
        'na', 'na', 'na', 'na', 'na', 12).subscribe((data: any) => {
          if (data.consulta) {
            this.alerti.success('Autor Registrado correctamente');
            this.vecBuscaAutores[0]['codigo'] = '';
            this.vecBuscaAutores[0]['nombres'] = '';
            this.vecBuscaAutores[0]['cargo'] = '';
            this.vecBuscaAutores[0]['dependencia'] = '';
            this.verAutores(this.vecBuscaAutores[0]['articulo']);
          }
        });
    }
  }
  verModAutores(objUser: any, nombModal: any) {
    this.instanciaVariables();
    this.vecBuscaAutores[0]['articulo'] = objUser.intArticulo;
    this.verAutores(objUser.intArticulo);
    this.mr = this.modalService.open(nombModal);
  }

  verAutores(numArticulo: string) {
    this.vecAutores = [];
    this.swPublicacion.getUsuarios(42, numArticulo, 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        this.vecAutores = data.usuario;
      }
    })
  }
  cerrarModal() {
    this.mr.close();
  }

  //QUITAR UN AUTOR DE UN ARTICULO
  quitarAutor(dataAutor: any) {
    this.alerti.confirm('Está seguro de eliminar al autor', () => {

      this.swPublicacion.postAddUsuario(dataAutor.intArticulo, dataAutor.intPersona, 'na', 'na', 'na', 'na', 'na', 'na', 'na', 'na',
        'na', 'na', 'na', 'na', 'na', 22).subscribe((data: any) => {
          if (data.consulta) {
            this.alerti.success('Autor eliminado');
            this.verAutores(this.vecBuscaAutores[0]['articulo']);
          }
        });
    });
  }
  //VERIFICAMOS EL ROL DE AUTOR
  verRolesRegistro() {
    this.swPublicacion.getUsuarios(6, this.txtUsuarioInicio, 'na', 'na', 'na', 'na').subscribe((data: any) => {
      if (data.success) {
        if (data.success) {
          if (data.usuario.filter((objUser: any) => objUser.intIdRol == 2).length > 0)
            this.lblRoles = 'Usted cuenta con un perfil de autor. inicie sesión';
          else
            this.lblRoles = 'Usuario registrado, no cuenta con un perfil de autor pero puede iniciar sesión';
        }
        else
          this.lblRoles = 'Usuario no encontrado como autor, debe crear una cuenta';
      }
      else
        this.lblRoles = 'Usuario no encontrado como autor, debe crear una cuenta';
    })
  }

}


