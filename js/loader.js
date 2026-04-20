window.addEventListener('load', () => {
    const loader = document.getElementById('pantalla_carga_wrapper');
    const app = document.getElementById('app-container');

    // Cambia el 5000 por el tiempo total en milisegundos que dure tu animación completa
    setTimeout(() => {
        loader.classList.add('fade-out'); // Empieza a desaparecer
        app.style.display = 'block';     // Aparece el index

        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 800); 
        
    }, 8000); // <-- AJUSTA ESTE NÚMERO (5000 = 5 segundos)
});