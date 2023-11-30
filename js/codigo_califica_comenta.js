// Datos de ejemplo calificaciones
let calificaciones = []; // Este arreglo tendrá la cantidad de votos para cada estrellas

// Recupera el ID del libro en la URL
const urlParams = new URLSearchParams(window.location.search);
const id_libro = urlParams.get('IDLibro');
//Obtener calificaciones del libro, actualizar el promedio y las barras
obtener_calificaciones(id_libro);

//Calificar el libro
const calificar = document.getElementById("calificar");
let calificado = false;

calificar.addEventListener("click", function () {
  // rating se define en codigo_rating.js y tienes el número de estrellas con que se calificó al libro
  if (rating !== 0) {
    calificaciones[rating - 1]++;
    actualizar_datos();
    calificar.disabled = true;
    calificado = true;
    guardarCalificaciones(id_libro);
  };
});


function obtener_calificaciones(id_libro) {
  const url = `https://librotopia.pythonanywhere.com/calificaciones/${id_libro}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
        calificaciones = [
          data.Estrella1,
          data.Estrella2,
          data.Estrella3,
          data.Estrella4,
          data.Estrella5
        ];
        //Actualizar el promedio y las barras  
        actualizar_datos()
      })
      .catch(err => {
          console.error(err);
      });
}

function guardarCalificaciones(id_libro) {
  const url = `https://librotopia.pythonanywhere.com/guardar_calificaciones`;

  const data = {
    IDLibro: id_libro,
    Estrella1: calificaciones[0],
    Estrella2: calificaciones[1],
    Estrella3: calificaciones[2],
    Estrella4: calificaciones[3],
    Estrella5: calificaciones[4]
  };

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  };

  fetch(url, options)
      .then(response => response.json())
      .then(function (res) {
        alert(res.mensaje)
      })
      .catch(error => {
          console.error('Error al guardar calificaciones:', error);
      });
}

function actualizar_datos() {
  // Calcula el promedio
  const totalVotos = calificaciones.reduce((acc, votos, estrellas) => acc + votos * (estrellas + 1), 0);
  const totalPersonas = calificaciones.reduce((acc, votos) => acc + votos, 0);
  const promedio = totalPersonas !== 0 ? totalVotos / totalPersonas : 0;

  // Actualiza las barras de visualización y el promedio
  for (let i = 1; i <= 5; i++) {
    const votosEstrellas = document.getElementById(`votos-${i}`);
    const barra = document.getElementById(`barra-${i}`);
    const porcentaje = (calificaciones[i - 1] / totalPersonas) * 100;
    votosEstrellas.textContent = `${calificaciones[i - 1]}`;
    barra.style.width = `${porcentaje}%`;
  }

  const promedioValor = document.getElementById("promedio-valor");
  const totalvotos = document.getElementById("total_votos");
  promedioValor.textContent = promedio.toFixed(1);
  totalvotos.textContent = `${totalPersonas} votos`;
}

// *********************************************Comentarios**********************************************
// arreglo de objetos con los comentarios
let comentarios = [];

function obtener_comentarios(id_libro) {
  const url = `https://librotopia.pythonanywhere.com/comentarios/${id_libro}`;
  fetch(url)
      .then(response => response.json())
      .then(data => {
        // pasa la data a los comentarios
        comentarios = data;
        // Función para generar en el HTML de los comentarios
        generarComentarios();
      })
      .catch(err => {
          console.error(err);
      });
}
       

obtener_comentarios(id_libro);

// Función para generar en el HTML de los comentarios
function generarComentarios() {
  const listaComentarios = document.getElementById("lista-comentarios");
  listaComentarios.innerHTML = "";  // elimina el contenido actual de la lista

  comentarios.forEach((comentario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${comentario.FechaComentario}</td>
      <td>${comentario.Email}</td>
      <td>${comentario.Comentario}</td>
    `;

    listaComentarios.appendChild(tr);
  });
}

function agregarComentario() {
  const nuevoComentario = document.getElementById("nuevo-comentario").value;

  if (nuevoComentario.trim() !== "") {
    // Crear un nuevo objeto de comentario
    const nuevoComentarioObj = {
      FechaComentario: obtenerFechaActual(),
      Email: "Nuevo Usuario",
      Comentario: nuevoComentario,
    };

    // Agregar el nuevo comentario al principio de la lista
    comentarios.unshift(nuevoComentarioObj);

    // Limpiar el área de comentario
    document.getElementById("nuevo-comentario").value = "";

    // Volver a generar la lista de comentarios
    generarComentarios();
  }
  // Llamar a actualizarContador después de agregar un comentario
  actualizarContador();
}

function obtenerFechaActual() {
  const fecha = new Date();
  return `${formatoDosDigitos(fecha.getDate())}/${formatoDosDigitos(fecha.getMonth() + 1)}/${fecha.getFullYear()}`;
}

function formatoDosDigitos(numero) {
  return numero < 10 ? `0${numero}` : numero;
}

function actualizarContador() {
  const nuevoComentario = document.getElementById("nuevo-comentario");
  const contadorCaracteres = document.getElementById("contador-caracteres");
  const maxCaracteres = 500;

  let caracteresRestantes = maxCaracteres - nuevoComentario.value.length;
  // Ajustar el límite para permitir la escritura negativa, pero seguir mostrando el contador
  if (caracteresRestantes < 0) {
    caracteresRestantes = 0;
    nuevoComentario.value = nuevoComentario.value.slice(0, maxCaracteres); // Limitar la longitud del texto
  }
  contadorCaracteres.textContent = `${caracteresRestantes} caracteres restantes`;

  contadorCaracteres.style.color = caracteresRestantes == 0 ? "red" : "";
}


// ============================================= rating ====================================================
const stars = document.querySelectorAll('.rating > span');
const ratingValue = document.getElementById('ratingValue');
let rating = 0;

stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    // Solo actualiza las estrellas si no ha votado
    if (!calificado) {
      rating = index + 1;
      updateRating();
    }
  }
  );

  /* a cada estrella le cambia la clase selected a medida que se pasa el mouse sobre ellas */

  star.addEventListener('mouseover', () => {
    // Solo actualiza las estrellas si no ha votado
    if (!calificado) {
      stars.forEach((s, i) => {
        if (i <= index) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    }
  });
  /* este evento reestablece al estado original */
  star.addEventListener('mouseout', () => {
    // Solo actualiza las estrellas si no ha votado
    if (!calificado) {
      stars.forEach((s, i) => {
        s.classList.remove('selected');
      });
      updateRating();
    }
  });
});

function updateRating() {
  // Solo actualiza las estrellas si no ha votado
  if (!calificado) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
    ratingValue.textContent = rating;
  }
};