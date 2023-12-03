//***************************Cargar información desde la base de datos**************************************
let correoId // correo del cliente actual
let origen  // html de donde se llama a panel_usuario

document.addEventListener("DOMContentLoaded", function () {
  // se recupera el correo del usuario y la página de donde es invocada panel_usuario
  correoId = localStorage.getItem('email');
  origen = localStorage.getItem('origen');

  const AdministrarUsuarios = document.getElementById("AdministrarUsuarios");

  const url = 'https://librotopia.pythonanywhere.com/obtener_cliente?email=' + correoId;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      /* localStorage.setItem('clienteData', JSON.stringify(data)); */

      document.getElementById('nombre').value = data.Nombre !== undefined ? data.Nombre : '';
      document.getElementById('apellido').value = data.Apellido !== undefined ? data.Apellido : '';
      document.getElementById('DNI').value = data.DNI !== undefined ? data.DNI : '';
      document.getElementById('direccion').value = data.Direccion !== undefined ? data.Direccion : '';
      /* document.getElementById('telefono').value = data.Telefono; */
      document.getElementById('fechana').value = data.FechaDeNacimiento !== undefined ? data.FechaDeNacimiento : '';
      document.getElementById('alias').value = data.Alias !== undefined ? data.Alias : '';
      document.getElementById('tipoCuentaData').value = data.TipoCuenta ;
      if(origen == "editar") {
        document.getElementById("tipoCuenta").style.display = "block"; 
      } else {
        document.getElementById("tipoCuenta").style.display = "none"; 
      }
      if (data.TipoCuenta == 2){
        AdministrarUsuarios.style.display = "block";
      }
      // datos guardados sobre el clientedata

    })
    .catch(error => console.error('Error al obtener los datos del cliente:', error));
});

//*********************************Actualizar datos*******************************************


