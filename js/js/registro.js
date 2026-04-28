function nextStep(stepNumber) {
    console.log("Navegando al paso:", stepNumber);
    const screens = document.querySelectorAll('.screen');
    
    // Ocultar todas las pantallas
    screens.forEach(s => s.classList.remove('active'));
    
    // Mostrar la pantalla seleccionada
    const target = document.getElementById('step-' + stepNumber);
    if(target) {
        target.classList.add('active');
    } else {
        console.error("Error: El ID step-" + stepNumber + " no existe.");
    }
}