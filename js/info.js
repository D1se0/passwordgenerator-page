// Seleccionar los elementos
const openPopupBtn = document.getElementById('open-popup-btn');
const closePopupBtn = document.getElementById('close-popup-btn');
const infoPopup = document.getElementById('info-popup');

// Abrir el popup al hacer clic en el botón
openPopupBtn.addEventListener('click', () => {
    infoPopup.style.display = 'flex'; // Cambia display a flex para mostrar el popup
});

// Cerrar el popup al hacer clic en el botón de cerrar
closePopupBtn.addEventListener('click', () => {
    infoPopup.style.display = 'none'; // Cambia display a none para ocultar el popup
});

// Cerrar el popup al hacer clic fuera del contenido del popup
window.addEventListener('click', (event) => {
    if (event.target === infoPopup) {
        infoPopup.style.display = 'none';
    }
});
