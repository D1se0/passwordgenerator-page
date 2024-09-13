// script.js

// Selecciona el botón de cambio de tema
const button = document.getElementById('toggleButton');
// Selecciona el elemento slider (si tienes uno, no está en el HTML proporcionado)
const slider = document.querySelector('.slider');
// Selecciona el enlace de la hoja de estilos
const themeStylesheet = document.getElementById('theme-stylesheet');
// Selecciona el elemento body
const body = document.body;

// Ajustes para la posición del slider (si estás usando uno)
const sliderPositionLight = 'translateX(0)'; // Posición para el modo claro
const sliderPositionDark = 'translateX(75px)'; // Posición para el modo oscuro

// Cargar el tema guardado si existe
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeStylesheet.setAttribute('href', 'css/style_dark.css');
    if (slider) {
        slider.style.transform = sliderPositionDark;
    }
} else {
    body.classList.add('light-mode');
    themeStylesheet.setAttribute('href', 'css/style_light.css');
    if (slider) {
        slider.style.transform = sliderPositionLight;
    }
}

// Cambiar el tema al hacer clic
button.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeStylesheet.setAttribute('href', 'css/style_light.css');
        if (slider) {
            slider.style.transform = sliderPositionLight;
        }
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeStylesheet.setAttribute('href', 'css/style_dark.css');
        if (slider) {
            slider.style.transform = sliderPositionDark;
        }
        localStorage.setItem('theme', 'dark');
    }
});
