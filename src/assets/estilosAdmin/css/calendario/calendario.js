var selectFecha; localStorage.setItem("mensaje", "");
function mostrarCalendario() {
    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    lasemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    diassemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    hoy = new Date(); //objeto fecha actual
    diasemhoy = hoy.getDay(); //dia semana actual
    diahoy = hoy.getDate(); //dia mes actual
    meshoy = hoy.getMonth(); //mes actual
    annohoy = hoy.getFullYear(); //año actual

    // Elementos del DOM: en cabecera de calendario 
    tit = document.getElementById("titulos"); //cabecera del calendario
    ant = document.getElementById("anterior"); //mes anterior 
    pos = document.getElementById("posterior"); //mes posterior
    // Elementos del DOM en primera fila
    f0 = document.getElementById("fila0");
    //Pie de calendario
    pie = document.getElementById("fechaactual");
    pie.innerHTML = "Fecha: " + lasemana[diasemhoy] + ", " + diahoy + " de " + meses[meshoy] + " de " + annohoy;
    selectFecha = annohoy + "-" + (meshoy + 1) + "-" + diahoy;
    localStorage.setItem("fechaReserva", selectFecha);
    localStorage.setItem("fechaHoy", annohoy + ":" + (meshoy + 1) + ":" + diahoy);
    //formulario: datos iniciales:
    //document.buscar.buscaanno.value=annohoy;
    // Definir elementos iniciales:
    mescal = meshoy; //mes principal
    annocal = annohoy //año principal
    //iniciar calendario:
    cabecera()
    primeralinea()
    escribirdias()
}
//FUNCIONES de creación del calendario:
//cabecera del calendario
function cabecera() {
    tit.innerHTML = meses[mescal] + " de " + annocal;
    mesant = mescal - 1; //mes anterior
    mespos = mescal + 1; //mes posterior
    if (mesant < 0) { mesant = 11; }
    if (mespos > 11) { mespos = 0; }
    ant.innerHTML = meses[mesant]
    pos.innerHTML = meses[mespos]
}
//primera línea de tabla: días de la semana.
function primeralinea() {
    for (i = 0; i < 7; i++) {
        celda0 = f0.getElementsByTagName("th")[i];
        celda0.innerHTML = diassemana[i]
    }
}
//rellenar celdas con los días
function escribirdias() {
    //Buscar dia de la semana del dia 1 del mes:
    primeromes = new Date(annocal, mescal, "1") //buscar primer día del mes
    prsem = primeromes.getDay() //buscar día de la semana del día 1
    prsem--; //adaptar al calendario español (empezar por lunes)
    if (prsem == -1) { prsem = 6; }
    //buscar fecha para primera celda:
    diaprmes = primeromes.getDate()
    prcelda = diaprmes - prsem; //restar días que sobran de la semana
    empezar = primeromes.setDate(prcelda) //empezar= tiempo UNIX 1ª celda
    diames = new Date() //convertir en fecha
    diames.setTime(empezar); //diames=fecha primera celda.
    //Recorrer las celdas para escribir el día:
    for (i = 1; i < 7; i++) { //localizar fila
        fila = document.getElementById("fila" + i);
        for (j = 0; j < 7; j++) {
            midia = diames.getDate()
            mimes = diames.getMonth()
            mianno = diames.getFullYear()

            celda = fila.getElementsByTagName("td")[j];
            celda.innerHTML = midia;
            //Recuperar estado inicial al cambiar de mes:
            celda.style.backgroundColor = "#DBDBDB";
            celda.style.color = "#000";

            // sabados y domingos en rojo
            if (j == 6 || j == 5) {
                celda.style.color = "#f11445";
            }
            //dias restantes del mes en gris
            if (mimes != mescal) {
                celda.style.color = "#A3A3A3";
                celda.style.backgroundColor = "#ECECEC";
            }
            //destacar la fecha actual
            if (mimes == meshoy && midia == diahoy && mianno == annohoy) {
                celda.style.backgroundColor = "#6FBC85";
                celda.innerHTML = "<cite title='Fecha Actual'>" + midia + "</cite>";
            }
            //pasar al siguiente día
            midia = midia + 1;
            diames.setDate(midia);
        }
    }
}
