


// router.js

// Función para cargar módulos en función de la página actual
function cargarModulo() {
    const url = window.location.pathname; // Obtiene la URL de la página actual
  
    if (url.includes('infomaquinas.html')) {
      // Carga el módulo específico para infomaquinas.html
      import('./infoMaquinas.js').then((modulo) => {
        modulo.iniciar();
      });
    } else if (url.includes('insumos.html')) {
      // Carga el módulo específico para insumos.html
      import('./insumos.js').then((modulo) => {
        modulo.iniciar();
      });
    }
  }
  
  // Ejecuta la función para cargar el módulo adecuado
  cargarModulo();
  