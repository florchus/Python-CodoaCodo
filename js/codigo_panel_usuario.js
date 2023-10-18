//***************************Cambiar entre datos personales y Preferencias de lectura**************************************
//con un solo botón
/* const botonCambiarSeccion = document.getElementById("cambiarSeccion"); */
const DatosPersonales = document.getElementById("datosPersonales");
const PreferenciasLectura = document.getElementById("preferenciasLectura");

//con dos botones
const botonDatosPersonales = document.getElementById("BotonDatosPersonales");
const botonPreferenciasLectura = document.getElementById("BotonPreferenciasLectura");

botonDatosPersonales.addEventListener("click", function () {
  // Mostrar datos personales y ocultar de preferencias de lectura
  DatosPersonales.style.display = "block";
  PreferenciasLectura.style.display = "none";
  botonPreferenciasLectura.disabled = false;
  botonDatosPersonales.disabled = true;
});

botonPreferenciasLectura.addEventListener("click", function () {
  // Mostrar preferencias de lectura y ocultar datos personales
  PreferenciasLectura.style.display = "block";
  DatosPersonales.style.display = "none";
  botonPreferenciasLectura.disabled = true;
  botonDatosPersonales.disabled = false;
});

//***************************Capturar Géneros selecionados en Perfil del Usuario**************************************

const generosForm = document.getElementById("generosForm");

generosForm.addEventListener("submit", function (event) {
  event.preventDefault(); // evita que se recargue la página

  // Obtener los géneros seleccionados
  const generosSeleccionados = [];
  const generoCheckboxes = document.getElementsByName("libroGenero");

  for (const checkbox of generoCheckboxes) {
    if (checkbox.checked) {
      generosSeleccionados.push(checkbox.value);
    }
  }
  // URL con los parámetros de consulta
  const url = `libros.html?generos=${generosSeleccionados.join(",")}`;
  //Guarda la url de la última selección de géneros
  localStorage.setItem('url', url);
  // Redirigir a la página "libros.html" con los parámetros de consulta
  window.location.href = url;
});