function actualizarDatos() {
  // Validar datos en el formulario del panel del usuario
  if (!validarFormularioUsuario()) {
    return;
  }

  const url = `https://librotopia.pythonanywhere.com/actualizar_cliente`;

  const data = {
    email: correoId,
    Nombre: document.getElementById('nombre').value,
    Apellido: document.getElementById('apellido').value,
    DNI: document.getElementById('DNI').value,
    Direccion: document.getElementById('direccion').value,
    FechaDeNacimiento: document.getElementById('fechana').value,
    Alias: document.getElementById('alias').value,
    TipoCuenta: document.getElementById('tipoCuentaData').value
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

    if (origen === 'editar') {
        window.location.href = "panel_administrador2.html";
    }
  }



//***************************Cambiar entre datos personales y Preferencias de lectura**************************************

/* const botonCambiarSeccion = document.getElementById("cambiarSeccion"); */
const DatosPersonales = document.getElementById("datosPersonales");
const PreferenciasLectura = document.getElementById("preferenciasLectura");
const Favoritos = document.getElementById("Favoritos");

//con tres botones
const botonDatosPersonales = document.getElementById("BotonDatosPersonales");
const botonPreferenciasLectura = document.getElementById("BotonPreferenciasLectura");
const botonFavoritos = document.getElementById("BotonFavoritos");

botonDatosPersonales.addEventListener("click", function () {
  // Mostrar datos personales y ocultar de preferencias de lectura y se agrega el boton favoritos
  DatosPersonales.style.display = "block";
  PreferenciasLectura.style.display = "none";
  Favoritos.style.display = "none";
  botonPreferenciasLectura.disabled = false;
  botonDatosPersonales.disabled = true;
  botonFavoritos.disabled = false;
});

botonPreferenciasLectura.addEventListener("click", function () {
  // Mostrar preferencias de lectura y ocultar datos personales
  PreferenciasLectura.style.display = "block";
  DatosPersonales.style.display = "none";
  Favoritos.style.display = "none";
  botonPreferenciasLectura.disabled = true;
  botonDatosPersonales.disabled = false;
  botonFavoritos.disabled = false;

  botonFavoritos.addEventListener("click", function() {
    Favoritos.style.display = "block";
    DatosPersonales.style.display = "none";
    PreferenciasLectura.style.display = "none";
    botonPreferenciasLectura.disabled = false;
    botonDatosPersonales.disabled = false;
    botonFavoritos.disabled= true;
  })
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

//**************************************Mostrar Favoritos****************************************
const listaFav = []; //lista para almacenar los datos de los libros

function MostrarFavoritos() {

  //me traigo un listado de los favoritos que tiene esa cuenta
  const email = localStorage.getItem('email');
  const url = `https://librotopia.pythonanywhere.com/favoritos/${email}`;

  fetch(url)
  .then(response => {
    return response.json(); //aca me devuelve la rta en formato json
  })
  .then(data => {
    const cantFavoritos = [];
    data.forEach(element => {
      const IDLibro = element.IDLibro;
      cantFavoritos.push({IDLibro});
    });
    console.log(cantFavoritos)
    //tengo que pasar ese listado para que me filtre los favoritos
    
    //para cada uno de los IDlibros en el array cantFavoritos, saco los datos de los libros con la API
    //librosporID
    cantFavoritos.forEach(element => {
      const IDLibro = element.IDLibro;
      const urlFav = `https://librotopia.pythonanywhere.com/librosporID/${IDLibro}`;
  
      fetch(urlFav)
      .then(response =>{
        return response.json();
      })
      .then(data => {
        //agrego los datos del libro a la listaFav
        data.forEach(element =>{
          const Titulo = element.Titulo;
          const Autor = element.Autor;
          const Portada = element.Portada;
          listaFav.push({IDLibro,Titulo,Autor,Portada});
          
        })
      });     
    });
  });
  console.log(listaFav);
  //error: tengo que apretar dos veces en favoritos, y ademas cada vez que apreto favorito como que no me borra lo anterior

listaFav.forEach(function(libro) {
  let contenedor = document.getElementById('Favoritos');
  let tabla = document.createElement('table');
  tabla.className = 'tabla-fav';

  // Crear la cabecera de la tabla
  let cabecera = tabla.createTHead();
  let filaCabecera = cabecera.insertRow();
  let celdaTitulo = filaCabecera.insertCell(0);
  let celdaAutor = filaCabecera.insertCell(1);
  let celdaPortada = filaCabecera.insertCell(2);
  let celdaEliminar = filaCabecera.insertCell(3);

  celdaTitulo.innerHTML = '<b>Título</b>';
  celdaAutor.innerHTML = '<b>Autor</b>';
  celdaPortada.innerHTML = '<b>Portada</b>';
  celdaEliminar.innerHTML = '<b>Acción</b>'

  // Agregar la tabla al contenedor
  contenedor.appendChild(tabla);

  // Llenar la tabla con los datos de listaFav
  listaFav.forEach(function(libro) {
    let nuevaFila = tabla.insertRow();
    
    // Insertar celdas con la información del libro
    nuevaFila.insertCell(0).textContent = libro.Titulo;
    nuevaFila.insertCell(1).textContent = libro.Autor;

    // Crear una celda para la imagen de la portada
    let celdaPortada = nuevaFila.insertCell(2);
    let imagenPortada = document.createElement('img');
    imagenPortada.src = libro.Portada;
    imagenPortada.alt = 'Portada del libro';
    celdaPortada.appendChild(imagenPortada);

    // Crear una celda para el botón Eliminar
    let celdaEliminar = nuevaFila.insertCell(3);
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = function() {
      eliminarFavorito(libro.IDLibro);
    };
    celdaEliminar.appendChild(botonEliminar);
  });

});
}
//**************************************Eliminar Favorito****************************************
function eliminarFavorito(IDLibro){
   console.log(IDLibro);
   const email = localStorage.getItem('email');
   const url = `https://librotopia.pythonanywhere.com//borrarFavorito/${IDLibro}/${email}`;

   fetch(url, {
     method: 'DELETE'
   })
   .then(response => response.json())
   .then(data => {
     alert(data.respuesta);
     location.reload();

     const elementoEliminar = document.getElementById(IDLibro);
     if(elementoEliminar){
       elementoEliminar.remove();
     }
   })
 }

//**************************************Cerrar Sesión****************************************
function cerrarSesion() {
  // Eliminar la información de la sesión al cerrar sesión
  localStorage.removeItem('email');
  alert('Sesión cerrada exitosamente.');
  // Redirigir al home u otra página de inicio
  window.location.href = "../index.html";
}