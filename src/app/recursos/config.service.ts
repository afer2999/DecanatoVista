import { Injectable } from '@angular/core';
import { recursosPublicaciones } from './interfaz';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rutasSWPublicaciones } from '../rutasService/rutasServicios';

@Injectable()
export class configuracion {

  constructor(private http: HttpClient) { }

  cargarScriptInicio() {
    this.loadScript("../../assets/estilosInicio/inicio.js");
  }

  public loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }

  cambiaRol(rol: any) {
    localStorage.setItem('banCargar', "0");
    localStorage.setItem("idUser", rol);
    let ruta: string = "/";
    if (rol == 1)
      ruta = "../adminInicio";
    else if (rol == 2)
      ruta = "../autorInicio";
    else
      ruta = "../analistaInicio";
    return (ruta);
  }

  FirmarEc(token: any, datos: any): Observable<any> {
    let direccion = recursosPublicaciones.rutaFirmaEC + 'rutaFirma/firmarDocumentos';
    return this.http.post<any>(direccion, datos, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token).set('idaplicacion', rutasSWPublicaciones.idAppArchivo)
        .set('jwtsecret', rutasSWPublicaciones.claveArchivo).set('activo', 'true')
    });
  }

  recuperarArchivoFirmaEc(token: any, datos: any): Observable<any> {
    let direccion = recursosPublicaciones.rutaFirmaEC + 'rutaFirma/recuperarDocumentos';
    return this.http.post<any>(direccion, datos, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token).set('idaplicacion', rutasSWPublicaciones.idAppArchivo)
        .set('jwtsecret', rutasSWPublicaciones.claveArchivo).set('activo', 'true')
    });
  }

  bodyMensaje(op: number) {
    if (op == 1)
      return "<!doctype html> <html lang='en' class='no-js'> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'> <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'> </head> <body> <table style='border: 1px solid rgb(223, 217, 195); width: 100%;' cellspacing='0'> <tbody> <tr style='background: rgb(245, 243, 229) none repeat scroll 0% 0%; padding: 10px;'> <td style='padding: 10px'> <div style='border-right: 2px solid #459e00; float: left; height: 130px; width: 125px;'> <img src='cid:image' width='120' height='120'> </div> </td> <td style='width: 85%;'> <div style='color: rgb(69, 158, 0); float: left; font-size: 30px; padding-top: 5px;'> Sistema de Publicaiones - ESPOCH </div> </td> </tr> <tr> <td style='padding: 20px; font-size: 12px;' colspan='2'> Estimad@ <b> ";
    if (op == 2)
      return "</b> <br/><br/><br/> Su documentaci&oacute;n ";
    if (op == 3)
      return " ha sido recibida, un analista la validar&aacute; y ser&aacute; notidicado a su correo <br/><br/> <br/><br/><br/> Tambi&eacute;n puede ingresar al <a href='https://publicaciones.espoch.edu.ec/'> sistema de Publicaciones de la ESPOCH </a> haciendo uso de su cuenta y clave de correo institucional, para consultar susolicitud. <center> <br/><br/><br/><br/> <b>DECANATO DE PUBLICACIONES - ESPOCH</b> <br/> <b>Panamericana Sur Km. 1 1/2</b> <br/> <b>TELF: 593(03) 2998-200 ext. 1053</b> <br/><br/> </center> </td> </tr> <tr> <td style='background: #f5f3e5;' colspan='2'> <div style='font-weight: bold; text-align: center; font-size: 10px;'> <a href='http://dtic.espoch.edu.ec/' target='_blank'>DIRECCI&Oacute;N DE TECNOLOG&Iacute;AS DE INFORMACI&Oacute;N Y COMUNICACI&Oacute;N</a> <br>&copy; ESPOCH 2019 </br> <img src='cid:logo' width='65' alt='DIRECCI&Oacute;N DE TECNOLOG&Iacute;AS DE INFORMACI&Oacute;N Y  COMUNICACI&Oacute;N' /> </div> </td> </tr> </tbody> </table> </body> </html>";
    else
      return "";
  }

}
