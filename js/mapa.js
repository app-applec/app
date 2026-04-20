const mapWindow = document.getElementById('mapWindow');
const mapContent = document.getElementById('mapContent');

// 1. CENTRAR EL MAPA AL CARGAR
window.onload = () => {
    // Calculamos el centro: (Ancho total - Ancho pantalla) / 2
    const centerX = (mapContent.offsetWidth - window.innerWidth) / 2;
    const centerY = (mapContent.offsetHeight - window.innerHeight) / 2;
    
    mapWindow.scrollLeft = centerX;
    mapWindow.scrollTop = centerY;
};

// 2. LÓGICA DE ARRASTRE LIBRE
let isDown = false;
let startX, startY, scrollLeft, scrollTop;

mapWindow.addEventListener('mousedown', (e) => {
    isDown = true;
    mapWindow.style.cursor = 'grabbing';
    startX = e.pageX - mapWindow.offsetLeft;
    startY = e.pageY - mapWindow.offsetTop;
    scrollLeft = mapWindow.scrollLeft;
    scrollTop = mapWindow.scrollTop;
});

mapWindow.addEventListener('mouseleave', () => isDown = false);
mapWindow.addEventListener('mouseup', () => {
    isDown = false;
    mapWindow.style.cursor = 'grab';
});

mapWindow.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - mapWindow.offsetLeft;
    const y = e.pageY - mapWindow.offsetTop;
    
    // Calculamos cuánto se ha movido el ratón
    const walkX = (x - startX);
    const walkY = (y - startY);
    
    // Movemos el scroll en ambas direcciones
    mapWindow.scrollLeft = scrollLeft - walkX;
    mapWindow.scrollTop = scrollTop - walkY;
});

// Soporte para móviles (Touch)
mapWindow.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - mapWindow.offsetLeft;
    startY = e.touches[0].pageY - mapWindow.offsetTop;
    scrollLeft = mapWindow.scrollLeft;
    scrollTop = mapWindow.scrollTop;
});

mapWindow.addEventListener('touchend', () => isDown = false);

mapWindow.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - mapWindow.offsetLeft;
    const y = e.touches[0].pageY - mapWindow.offsetTop;
    const walkX = (x - startX);
    const walkY = (y - startY);
    mapWindow.scrollLeft = scrollLeft - walkX;
    mapWindow.scrollTop = scrollTop - walkY;
});