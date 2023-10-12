//***************************Cambiar entre datos personales y Preferencias de lectura**************************************
//con un solo botón
const botonCambiarSeccion = document.getElementById("cambiarSeccion");
const DatosPersonales = document.getElementById("datosPersonales");
const PreferenciasLectura = document.getElementById("preferenciasLectura");

botonCambiarSeccion.addEventListener("click", function () {
  if (DatosPersonales.style.display === "block") {
    // Si los datos personales están visibles, oculta ese div y muestra el de preferencias de lectura
    DatosPersonales.style.display = "none";
    PreferenciasLectura.style.display = "block";
    botonCambiarSeccion.textContent = "Volver a Datos Personales";
  } else {
    // Si las preferencias de lectura están visibles, oculta ese div y muestra el de datos personales
    PreferenciasLectura.style.display = "none";
    DatosPersonales.style.display = "block";
    botonCambiarSeccion.textContent = "Cambiar a Preferencias de Lectura";
  }
});
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

//***************************Capturar Generos selecionados en Perfil del Usuario**************************************

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

  // Redirigir a la página "libros.html" con los parámetros de consulta
  window.location.href = url;
});