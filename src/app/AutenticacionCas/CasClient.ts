import { Injectable } from '@angular/core';
import { CONFIG } from '../AutenticacionCas/ConfigUrl';
import { HttpService } from './http.service';
//import * as x2js from 'xml2js';
import { Router } from '@angular/router';
const CONFIG2 = CONFIG.Settings;
declare var URL: any;
var redirect = "";
@Injectable()
export class CasClient {
  public cadena: any;
  constructor(private http: HttpService, private router: Router) { }

  public Redirect() {
    redirect = CONFIG2.CASLOGIN + "service=" + encodeURIComponent(CONFIG2.REDIRECT_URI);
    window.open(redirect, '_self');
  }

  public Logout() {
    var Autenticacion = sessionStorage.getItem("clientName");
    var logout = "";
    this.remove();
    if (Autenticacion == "Institucional") {
      logout = CONFIG2.LOGOUT_CORREO + "post_logout_redirect_uri=" + encodeURIComponent(CONFIG2.CASLOGOUT) + "service=" + encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
      window.location.href = logout;
    } else {
      logout = CONFIG2.CASLOGOUT + "service=" + encodeURIComponent(CONFIG2.LOGOUT_REDIRECT);
      window.location.href = logout;
    }

  }

  public verificaLogin(): Promise<any> {
    if (!this.isAuthenticated()) {
      this.Redirect()
    }
    return this.validateLogin()
  }


  public validateLogin() {
    var service = encodeURIComponent(CONFIG2.REDIRECT_URI);
    var ticket = sessionStorage.getItem("ticketUser");
    var urlvalidate = CONFIG2.VALIDATEJAVA + 'service=' + service + '&ticket=' + ticket
    let promise = new Promise((resolve, reject) => {
      this.http.doGetUrlXML(urlvalidate).subscribe((res: any) => { console.log('=====' + res); this.validation(resolve, reject, res) }, err => {
        this.Logout();
      }, () => {
      });
    });
    return promise;
  };

  public validation(resolve: any, reject: any, res: any) {
    let resultado = res;
    sessionStorage.setItem('loginUser', res.split('<cas:user>')[1].split('</cas:user>')[0]);
    window.location.href = CONFIG2.REDIRECT_URI;
    resolve()

  }

  public urlWithoutTicket(url: string): string {
    return url.replace(/(^|[&?])ticket(=[^&]*)?/, '');
  };

  public uniqueUrl(url: string) {
    var unique_url = url;
    unique_url += (url.indexOf('?') === -1) ? '?' : '&';
    unique_url += '_=' + new Date().getTime();
    return unique_url;
  };


  public isAuthenticated(): boolean {
    var rawIdToken = sessionStorage.getItem("ticketUser");
    return this.isNotEmpty(rawIdToken)
  };


  public remove() {
    window.sessionStorage.removeItem('ticketUser')
    window.sessionStorage.removeItem('loginUser')
    window.sessionStorage.removeItem('clientName')
    window.sessionStorage.removeItem('IdProcesoSeleccionado')
  }

  public isNotEmpty(obj: any): boolean {
    return !this.isEmpty(obj)
  }
  public isEmpty(obj: any): boolean {
    return obj == undefined || obj == null || obj == '' || obj == ' '
  }

  public saveTicket() {
    let ticket = window.location.search.replace('?ticket=', '')
    if (ticket != null) {
      sessionStorage.setItem('ticketUser', ticket)
    }
  }
  public getLogin() {
    return sessionStorage.getItem('loginUser');
  }
  public getPerId() {
    return sessionStorage.getItem('perId');
  }
  public ReadTicket(url: string): String {
    var rawClientInfo: any;
    var intIndex: boolean = url.includes("ticket");
    if (intIndex) {
      this.cadena = url.split("=");
      rawClientInfo = this.cadena[1];
      sessionStorage.setItem('ticketUser', this.cadena[1]);
      return rawClientInfo
    } else {
      return rawClientInfo
    }
  }
  public SalirSistema() {
    this.router.navigateByUrl('');
    sessionStorage.removeItem('token');
  }
}
