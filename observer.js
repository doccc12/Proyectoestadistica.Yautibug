const cargarImagen = (entradas, observador) => {
    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            entrada.target.classList.add('visible');
        }
    });
}

const observador = new IntersectionObserver(cargarImagen, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.3
});

const elementosAnimados = document.querySelectorAll('.efecto-entrada');
elementosAnimados.forEach( elemento => {
    observador.observe(elemento);
});