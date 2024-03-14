import { environment } from "../recursos/environment.publicaciones";
export let CONFIG = {
  Settings: {
    CASLOGIN: environment.CASLOGIN,
    CASLOGOUT: environment.CASLOGOUT,
    CASVALIDATE: environment.CASVALIDATE,
    REDIRECT_URI: environment.REDIRECT_URI,
    LOGOUT_REDIRECT: environment.LOGOUT_REDIRECT,
    LOGOUT_CORREO: environment.LOGOUT_CORREO,
    VALIDATEJAVA: environment.VALIDATEJAVA,
  },
};
