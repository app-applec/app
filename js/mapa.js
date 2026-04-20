const mapWindow = document.getElementById('mapWindow');
let isDown = false;
let startX, startY, scrollLeft, scrollTop;

// Configuración del arrastre libre (Omnidireccional)
mapWindow.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - mapWindow.offsetLeft;
    startY = e.pageY - mapWindow.offsetTop;
    scrollLeft = mapWindow.scrollLeft;
    scrollTop = mapWindow.scrollTop;
});

mapWindow.addEventListener('mouseleave', () => {
    isDown = false;
});

mapWindow.addEventListener('mouseup', () => {
    isDown = false;
});

mapWindow.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - mapWindow.offsetLeft;
    const y = e.pageY - mapWindow.offsetTop;
    
    // Calculamos el movimiento
    const walkX = (x - startX); 
    const walkY = (y - startY);
    
    // Aplicamos el scroll en ambos ejes simultáneamente
    mapWindow.scrollLeft = scrollLeft - walkX;
    mapWindow.scrollTop = scrollTop - walkY;
});

// Lógica para abrir el mensaje del marcador
document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('click', (e) => {
        marker.classList.toggle('active');
        e.stopPropagation(); // Para que el click no mueva el mapa
    });
});