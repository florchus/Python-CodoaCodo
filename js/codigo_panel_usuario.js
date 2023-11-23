//***************************Cargar información desde la base de datos**************************************

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el parámetro 'email' de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const correoId = urlParams.get('email');
  const AdministrarUsuarios = document.getElementById("AdministrarUsuarios");

  const url = 'http://127.0.0.1:5000/obtener_cliente?email=' + correoId;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('nombre').value = data.Nombre !== undefined ? data.Nombre : '';
      document.getElementById('apellido').value = data.Apellido !== undefined ? data.Apellido : '';
      document.getElementById('DNI').value = data.DNI !== undefined ? data.DNI : '';
      document.getElementById('direccion').value = data.Direccion !== undefined ? data.Direccion : '';
      /* document.getElementById('telefono').value = data.Telefono; */
      document.getElementById('fechana').value = data.FechaDeNacimiento !== undefined ? data.FechaDeNacimiento : '';
      document.getElementById('alias').value = data.Alias !== undefined ? data.Alias : '';
      if (data.TipoCuenta == 2){
        AdministrarUsuarios.style.display = "block";
      }
    })
    .catch(error => console.error('Error al obtener los datos del cliente:', error));
});

//*********************************Actualizar datos*******************************************


function actualizarDatos() {
  // Validar datos en el formulario del panel del usuario
  if (!validarFormularioUsuario()) {
    return;
  }

  // Obtener el parámetro 'email' de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const correoId = urlParams.get('email');

  const url = `http://127.0.0.1:5000/actualizar_cliente`;

  const data = {
    email: correoId,
    Nombre: document.getElementById('nombre').value,
    Apellido: document.getElementById('apellido').value,
    DNI: document.getElementById('DNI').value,
    Direccion: document.getElementById('direccion').value,
    FechaDeNacimiento: document.getElementById('fechana').value,
    Alias: document.getElementById('alias').value
  };

  var options = {
    body: JSON.stringify(data),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  }

  fetch(url, options)
    .then(response => response.json())
    .then(function (res) {
      alert(res.mensaje);
    })
    .catch(err => {
      console.error(err);
    });
}



//***************************Cambiar entre datos personales y Preferencias de lectura**************************************

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