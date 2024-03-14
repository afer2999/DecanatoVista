import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { rutasPublicaciones } from './app-routing.module';
import { configuracion } from './recursos/config.service'

import { AppComponent } from './app.component';
import { InicioPublicacionComponent } from './portada/inicio-publicacion/inicio-publicacion.component';
import { IngresoPublicacionesComponent } from './portada/ingreso-publicaciones/ingreso-publicaciones.component';
import { RouterModule } from '@angular/router';

import { SesionUsuario } from './AutenticacionCas/SesionUsuario';
import { CasClient } from './AutenticacionCas/CasClient';
import { HttpService } from './AutenticacionCas/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { utilitarioService } from '../app/recursos/utilitarios.service';
import { Subject } from 'rxjs';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../app/serviciosPublicaciones/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { ToolsService } from '../app/recursos/tools.service';
import { AlertifyService } from './recursos/alertify.service';

import { swCentralPublicaciones } from "../app/serviciosPublicaciones/serviciosCentral.service";
import { AdminContentComponent } from './administrador/admin-content/admin-content.component';
import { AdminHeaderComponent } from './administrador/admin-header/admin-header.component';
import { AdminFooterComponent } from './administrador/admin-footer/admin-footer.component';
import { AdminSliderComponent } from './administrador/admin-slider/admin-slider.component';
import { AdminPrincipalComponent } from './administrador/admin-principal/admin-principal.component';
import { AdminBodyComponent } from './administrador/admin-body/admin-body.component';
import { AnalistaBodyComponent } from './analista/analista-body/analista-body.component';
import { AnalistaContentComponent } from './analista/analista-content/analista-content.component';
import { AnalistaSliderComponent } from './analista/analista-slider/analista-slider.component';
import { AnalistaPrincipalComponent } from './analista/analista-principal/analista-principal.component';
import { AnalistaHeaderComponent } from './analista/analista-header/analista-header.component';
import { AnalistaFooterComponent } from './analista/analista-footer/analista-footer.component';
import { AutorFooterComponent } from './autor/autor-footer/autor-footer.component';
import { AutorHeaderComponent } from './autor/autor-header/autor-header.component';
import { AutorBodyComponent } from './autor/autor-body/autor-body.component';
import { AutorPrincipalComponent } from './autor/autor-principal/autor-principal.component';
import { AutorSliderComponent } from './autor/autor-slider/autor-slider.component';
import { AutorContentComponent } from './autor/autor-content/autor-content.component';
import { AdminGestionUsuariosComponent } from './administrador/admin-gestion-usuarios/admin-gestion-usuarios.component';
import { NgbdModalContent } from './serviciosPublicaciones/loader/formatoloader.component';
import { AdminGestionRolesComponent } from './administrador/admin-gestion-roles/admin-gestion-roles.component';
import { AdminGestionEstadosComponent } from './administrador/admin-gestion-estados/admin-gestion-estados.component';
import { AdminGestionActividadesComponent } from './administrador/admin-gestion-actividades/admin-gestion-actividades.component';
import { AutorGestionRegistroComponent } from './autor/autor-gestion-registro/autor-gestion-registro.component';
import { AutorGestionSolicitudesComponent } from './autor/autor-gestion-solicitudes/autor-gestion-solicitudes.component';
import { GestionArticulosComponent } from './analista/gestion-articulos/gestion-articulos.component';
import { GestionCongresosComponent } from './analista/gestion-congresos/gestion-congresos.component';
import { GestionLibrosComponent } from './analista/gestion-libros/gestion-libros.component';
import { AdminPermisosComponent } from './administrador/admin-permisos/admin-permisos.component';
import { AdminAsignarPermisoComponent } from './administrador/admin-asignar-permiso/admin-asignar-permiso.component';
import { RevisionArticulosSolicitadosComponent } from './analista/revision-articulos-solicitados/revision-articulos-solicitados.component';
import { RevisionCongresosSolicitadosComponent } from './analista/revision-congresos-solicitados/revision-congresos-solicitados.component';
import { RevisionLibrosSolicitadosComponent } from './analista/revision-libros-solicitados/revision-libros-solicitados.component';
import { ArticulosRegionalesComponent } from './analista/articulos-regionales/articulos-regionales.component';
import { ArticulosnoRegionalesComponent } from './analista/articulosno-regionales/articulosno-regionales.component';
import { ArticulosCientificosComponent } from './analista/articulos-cientificos/articulos-cientificos.component';
import { ArticulosCongresoComponent } from './analista/articulos-congreso/articulos-congreso.component';
import { LibrosComponent } from './analista/libros/libros.component';
import { ProcedenciaComponent } from './analista/procedencia/procedencia.component';
import { RevistasComponent } from './analista/revistas/revistas.component';
import { BasesDeDatosComponent } from './analista/bases-de-datos/bases-de-datos.component';
import { LineaDeInvestigacionComponent } from './analista/linea-de-investigacion/linea-de-investigacion.component';
import { DirectorComponent } from './director/director.component';
import { RevisionDeCetificadosComponent } from './analista/revision-de-cetificados/revision-de-cetificados.component';
import { TipoCertificadoComponent } from './analista/tipo-certificado/tipo-certificado.component';
import { IngresoProduccionComponent } from './analista/ingreso-produccion/ingreso-produccion.component';
import { AnalistaReporteComponent } from './analista/analista-reporte/analista-reporte.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    InicioPublicacionComponent,
    IngresoPublicacionesComponent,
    AdminContentComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSliderComponent,
    AdminPrincipalComponent,
    AdminBodyComponent,
    AnalistaBodyComponent,
    AnalistaContentComponent,
    AnalistaSliderComponent,
    AnalistaPrincipalComponent,
    AnalistaHeaderComponent,
    AnalistaFooterComponent,
    AutorFooterComponent,
    AutorHeaderComponent,
    AutorBodyComponent,
    AutorPrincipalComponent,
    AutorSliderComponent,
    AutorContentComponent,
    AdminGestionUsuariosComponent,
    LoaderComponent,
    AdminGestionRolesComponent,
    AdminGestionEstadosComponent,
    AdminGestionActividadesComponent,
    AutorGestionRegistroComponent,
    AutorGestionSolicitudesComponent,
    GestionArticulosComponent,
    GestionCongresosComponent,
    GestionLibrosComponent,
    AdminPermisosComponent,
    AdminAsignarPermisoComponent,
    RevisionArticulosSolicitadosComponent,
    RevisionCongresosSolicitadosComponent,
    RevisionLibrosSolicitadosComponent,
    ArticulosRegionalesComponent,
    ArticulosnoRegionalesComponent,
    ArticulosCientificosComponent,
    ArticulosCongresoComponent,
    LibrosComponent,
    ProcedenciaComponent,
    RevistasComponent,
    BasesDeDatosComponent,
    LineaDeInvestigacionComponent,
    DirectorComponent,
    RevisionDeCetificadosComponent,
    TipoCertificadoComponent,
    IngresoProduccionComponent,
    AnalistaReporteComponent
  ],
  entryComponents: [NgbdModalContent],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    rutasPublicaciones,
    RouterModule,
    TableModule, BrowserAnimationsModule,
    DialogModule,
    CardModule,
    HttpClientModule, ButtonModule
  ],

  providers: [configuracion, CasClient, HttpService, SesionUsuario, swCentralPublicaciones, utilitarioService, Subject, ToolsService, AlertifyService, LoaderComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
