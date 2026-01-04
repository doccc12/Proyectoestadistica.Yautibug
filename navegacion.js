// Variable para controlar el scroll del menú
let seccionActual = 'inicio';

function navegar(seccion, boton) {
    seccionActual = seccion; 
    
    // 1. CAMBIAR EL BOTÓN ACTIVO
    // Quitamos la clase 'activo' de todos los enlaces (incluyendo los del dropdown)
    if (boton) {
        document.querySelectorAll('.menu-link, .dropdown-content a').forEach(link => link.classList.remove('activo'));
        boton.classList.add('activo');
    }

    // 2. REFERENCIAS A VIDEOS Y HEADER
    const vidInicio = document.getElementById('videoPrincipal');
    const vidDesc = document.getElementById('videoDescriptiva');
    const header = document.getElementById('main-header');

    // 3. OCULTAR TODAS LAS SECCIONES (ACTUALIZADO)
    // Buscamos todas las secciones por sus clases para asegurar que ocultamos
    // las nuevas (herramientas, conclusiones, nosotros) y las viejas.
    const todasLasSecciones = document.querySelectorAll('.vista-seccion, .seccion-interna');
    todasLasSecciones.forEach(el => {
        el.classList.add('oculto');
    });
    
    // 4. PAUSAR VIDEOS (Para ahorrar recursos)
    if(vidInicio) vidInicio.pause();
    if(vidDesc) vidDesc.pause();

    // 5. MOSTRAR LA SECCIÓN ELEGIDA
    // Construimos el ID dinámicamente: 'vista-inicio', 'vista-herramientas', etc.
    const seccionDestino = document.getElementById('vista-' + seccion);
    if (seccionDestino) {
        seccionDestino.classList.remove('oculto');
    } else {
        console.error("No se encontró la sección: vista-" + seccion);
    }

    // 6. LÓGICA DE COMPORTAMIENTO (VIDEOS Y HEADER)
    if (seccion === 'inicio') {
        // --- ESTAMOS EN INICIO ---
        if(vidInicio) vidInicio.play(); 
        checkScroll(); // Verifica si debe ser transparente o sólido

    } else if (seccion === 'descriptiva') {
        // --- ESTAMOS EN DESCRIPTIVA ---
        if(vidDesc) vidDesc.play(); 
        checkScroll(); // Verifica si debe ser transparente o sólido
        
    } else {
        // --- OTRAS PÁGINAS (Inferencial, Machine, Herramientas, Conclusiones, Nosotros) ---
        // En estas secciones no hay video de fondo, así que forzamos el menú sólido
        if(header) header.classList.add("nav-scroll");
    }
    
    // 7. SCROLL AL INICIO SUAVE
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función auxiliar para controlar el color del menú al hacer scroll
function checkScroll() {
    const header = document.getElementById("main-header");
    // Si bajamos más de 50px, menú sólido. Si no, transparente.
    if (window.scrollY > 50) {
        header.classList.add("nav-scroll");
    } else {
        header.classList.remove("nav-scroll");
    }
}

// Evento scroll (Solo activo para secciones con Video Banner)
window.addEventListener("scroll", function() {
    // Solo aplicamos el efecto transparente/sólido si estamos en una sección con video
    if (seccionActual === 'inicio' || seccionActual === 'descriptiva') {
        checkScroll();
    }
});


/* ==========================================
   LÓGICA PARA ESTADÍSTICA DESCRIPTIVA
   ========================================== */

// 1. Mostrar/Ocultar Info (Acordeón)
function toggleInfo(id) {
    const elemento = document.getElementById(id);
    if(elemento) {
        elemento.classList.toggle('mostrar');
    }
}

// 2. Filtrar Tabla
function filtrarTabla() {
    const texto = document.getElementById('filtroTexto').value.toLowerCase();
    const tipo = document.getElementById('filtroTipo').value.toLowerCase();
    const tabla = document.getElementById('tablaVariables');
    
    // Verificamos que la tabla exista para evitar errores en otras pestañas
    if (!tabla) return;

    const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        // Celda 0: Nombre Original, Celda 1: Nombre, Celda 3: Tipo
        const nombreOriginal = filas[i].getElementsByTagName('td')[0].textContent.toLowerCase();
        const nombre = filas[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        const tipoVariable = filas[i].getElementsByTagName('td')[3].textContent.toLowerCase();

        let cumpleTexto = nombreOriginal.includes(texto) || nombre.includes(texto);
        let cumpleTipo = (tipo === "") || (tipoVariable.includes(tipo));

        if (cumpleTexto && cumpleTipo) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }
}

// (Click en encabezado)
function ordenarTabla(n) {
    const tabla = document.getElementById("tablaVariables");
    if (!tabla) return;

    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc"; 
    
    while (switching) {
        switching = false;
        rows = tabla.rows;
        
        // Empezamos desde 1 para saltar el encabezado
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++; 
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}