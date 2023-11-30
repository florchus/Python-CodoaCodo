const { createApp } = Vue

  createApp({
    data() {
      return {
        url:"https://librotopia.pythonanywhere.com/clientes",
        clientes:[],
        error:false,
        cargando:true
      }
    },

    // Se llama después de que la instancia haya 
    // terminado de procesar todas las opciones relacionadas con el estado.
    created() {
        this.fetchData(this.url)  // Invocando al método
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.clientes = data;
                    this.cargando=false;
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                });
        },
        // el correo se necesita para buscar en la DB y eliminarlo
        eliminar(correo) {
            const url = 'https://librotopia.pythonanywhere.com/eliminar_cliente?email=' + correo;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert(res)
                    location.reload();
                })
        },
        editar(correo) {
            localStorage.setItem('email', correo);
            localStorage.setItem('origen', 'editar');
            window.location.href = "panel_usuario.html";
        }
    },
    
  }).mount('#app')