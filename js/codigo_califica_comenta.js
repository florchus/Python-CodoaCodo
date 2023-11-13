// Datos de ejemplo calificaciones
const calificaciones = [5, 8, 12, 15, 20]; // Cantidad de votos para 1, 2, 3, 4 y 5 estrellas, respectivamente

//Actualizar el promedio y las barras
actualizar_datos();

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
  };
});


function actualizar_datos() {
  // Calcula el promedio
  const totalVotos = calificaciones.reduce((acc, votos, estrellas) => acc + votos * (estrellas + 1), 0);
  const totalPersonas = calificaciones.reduce((acc, votos) => acc + votos, 0);
  const promedio = totalVotos / totalPersonas;

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
// arreglo de objetos con los comentarios de ejemplo
const comentarios = [
  {
    fecha: "01/11/2023",
    usuario: "Usuario1",
    comentario: "Este es un comentario de Usuario1.",
  },
  {
    fecha: "02/11/2023",
    usuario: "Usuario2",
    comentario: "Este es un comentario de Usuario2.",
  },
  {
    fecha: "03/11/2023",
    usuario: "Usuario1",
    comentario: "Este es otro comentario de Usuario1 pero mucho más largo para ver como se comporta la tabla.",
  },
  {
    fecha: "04/11/2023",
    usuario: "Usuario3",
    comentario: "Este es un comentario de Usuario3.",
  },
];

// Llama a la función para generar los comentarios al cargar la página
generarComentarios();

// Función para generar en el HTML de los comentarios
function generarComentarios() {
  const listaComentarios = document.getElementById("lista-comentarios");
  listaComentarios.innerHTML = "";  // elimina el contenido actual de la lista

  comentarios.forEach((comentario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${comentario.fecha}</td>
      <td>${comentario.usuario}</td>
      <td>${comentario.comentario}</td>
    `;

    listaComentarios.appendChild(tr);
  });
}

function agregarComentario() {
  const nuevoComentario = document.getElementById("nuevo-comentario").value;

  if (nuevoComentario.trim() !== "") {
    // Crear un nuevo objeto de comentario
    const nuevoComentarioObj = {
      fecha: obtenerFechaActual(),
      usuario: "Nuevo Usuario",
      comentario: nuevoComentario,
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