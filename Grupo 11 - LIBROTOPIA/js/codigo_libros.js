
// Obtener la cadena de consulta de la URL
const urlParametros = new URLSearchParams(window.location.search);

// Obtener los géneros seleccionados de los parámetros de consulta y la
// divide en un arreglo utilizando la coma como separador
let generosSeleccionados = urlParametros.get("generos").split(",");

// Indices para mover la cinta de portada de cada género.
const generosIndices = {};


generosSeleccionados.forEach(genero => {
  // Crear la URL de la API basada en el género actual
  const apiUrl = `https://openlibrary.org/subjects/${genero}.json?limit=10`;

  // Arreglo para almacenar los libros del género actual
  const librosGenero = [];

  // Realizar la consulta a la API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.works.forEach(book => {
        const titulo = book.title;
        const autor = book.authors[0]?.name || 'Desconocido';
        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;

        // Agregar el libro al arreglo del género actual
        librosGenero.push({ titulo, autor, coverUrl });
      });
      // Añadir los libros al div del género correspondiente
      mostrarLibrosEnSeccion(librosGenero, genero);
    })
    .catch(error => console.error(error));
});


function mostrarLibrosEnSeccion(libros, genero) {
  // Identificar la sección correspondiente en el HTML basada en el género
  const seccion = document.getElementById(`divGenero${genero}`);
  // Coloca visible el div correspondiente
  seccion.style.display = 'block';

  // Obtén el contenedor de libros dentro de la sección
  const contenedorLibros = seccion.querySelector('.libros');
  const contenedortarjetas = seccion.querySelector('.tarjetas'); //nuevo
  // Limpia el contenido
  contenedorLibros.innerHTML = '';
  contenedortarjetas.innerHTML = ''; //nuevo

   // Crea un enlace para la página de detalles del libro
  libros.forEach(libro => {
    const enlaceDetalle = document.createElement('a');
    enlaceDetalle.href = `seleccion_libro.html?titulo=${encodeURIComponent(libro.titulo)}&autor=${encodeURIComponent(libro.autor)}&genero=${encodeURIComponent(genero)}&portada=${encodeURIComponent(libro.coverUrl)}`;

    // Crea la imagen del libro
    const imagen = document.createElement('img');
    imagen.src = libro.coverUrl;
    imagen.alt = `Portada de libro: ${libro.titulo}`;
    
    // Crea la tarjeta con la información del título y el autor
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.style.display = 'none';  //Inicialmente oculta nuevo

    const infoLibro = document.createElement('h5');
    infoLibro.textContent = `Título: ${libro.titulo}. Autor: ${libro.autor}. Género: ${genero}`;

    tarjeta.appendChild(infoLibro);

    // Agrega el evento mouseover para mostrar la tarjeta
    imagen.addEventListener('mouseover', () => {
      tarjeta.style.display = 'block';
    });

    // Agrega el evento mouseout para ocultar la tarjeta
    imagen.addEventListener('mouseout', () => {
      tarjeta.style.display = 'none';
    });

    // Agrega la imagen y la tarjeta al contenedor de libros
    contenedorLibros.appendChild(imagen);
    /* contenedorLibros.appendChild(tarjeta); */
    contenedortarjetas.appendChild(tarjeta);
    // Agrega la imagen al enlace de detalles
    enlaceDetalle.appendChild(imagen);
    contenedorLibros.appendChild(enlaceDetalle);
  });

  //Inicializar los índices para mover la cinta de libros en cada género
  generosIndices[`${genero}`] = {
    indiceActual: 0,
    indiceMaximo: libros.length, 
  };
}


// *******************************mover con los botones de flecha los libros de cada género*******************
document.addEventListener('click', function (event) {
  const button = event.target.closest('button');

  if (button.id === 'btnSiguiente' || button.id === 'btnAnterior') {
    // divGenero desde donde se realizó el clic
    const divGenero = event.target.closest('div[id*="divGenero"]');
    // nombre del género
    const genero = divGenero.id.slice(9); // divGenero tiene 9 caracteres
    if (button.id === 'btnAnterior'){
      mostrarLibrosAnteriores(divGenero, genero)
    } else{
      mostrarLibrosSiguientes(divGenero, genero)
    }
  }
});

function mostrarLibrosAnteriores(divGenero, genero) {
  console.log("Anterior, índice:", generosIndices[genero].indiceActual);
  if (generosIndices[genero].indiceActual > 0) {
    generosIndices[genero].indiceActual--;
    console.log(generosIndices[genero].indiceActual);
    actualizarPosicion(divGenero, genero);
  }
}

function mostrarLibrosSiguientes(divGenero, genero) {
  console.log("Siguiente, índice:", generosIndices[genero].indiceActual);
  // como cada libro tiene un acho de 10vw entonces caben como 7 en la pantalla
  if (generosIndices[genero].indiceActual < generosIndices[genero].indiceMaximo - 7) { 
    generosIndices[genero].indiceActual++;
    console.log(generosIndices[genero].indiceActual);
    actualizarPosicion(divGenero, genero);
  }
}

function actualizarPosicion(divGenero, genero) {
  const translateX = -generosIndices[genero].indiceActual * 12; // el ancho de la portada esta en 10vw y el maren en 1vw
  const libros = divGenero.querySelector('.libros');
  libros.style.transform = `translateX(${translateX}vw)`;
}

