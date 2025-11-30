/**
 * Componentes reutilizables del sitio
 * Este archivo contiene el header y el menú móvil que se usan en todas las páginas
 */

/**
 * Genera el HTML del header
 * @returns {string} HTML del header
 */
function getHeaderHTML() {
  return `
    <header class="flex items-center justify-between py-5 px-10 bg-bg-primary sticky top-0 z-1000 shadow-lg">
      <div class="flex items-center gap-4 lg:gap-10">
        <button
          type="button"
          id="menu-toggle"
          class="ml-0 pl-0 icon lg:hidden"
          aria-label="Abrir menú"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
        <h2 class="font-extrabold lg:text-3xl md:text-2xl text-xl text-primary tracking-[-0.5px] transition-all duration-300 ease-in-out hover:translate-y-[-0.5px]">
          <a href="index.html">TechTrend</a>
        </h2>
        <nav class="hidden lg:flex gap-1">
          <button type="button" class="nav-btn">Comprar</button>
          <button type="button" class="nav-btn">Teléfonos Móviles</button>
          <button type="button" class="nav-btn">Laptops</button>
          <button type="button" class="nav-btn">Relojes</button>
          <button type="button" class="nav-btn">Soporte</button>
        </nav>
      </div>

      <div class="flex gap-2">
        <button type="button" class="icon" id="search" aria-label="Buscar">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button type="button" class="icon" id="user" aria-label="Menú de usuario">
          <i class="fa-solid fa-user"></i>
        </button>
        <button type="button" class="icon" id="shopping-cart" aria-label="Carrito de compras">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </header>
  `;
}

/**
 * Genera el HTML del menú móvil
 * @returns {string} HTML del menú móvil
 */
function getMobileMenuHTML() {
  return `
    <div
      id="mobile-menu"
      class="flex items-center justify-center inset-0 fixed z-9999 opacity-0 pointer-events-none bg-black/70 text-white font-bold text-2xl transition-opacity duration-300 ease-in-out"
    >
      <button
        type="button"
        class="absolute top-6 right-6 p-3 text-2xl text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-white/20 hover:-translate-y-0.5"
        id="menu-close"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <nav class="flex flex-col gap-6 justify-center items-center">
        <a href="index.html" class="classmobile-nav-items">Comprar</a>
        <a href="index.html" class="classmobile-nav-items">Teléfonos Móviles</a>
        <a href="index.html" class="classmobile-nav-items">Laptops</a>
        <a href="index.html" class="classmobile-nav-items">Relojes</a>
        <a href="index.html" class="classmobile-nav-items">Soporte</a>
      </nav>
    </div>
  `;
}

/**
 * Inyecta el header y menú móvil en la página
 * Debe llamarse después de que el DOM esté listo
 */
function loadHeader() {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = getHeaderHTML() + getMobileMenuHTML();
  }
}

// Exportar para uso en otros archivos (si se usa como módulo)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getHeaderHTML, getMobileMenuHTML, loadHeader };
}
