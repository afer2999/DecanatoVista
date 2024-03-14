var modInicio = document.getElementById('modalInicio');

window.onload = function () {
    setTimeout("modInicio.style.display = 'block';", 2500);
}
function cierraModal() {
    modInicio.style.display = "none";
}