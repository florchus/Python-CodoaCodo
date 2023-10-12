// Obtener la cadena de consulta de la URL
const urlParametros = new URLSearchParams(window.location.search);

// Obtener los géneros seleccionados de los parámetros de consulta y la
// divide en un arreglo utilizando la coma como separador
let generosSeleccionados = urlParametros.get("generos").split(",");

generosSeleccionados.forEach(genero => {
  const apiUrl = `https://openlibrary.org/subjects/${genero}.json?limit=10`;
});

const apiUrl = 'https://openlibrary.org/subjects/love.json?limit=10';
let Lista_libros = [];
let librosDerecha = [];
let indiceLibroPrincipal = 0;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    data.works.forEach(book => {
      const titulo = book.title;
      const autor = book.authors[0]?.name || 'Desconocido';
      const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
      Lista_libros.push(coverUrl);
    });

    // Para grupo de tres libros
    inicializarGaleria();

    // Variables para rastrear el índice actual
    let indiceActual = 0;
    const indiceMaximo = Lista_libros.length - 1;
    console.log("indiceMaximo", indiceMaximo);
    // Inicializa la página creando y agregando las imágenes para la lista
    crearYAgregarImagenes();

  })
  .catch(error => console.error(error));



/*======================================== Tres grupos de libros ============================================ */

function inicializarGaleria() {
  const libroIzquierda = document.getElementById('libroIzquierda');
  const libroPrincipal = document.getElementById('libroPrincipal');
  const libroDerecha = document.getElementById('libroDerecha');

  libroIzquierda.src = Lista_libros[indiceLibroPrincipal];
}

function libroSiguiente() {
  console.log("siguiente ", indiceLibroPrincipal);
  if (indiceLibroPrincipal <= Lista_libros.length) {
    indiceLibroPrincipal++;
    libroDerecha.src = libroPrincipal.src;
    libroPrincipal.src = libroIzquierda.src;
    libroIzquierda.src = Lista_libros[indiceLibroPrincipal];
  }
}

function libroAnterior() {
  console.log("Anterior ", indiceLibroPrincipal);
  if (indiceLibroPrincipal > 0) {
    indiceLibroPrincipal--;
    libroIzquierda.src = libroPrincipal.src;
    libroPrincipal.src = libroDerecha.src;
    libroDerecha.src = Lista_libros[indiceLibroPrincipal - 2];
  }
}

/*======================================== Lista de libros ============================================ */

// Obtén referencias a elementos HTML
const contenedorLibros = document.querySelector('.libros');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
// Variables para rastrear el índice actual
let indiceActual = 0;
let indiceMaximo;

// Crea y agrega las imágenes al contenedor
function crearYAgregarImagenes() {
  contenedorLibros.innerHTML = ''; // Limpia el contenido actual
  Lista_libros.forEach((url, indice) => {
    const imagen = document.createElement('img');
    imagen.src = url;
    imagen.alt = `Portada de libro ${indice + 1}`;
    contenedorLibros.appendChild(imagen);
  });
  indiceMaximo = document.querySelectorAll('.libros img').length - 1;
}

// Botones
btnAnterior.addEventListener('click', mostrarLibroAnterior);
btnSiguiente.addEventListener('click', mostrarSiguienteLibro);

// Funciones para mostrar libros anteriores y siguientes
function mostrarLibroAnterior() {
  if (indiceActual > 0) {
    indiceActual--;
    actualizarPosicionLibros();
  }
}

function mostrarSiguienteLibro() {
  if (indiceActual < indiceMaximo -1) {
    indiceActual++;
    actualizarPosicionLibros();
  }
}

// Actualiza la posición de las imágenes en el contenedor
function actualizarPosicionLibros() {
  const trasladarX = -indiceActual * 210; // 210 es el ancho de la portada más el margen derecho
  contenedorLibros.style.transform = `translateX(${trasladarX}px)`;
}


