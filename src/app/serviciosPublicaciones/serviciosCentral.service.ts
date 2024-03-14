import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { rutasSWPublicaciones } from "../rutasService/rutasServicios"
import { rutasPublicaciones } from '../app-routing.module';
@Injectable({
  providedIn: "root",
})
export class swCentralPublicaciones {
  constructor(private http: HttpClient) {}

  getPersonaCorreo = (correo:any) => {
    return this.http.get(rutasSWPublicaciones.rutaCentral + "personaPorCorreo/" + correo);
  };

  getPersonaCodigo = (persona:any) => {
    return this.http.get(rutasSWPublicaciones.rutaCentral + "personaPorId/" + persona);
  };

  getPersonaCedula = (persona:any) => {
    return this.http.get(rutasSWPublicaciones.rutaCentral + "personaPorDocumento/" + persona);
  };
  getPersonaCargo = (persona:any) => {
    return this.http.get(rutasSWPublicaciones.rutaCentral + "personaCargo/" + persona);
  };

  getPersonaNombre = (persona:any) => {
    return this.http.get(rutasSWPublicaciones.rutaCentral + "getPersonaNombre/" + persona);
  };

  // ingresoGestionUsuarios
  // postAddDocente = (body) => {
  //   console.log("json post", body);
  //   return this.http.post(
  //     environment.nodeservice + "/docentes/addDocente",
  //     body
  //   );
  // };

}
