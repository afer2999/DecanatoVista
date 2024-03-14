var tipo = 0; var color = "na";
var cual = ""; var valor = "";

function pintarMolar(op, hexa, opcion) {
	tipo = op;
	color = hexa;
	valor = opcion;
	asignarLabel(opcion);
}
function pintarSigno(op, hexa, opcion) {
	tipo = op;
	color = hexa;
	cual = "SIGNO";
	valor = opcion;
	asignarLabel1(opcion);
}
function quitarMolar(op, hexa, opcion) {
	tipo = op;
	color = hexa;
	cual = "SIGNO";
	valor = opcion;
	asignarLabel1(opcion);
}

function cambiaColor(pieza, cara) {
	localStorage.setItem('sentencia', '-1');

	if (tipo != 0) {
		if (tipo == 1) {
			verPlaca(cara);
			document.getElementById('molar' + pieza + cara).style.background = color;
			localStorage.setItem('sentencia', cual + "/" + valor + "/" + pieza);
		}
		else if (tipo == 2) {
			document.getElementById('puente' + pieza).className = color;
			localStorage.setItem('sentencia', cual + "/" + valor + "/" + pieza);
		}
		else if (tipo == 3) {
			localStorage.setItem('sentencia', valor + "/" + pieza);
		}
		else {
			document.getElementById('puente' + pieza).className = color;
			document.getElementById('puente' + pieza).innerHTML = tipo;
			localStorage.setItem('sentencia', cual + "/" + valor + "/" + pieza);
		}
	}
}

function verPlaca(num) {
	cual = "";
	if (num == 1)
		cual = "VESTIBULA";
	if (num == 2)
		cual = "MESIAL";
	if (num == 3)
		cual = "LINGUAL";
	if (num == 4)
		cual = "DISTAL";
	if (num == 5)
		cual = "PLACA";
}
function asignarLabel(num) {
	var contenido = "";
	if (num == 1)
		contenido = "Caries";
	if (num == 2)
		contenido = "Resina";
	if (num == 3)
		contenido = "Amalgama";
	if (num == 4)
		contenido = "Curación provisional";
	document.getElementById('lblSelect').innerHTML = contenido;
}
function asignarLabel1(num) {
	var contenido = "";
	if (num == 1)
		contenido = "Con Endodoncia";
	if (num == 2)
		contenido = "Necrosis Pulpar";
	if (num == 3)
		contenido = "Prótesis";
	if (num == 4)
		contenido = "Prótesis Indicada";
	if (num == 5)
		contenido = "Ausente";
	if (num == 6)
		contenido = "Sellante";
	if (num == 7)
		contenido = "Sellante Inicado";
	if (num == 8)
		contenido = "Extracción Indicada";
	if (num == 9)
		contenido = "Extracción Realizada";
	if (num == 10)
		contenido = "Corona";
	if (num == 11)
		contenido = "Eliminar selección";

	document.getElementById('lblSelect').innerHTML = contenido;
}
