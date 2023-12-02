document.addEventListener("DOMContentLoaded", function () {
    const sesionIniciada = localStorage.getItem('sesionIniciada');
  
    if (!sesionIniciada || sesionIniciada !== 'true') {
      // Si no hay sesión iniciada, redirigir a la página de inicio de sesión
      window.location.href = "pagina_de_inicio_sesion.html";
    }