import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { rutasSWPublicaciones } from "../rutasService/rutasServicios"
import { rutasPublicaciones } from '../app-routing.module';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class swPublicaciones {

  public vecParametro: Array<any>;
  constructor(private http: HttpClient,) { this.vecParametro = [] }

  getUsuarios = (op: any, cond1: any, cond2: any, cond3: any, cond4: any, cond5: any) => {
    return this.http.get(rutasSWPublicaciones.rutaPublicacion + "getGestionUsuarios/" + op + "/" + cond1 + "/" + cond2 + "/" + cond3 + "/" + cond4 + "/" + cond5 + "/" + Math.floor((Math.random() * 1000)));
  };

  //ingresoGestionUsuarios
  postAddUsuario = (param1: any, param2: any, param3: any, param4: any, param5: any, param6: any, param7: any, param8: any, param9: any,
    param10: any, param11: any, param12: any, param13: any, param14: any, param15: any, opcion: any) => {
    this.vecParametro = [];
    this.vecParametro.push({
      dato1: param1,
      dato2: param2,
      dato3: param3,
      dato4: param4,
      dato5: param5,
      dato6: param6,
      dato7: param7,
      dato8: param8,
      dato9: param9,
      dato10: param10,
      dato11: param11,
      dato12: param12,
      dato13: param13,
      dato14: param14,
      dato15: param15,
      opc: opcion
    });
    return this.http.post(
      rutasSWPublicaciones.rutaPublicacion + "/ingresoGestionUsuarios", this.vecParametro
    );
  };

  envioCorreo(asunto:any, recibe:any, contenido:any) {
    let headers = new Headers();
    this.vecParametro = [];
    this.vecParametro.push({
      strAsunto: asunto,
      lstReceptores: [
        {
          email: recibe
        }
      ],
      lstArchivosAdjuntos: [],
      strCodigoSistema: "SYSPRODUCCION",
      strBody: contenido
    });
    return this.http.post(
      rutasSWPublicaciones.rutaCentral + "envioNotificacion", this.vecParametro
    );
  }

  //OBTENER EL TOKEN DE LA APLICACION PARA SUBIR EL PDF
  postTokenPDF = () => {
    const vecPDF = {
      idAplicacion: rutasSWPublicaciones.idAppArchivo,
      jwtsecret: rutasSWPublicaciones.claveArchivo,
      activo: 'true'
    }
    return this.http.post(rutasSWPublicaciones.rutaTokenDrive, vecPDF);
  };
  //CARGAR EL ARCHIVO PDF SELECCIONADO
  subirArchivos(contenido: any, token: any): Observable<any> {
    let direccion = rutasSWPublicaciones.rutaCargarArchivo;
    let localToken = token;
    return this.http.post<any>(direccion, contenido, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localToken).set('idaplicacion', rutasSWPublicaciones.idAppArchivo)
        .set('jwtsecret', rutasSWPublicaciones.claveArchivo).set('activo', 'true')
    })
  }
  //MUESTRA EL ARCHIVO CARGADO
  mostrarArchivo = (idToken: any, ruta: string) => {
    const vecPDF = {
      ruta: ruta,
      archivo: ruta,
      idAplicacion: rutasSWPublicaciones.idAppArchivo,
      idCredencial: 1,
      jwtsecret: rutasSWPublicaciones.claveArchivo,
      activo: "true"
    }
    return this.http.post<any>(rutasSWPublicaciones.rutaObtenerArchivo, vecPDF, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + idToken).set('idaplicacion', rutasSWPublicaciones.idAppArchivo)
        .set('jwtsecret', rutasSWPublicaciones.claveArchivo).set('activo', 'true')
    })
  };

  //MUESTRA EL ARCHIVO CARGADO
  obtener64Firmado = (idToken: any) => {
    const vecPDF = {
      idAplicacion: rutasSWPublicaciones.idAppArchivo,
      activo: "true",
      listado: [{ "nombre": "202301.pdf" }]
    }
    return this.http.post<any>(rutasSWPublicaciones.rutaObtenerArchivo64, vecPDF, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + idToken).set('idaplicacion', rutasSWPublicaciones.idAppArchivo).
        set('jwtsecret', rutasSWPublicaciones.claveArchivo).set('activo', 'true')
    })
  };


}
