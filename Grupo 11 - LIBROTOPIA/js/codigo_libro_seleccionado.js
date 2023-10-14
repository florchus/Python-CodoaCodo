// *******************************Seccion seleccion_libros para traer los parametros al html*******************

function datosLibroSeleccionado() {
    // Recupera los datos del libro desde los parámetros de consulta en la URL y muestra en la página
    const urlParams = new URLSearchParams(window.location.search);
    const titulo = urlParams.get('titulo');
    const autor = urlParams.get('autor');
    const genero = urlParams.get('genero');
    const portada = urlParams.get('portada');
    // Muestra los detalles en la página
    document.getElementById('titulo').textContent = titulo;
    document.getElementById('autor').textContent = autor;
    document.getElementById('genero').textContent = genero;
    document.getElementById('portada').src = portada;
  }

//se llama a la funcion para cargar los datos que voy a utilizar para el libro seleccionado
datosLibroSeleccionado()