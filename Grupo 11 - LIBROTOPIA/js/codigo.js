const modoDN = document.getElementById('modoDiaNoche');
const html = document.documentElement;

modoDN.addEventListener('click', function() {
  // Alternar la clase 'modoNoche' en el elemento raíz HTML
  html.classList.toggle('modoNoche');
  // Alterna la imagen en el botón con cada click
  if (modoDN.style.backgroundImage === 'url("css/iconos/noche.png")') {
    modoDN.style.backgroundImage = 'url("css/iconos/dia.png")';
  } else {
    modoDN.style.backgroundImage = 'url("css/iconos/noche.png")';
  }
});