//**************************************Alternar Modo Día - Modo Noche****************************************
const modoDN = document.getElementById('modoDiaNoche');

// Función para cambiar Nodo Día Noche
function cambiarDiaNoche() {
  const html = document.documentElement;
    // Alternar la clase 'modoNoche' en el archivo HTML donde se presionó el botón
    html.classList.toggle('modoNoche');
  
    // Obtener el nombre del archivo .html desde donde se ejecuta del botón dianoche
    const rutaActual = window.location.pathname;
    const nombreArchivo = rutaActual.substring(rutaActual.lastIndexOf('/') + 1);
  
    // ruta del los iconos desde index.html
    let iconoDia = 'css/iconos/dia.png';
    let iconoNoche = 'css/iconos/noche.png';
  
    // si la págino no es index.html se agrega ../ a la ruta del los iconos
    if (nombreArchivo !== 'index.html') {
      iconoNoche = `../${iconoNoche}`;
      iconoDia = `../${iconoDia}`;
    }
    // Alterna la imagen en el botón con cada click y guarda en el localStorage el estado actual luego del cambio
    if (modoDN.style.backgroundImage === `url("${iconoNoche}")`) {
      modoDN.style.backgroundImage = `url("${iconoDia}")`;
      localStorage.setItem('modo', "modoDia");
    } else {
      modoDN.style.backgroundImage = `url("${iconoNoche}")`;
      localStorage.setItem('modo', "modoNoche");
    }
};

// Verificar si hay una preferencia almacenada en localStorage
const modoAlmacenado = localStorage.getItem('modo');
// Si al cargar una nuega pagina, la preferencia almacenada es modoNoche, cambia a ese modo la página
if (modoAlmacenado == "modoNoche") {
   cambiarDiaNoche();
}
// Cambia Modo Día Noche a través del botón
modoDN.addEventListener('click', function () {
  cambiarDiaNoche();
});

//**************************************Validad claves iguales en el registro****************************************
function validarClavesRegistro() {
  // Obtener los valores ingresados por el usuario
  var clave1 = document.getElementById("password1");
  var clave2 = document.getElementById("password2");

  if (clave1.value !== clave2.value) {
    alert("Las contraseñas introducidas no son iguales");
    clave1.value = "";
    clave2.value = "";
    return false
  }
  return true
}

//***************************Validad datos en el formulario del panel del usuario**************************************
function validarFormularioUsuario() {
  // Obtener los valores ingresados por el usuario
  var nombre = document.getElementById("nombre").value.trim()
  var apellido = document.getElementById("apellido").value.trim()
  var dni = document.getElementById("DNI").value.trim()
  var direccion = document.getElementById("direccion").value.trim()


  // Creo que esto no es necesario si se coloca el atributo required> en el input
  // Verificar si algún campo está en blanco
  /*     if(nombre==="" || dni==="" || direccion===""){
        alert("Debe completar todos los campos del formulario.")
        return false
      } */

  // Verificar si el nombre, apellido y dirección contienen solo caracteres permitidos. 

  var nombreTest = /^[a-zA-Z\s]+$/.test(nombre) //también se permite espacio en blanco
  var apellidoTest = /^[a-zA-Z\s]+$/.test(apellido) //también se permite espacio en blanco
  var direccionTest = /^[a-zA-Z0-9\s\-,'./\\]+$/.test(direccion) //también se permite espacios en blanco , . - / \ 

  // nombreTest===false
  if (!direccionTest) {
    alert("Debe completar la dirección solo con las letras del abecedario y los caracteres , . - / \ ")
    return false
  }
  if (!nombreTest || !apellidoTest) {
    alert("Debe completar nombre y apellido solo con las letras del abecedario.")
    return false
  }

  // Verificar dni no es un número
  // dni ="12345678"
  if (isNaN(dni)) {
    alert("Debe completar dni sólo con números.")
    return false
  }

  // Verificar si el DNI contiene solo 8 dígitos numéricos
  if (dni.length !== 8) {
    alert("Debe completar el DNI con 8 dígitos.")
    return false
  }

  // Si todas las validaciones son exitosas, enviar el formulario
  alert("Se enviaron los datos correctamnte.")
  return true
}

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
  //Prueba
  console.log("Géneros seleccionados:", generosSeleccionados);
});