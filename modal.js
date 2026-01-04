document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('modalAviso');
    const btnEntendido = document.getElementById('btnEntendido');
    const btnCerrar = document.querySelector('.close-modal-btn');

    // Función para mostrar el modal con animación
    function mostrarModal() {
        modal.style.display = 'flex';
        // Pequeño delay para que la transición de opacidad funcione
        setTimeout(() => {
            modal.classList.add('mostrar');
        }, 10);
    }

    // Función para cerrar el modal
    function cerrarModal() {
        modal.classList.remove('mostrar');
        // Esperar a que termine la transición para ocultarlo (0.3s)
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Opcional: Guardar en el navegador que ya se vio el aviso
        // sessionStorage.setItem('avisoVisto', 'true');
    }

    // --- LÓGICA DE APARICIÓN ---
    // Comprobar si ya se vio en esta sesión (Opcional: Descomenta si quieres que solo salga una vez)
    // if (!sessionStorage.getItem('avisoVisto')) {
        
        // Mostrar el modal después de 1 segundo de cargar la página
        setTimeout(mostrarModal, 1000);

    // }

    // Eventos para cerrar
    btnEntendido.addEventListener('click', cerrarModal);
    btnCerrar.addEventListener('click', cerrarModal);
    
    // Cerrar si se hace clic fuera del contenido (en el fondo oscuro)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
});