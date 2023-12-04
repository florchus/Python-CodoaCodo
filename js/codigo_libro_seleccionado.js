// Actualizar el href del "botón" Volver Atrás.
document.addEventListener("DOMContentLoaded", () => {
  // Obtener el elemento <a>
  const link = document.querySelector("#btnVolver");
  // Asigna la url almacenada en el localstorage. Si no hay entoces asigna la url completa.
  const url = localStorage.getItem("url") || "libros.html?generos=1,2,3,4";
  link.setAttribute("href", url);
});

// *******************************Seccion seleccion_libros para traer los parametros al html*******************

function datosLibroSeleccionado() {
    // Recupera los datos del libro desde los parámetros de consulta en la URL y muestra en la página
    const urlParams = new URLSearchParams(window.location.search);
    const IDLibro = urlParams.get('IDLibro');
    const titulo = urlParams.get('titulo');
    const autor = urlParams.get('autor');
    const genero = urlParams.get('genero');
    const portada = urlParams.get('portada');
    // Muestra los detalles en la página
    document.getElementById('titulo').textContent = titulo;
    document.getElementById('autor').textContent = autor;
    document.getElementById('genero').textContent = (genero == 1) ? "Aventura" : (genero == 2) ? "Misterio" : (genero == 3) ? "Naturaleza" : "Romance";
    document.getElementById('portada').src = portada;
  }

  //se llama a la funcion para cargar los datos que voy a utilizar para el libro seleccionado
  datosLibroSeleccionado()

//se llama a metodo para agregar libro a favoritos
function agregarLibro() {
  const urlParams = new URLSearchParams(window.location.search);
  const IDLibro = urlParams.get('IDLibro');
  const email = localStorage.getItem('email');

   //verificamos que no este en modo invitado
  if(email === null){
    alert('Debes registrarte primero');
    window.location.href = 'registro.html';
  }

  const urlVerif = `https://librotopia.pythonanywhere.com/verificarFavorito/${IDLibro}/${email}`;

  fetch(urlVerif)
    .then(response =>{
      return response.json();
    })
    .then(data => {
      if(data.respuesta === 'NO'){
        alert('Ya se encuentra Agregado');
      }
      else {
        const url = `https://librotopia.pythonanywhere.com/agregar_favorito/${IDLibro}/${email}`;
      
        const data = {
          IDLibro: IDLibro,
          email: email
        };
      
        var options = {
          body: JSON.stringify(data),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        };
      
        fetch(url, options)
          .then(response => response.json())
          .then(function (res) {
            alert('Agregado a Favoritos');
          })
          .catch(err => {
            console.error(err);
          });

      }
    })

}