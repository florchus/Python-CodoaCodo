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

//***************************Guardar en el localstorage la busqueda al entrar ModoInvitado*************************************
// "Botón" Modo Invitado

document.addEventListener("DOMContentLoaded", () => {
  const enlace = document.getElementById("modoInvitado");
  enlace.addEventListener('click', function(event) {
    localStorage.setItem('url', 'libros.html?generos=aventure,mistery,nature,love');
  });
});