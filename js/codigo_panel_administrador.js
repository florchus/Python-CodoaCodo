const { createApp } = Vue

  createApp({
    data() {
      return {
        url:"http://127.0.0.1:5000/clientes",
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
            const url = 'http://127.0.0.1:5000/eliminar_cliente?email=' + correo;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(response => response.json())
                .then(function (res) {
                    alert(res.mensaje);
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