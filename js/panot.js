const API_KEY = 'AIzaSyAumVFNZda0J_4i0_7QcNIFJj1mUUOctaw'; // <--- PEGA TU CLAVE AQUÍ
const input = document.getElementById('user-input');
const nubeTexto = document.getElementById('nube-texto');

input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const pregunta = input.value.trim();
        if (pregunta === "") return;

        nubeTexto.innerText = "..."; 
        input.value = "";
        input.disabled = true;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Ets el Panot, un personatge amable de Barcelona. Respon molt breu (10 paraules màxim): ${pregunta}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            
            if (data.error) {
                // Si sale error de cuota, avisamos amablemente
                if (data.error.message.includes("Quota")) {
                    nubeTexto.innerText = "Estic una mica cansat de parlar... espera un minut i tornem-hi!";
                } else {
                    nubeTexto.innerText = "Error API: " + data.error.message;
                }
                return;
            }

            if (data.candidates && data.candidates[0].content) {
                nubeTexto.innerText = data.candidates[0].content.parts[0].text;
            } else {
                nubeTexto.innerText = "No t'he entès bé, em repeteixes?";
            }

        } catch (error) {
            nubeTexto.innerText = "Error de connexió al servidor.";
        } finally {
            input.disabled = false;
            input.focus();
        }
    }
});