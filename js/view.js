document.addEventListener('DOMContentLoaded', function() {
  const toggleVisibilityBtn = document.querySelector('.toggle-visibility');
  const passwordDisplay = document.querySelector('.password-placeholder');
  
  // Inicializar: Contraseña visible y ícono de "ojo cerrado"
  passwordDisplay.classList.add('shown');
  toggleVisibilityBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';

  // Función para calcular y establecer el número de puntos
  function updatePoints() {
      const passwordLength = passwordDisplay.textContent.length;
      passwordDisplay.setAttribute('data-points', '•'.repeat(passwordLength));
  }

  // Actualizar puntos al cargar la página
  updatePoints();

  // Escuchar el clic en el botón de visibilidad
  toggleVisibilityBtn.addEventListener('click', function() {
      if (passwordDisplay.classList.contains('shown')) {
          passwordDisplay.classList.remove('shown');
          passwordDisplay.classList.add('hidden');
          toggleVisibilityBtn.innerHTML = '<i class="fa-regular fa-eye"></i>'; // Cambia ícono a 'ojo abierto'
      } else {
          passwordDisplay.classList.add('shown');
          passwordDisplay.classList.remove('hidden');
          toggleVisibilityBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'; // Cambia ícono a 'ojo cerrado'
      }
  });
});
