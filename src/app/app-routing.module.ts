import { ModuleWithProviders, NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioPublicacionComponent } from './portada/inicio-publicacion/inicio-publicacion.component';
import { IngresoPublicacionesComponent } from './portada/ingreso-publicaciones/ingreso-publicaciones.component';

import { AdminPrincipalComponent } from './administrador/admin-principal/admin-principal.component';
import { AdminBodyComponent } from './administrador/admin-body/admin-body.component';
import { AnalistaPrincipalComponent } from './analista/analista-principal/analista-principal.component';
import { AnalistaBodyComponent } from './analista/analista-body/analista-body.component';
import { AutorBodyComponent } from './autor/autor-body/autor-body.component';
import { AutorPrincipalComponent } from './autor/autor-principal/autor-principal.component';
import { AdminGestionUsuariosComponent } from './administrador/admin-gestion-usuarios/admin-gestion-usuarios.component';
import { AdminGestionRolesComponent } from './administrador/admin-gestion-roles/admin-gestion-roles.component';
import { AdminGestionEstadosComponent } from './administrador/admin-gestion-estados/admin-gestion-estados.component';
import { AdminGestionActividadesComponent } from './administrador/admin-gestion-actividades/admin-gestion-actividades.component';
import { AutorGestionRegistroComponent } from './autor/autor-gestion-registro/autor-gestion-registro.component';
import { AutorGestionSolicitudesComponent } from './autor/autor-gestion-solicitudes/autor-gestion-solicitudes.component';

import { AdminPermisosComponent } from './administrador/admin-permisos/admin-permisos.component';
import { AdminAsignarPermisoComponent } from './administrador/admin-asignar-permiso/admin-asignar-permiso.component';
import { RevisionArticulosSolicitadosComponent } from './analista/revision-articulos-solicitados/revision-articulos-solicitados.component';
import { RevisionCongresosSolicitadosComponent } from './analista/revision-congresos-solicitados/revision-congresos-solicitados.component';
import { RevisionLibrosSolicitadosComponent } from './analista/revision-libros-solicitados/revision-libros-solicitados.component';

import { GestionArticulosComponent } from './analista/gestion-articulos/gestion-articulos.component';
import { GestionCongresosComponent } from './analista/gestion-congresos/gestion-congresos.component';
import { GestionLibrosComponent } from './analista/gestion-libros/gestion-libros.component';

import { ArticulosCientificosComponent } from './analista/articulos-cientificos/articulos-cientificos.component';
import { ArticulosCongresoComponent } from './analista/articulos-congreso/articulos-congreso.component';
import { LibrosComponent } from './analista/libros/libros.component'
import { ArticulosRegionalesComponent } from './analista/articulos-regionales/articulos-regionales.component';
import { BasesDeDatosComponent } from './analista/bases-de-datos/bases-de-datos.component';
import { LineaDeInvestigacionComponent } from './analista/linea-de-investigacion/linea-de-investigacion.component';
import { RevistasComponent } from './analista/revistas/revistas.component';
import { ProcedenciaComponent } from './analista/procedencia/procedencia.component';
import { RevisionDeCetificadosComponent } from './analista/revision-de-cetificados/revision-de-cetificados.component';
import { TipoCertificadoComponent } from './analista/tipo-certificado/tipo-certificado.component';
import { DirectorComponent } from './analista/director/director.component';
import { IngresoProduccionComponent } from './analista/ingreso-produccion/ingreso-produccion.component';
import { AnalistaReporteComponent } from './analista/analista-reporte/analista-reporte.component';


const appRoutes: Routes = [
  {
    path: "",
    component: InicioPublicacionComponent,
  },
  {
    path: "ingreso",
    component: IngresoPublicacionesComponent,
  },
  {
    path: 'adminInicio',
    component: AdminPrincipalComponent,
    children: [
      {
        path: '',
        component: AdminBodyComponent
      },
      {
        path: 'adminUsuarios',
        component: AdminGestionUsuariosComponent
      },
      {
        path: 'adminRoles',
        component: AdminGestionRolesComponent
      },

      {
        path: 'adminEstados',
        component: AdminGestionEstadosComponent
      },
      {
        path: 'adminActividades',
        component: AdminGestionActividadesComponent
      },
      {
        path: 'adminPermisos',
        component: AdminPermisosComponent
      },
      {
        path: 'adminAsignar',
        component: AdminAsignarPermisoComponent
      }

    ]
  },
  {
    path: 'analistaInicio',
    component: AnalistaPrincipalComponent,
    children: [
      {
        path: '',
        component: AnalistaBodyComponent,
      },
      {
        path: 'analistaSolicitudArticulos',
        component: RevisionArticulosSolicitadosComponent,
      },
      {
        path: 'analistaRevisionDeCetificados',
        component: RevisionArticulosSolicitadosComponent,
      },
      {
        path: 'analistaSolicitudCongreso',
        component: RevisionCongresosSolicitadosComponent,
      },
      {
        path: 'analistaSolicitudLibros',
        component: RevisionLibrosSolicitadosComponent,
      },
      {
        path: 'analistaGestionArticulos',
        component: GestionArticulosComponent,
      },
      {
        path: 'analistaGestionCongresos',
        component: GestionCongresosComponent,
      },
      {
        path: 'analistaGestionLibros',
        component: GestionLibrosComponent,
      },
      {
        path: 'analistaArticulosRegionales',
        component: ArticulosRegionalesComponent,
      },
      {
        path: 'analistaArticulosCientificos',
        component: ArticulosCientificosComponent,
      },

      {
        path: 'analistaArticulosCongreso',
        component: ArticulosCongresoComponent,
      },

      {
        path: 'analistaLibros',
        component: LibrosComponent,
      },
      {
        path: 'analistaProcedencia',
        component: ProcedenciaComponent,
      },
      {
        path: 'analistaLineasdeInvestigacion',
        component: LineaDeInvestigacionComponent,
      },
      {
        path: 'analistaBasesdeDatos',
        component: BasesDeDatosComponent,
      },
      {
        path: 'analistaRevistas',
        component: RevistasComponent,
      },
      {
        path: 'analistaDirector',
        component: DirectorComponent
      },
      {
        path: 'analistaTipoCertificado',
        component: TipoCertificadoComponent
      },
      {
        path: 'analistaCertificados',
        component: RevisionDeCetificadosComponent
      },
      {
        path: 'analistaProduccion',
        component: IngresoProduccionComponent
      },
      {
        path: 'analistaReporte',
        component: AnalistaReporteComponent
      }
    ]
  },
  {
    path: 'autorInicio',
    component: AutorPrincipalComponent,
    children: [
      {
        path: '',
        component: AutorBodyComponent,
      },
      {
        path: 'autorRegistro',
        component: AutorGestionRegistroComponent,
      },
      {
        path: 'autorSolicitud',
        component: AutorGestionSolicitudesComponent,
      }

    ]
  }
];

export const rutasPublicaciones: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
