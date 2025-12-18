document.addEventListener("DOMContentLoaded", function () {
  // Cargar el header dinámicamente
  // @ts-ignore
  loadHeader();

  /**
   * Actualiza el año en el footer automáticamente.
   * @returns {void}
   */
  function updateFooterYear() {
    /** @type {HTMLElement | null} */
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString();
    }
  }
  updateFooterYear();

  /** @type {HTMLElement | null} */
  const userButton = document.getElementById("user");
  /** @type {HTMLElement | null} */
  const menuPrincipalDiv = document.getElementById("mobile-menu");

  const menuPrincipalOpen = /** @type {HTMLButtonElement | null} */ (
    document.getElementById("menu-toggle")
  );
  const menuPrincipalClose = /** @type {HTMLButtonElement | null} */ (
    document.getElementById("menu-close")
  );

  if (!userButton) {
    console.warn(
      "No se encontró el botón de usuario - puede que el header no se haya cargado"
    );
    return;
  }

  /**
   * Crea el menú desplegable de usuario si no existe.
   * @returns {void}
   */
  function crearMenuUsuario() {
    // Verificar si ya existe el menú
    if (document.getElementById("user-dropdown")) {
      return;
    }

    const dropdown = document.createElement("div");
    dropdown.id = "user-dropdown";
    dropdown.className = "dropdown-menu";
    dropdown.setAttribute("role", "menu");
    dropdown.setAttribute("aria-label", "Menú de usuario");
    //Ambos en registro ya que no hay un login.html todavia
    dropdown.innerHTML = `
            <a href="registro.html" class="dropdown-item" role="menuitem">
                <i class="fa-solid fa-right-to-bracket"></i>
                <span>Iniciar Sesión</span>
            </a>
            <a href="registro.html" class="dropdown-item" role="menuitem">
                <i class="fa-solid fa-user-plus"></i>
                <span>Registrarse</span>
            </a>
        `;

    // Asegurar que el contenedor padre tenga posición relativa
    userButton.parentElement.style.position = "relative";

    // Insertar el menú después del botón
    userButton.insertAdjacentElement("afterend", dropdown);
  }

  /**
   * Abre o cierra el menú desplegable de usuario.
   * @param {MouseEvent} e - El evento de click.
   * @returns {void}
   */
  function toggleMenuUsuario(e) {
    e.stopPropagation(); // Evitar que el click se propague

    let dropdown = document.getElementById("user-dropdown");

    // Si no existe, crearlo
    if (!dropdown) {
      crearMenuUsuario();
      dropdown = document.getElementById("user-dropdown");
      setTimeout(() => {
        if (dropdown) {
          dropdown.classList.add("show");
          userButton.setAttribute("aria-expanded", "true");
        }
      }, 10);
    } else {
      // Toggle la clase 'show'
      const isOpen = dropdown.classList.toggle("show");
      userButton.setAttribute("aria-expanded", isOpen.toString());
    }
  }

  /**
   * Cierra el menú cuando se hace click fuera de él.
   * @param {MouseEvent} e - El evento de click.
   * @returns {void}
   */
  function cerrarMenuUsuario(e) {
    const dropdown = document.getElementById("user-dropdown");

    // Si el menú existe y está abierto
    if (dropdown && dropdown.classList.contains("show")) {
      // Verificar que el click NO sea en el botón ni en el menú
      const target = /** @type {Node} */ (e.target);
      if (
        !dropdown.contains(target) &&
        e.target !== userButton &&
        !userButton.contains(target)
      ) {
        dropdown.classList.remove("show");
        userButton.setAttribute("aria-expanded", "false");
      }
    }
  }

  /**
   * Cierra el menú cuando se presiona la tecla Escape.
   * @param {KeyboardEvent} e - El evento de teclado.
   * @returns {void}
   */
  function cerrarConEscape(e) {
    if (e.key === "Escape") {
      const dropdown = document.getElementById("user-dropdown");

      if (dropdown && dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        userButton.setAttribute("aria-expanded", "false");
        userButton.focus(); // Devolver el foco al botón
      }

      // Cerrar menú móvil si está abierto
      if (
        menuPrincipalDiv &&
        !menuPrincipalDiv.classList.contains("opacity-0")
      ) {
        closeMenuPrincipal(null);
        menuPrincipalOpen.focus();
      }
    }
  }
  function openMenuPrincipal(e) {
    e.stopPropagation();

    // Mostrar menú con animación
    menuPrincipalDiv.classList.remove("opacity-0", "pointer-events-none");
    menuPrincipalDiv.classList.add("opacity-100");
    menuPrincipalDiv.setAttribute("aria-expanded", "true");

    // Bloquear scroll del body
    document.body.style.overflow = "hidden";
  }
  function closeMenuPrincipal(e) {
    if (e) e.stopPropagation();

    // Ocultar menú con animación
    menuPrincipalDiv.classList.add("opacity-0", "pointer-events-none");
    menuPrincipalDiv.classList.remove("opacity-100");
    menuPrincipalDiv.setAttribute("aria-expanded", "false");

    // Restaurar scroll del body
    document.body.style.overflow = "";
  }

  // Configurar atributos ARIA en el botón
  userButton.setAttribute("aria-haspopup", "true");
  userButton.setAttribute("aria-expanded", "false");

  // Event Listeners
  userButton.addEventListener("click", toggleMenuUsuario);
  document.addEventListener("click", cerrarMenuUsuario);
  document.addEventListener("keydown", cerrarConEscape);

  menuPrincipalOpen.addEventListener("click", openMenuPrincipal);
  menuPrincipalClose.addEventListener("click", closeMenuPrincipal);

  // Cerrar menú al hacer clic en un enlace
  const mobileNavLinks = document.querySelectorAll("#mobile-menu a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMenuPrincipal);
  });

  //@ts-ignore
  loadScrollToTop();

  const scrollToTopBtn = document.getElementById("scroll-to-top");

  function toggleScrollButton() {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none");
      scrollToTopBtn.classList.add("opacity-100");
    } else {
      scrollToTopBtn.classList.add("opacity-0", "pointer-events-none");
      scrollToTopBtn.classList.remove("opacity-100");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  window.addEventListener("scroll", toggleScrollButton);
  scrollToTopBtn.addEventListener("click", scrollToTop);

  /**
   * The function `handleHeaderScroll` adjusts the position of the header based on the user's scrolling
   * behavior on the webpage.
   * @returns The function `handleHeaderScroll` returns `undefined` because there is no explicit return
   * value specified in the function.
   */

  const header = document.querySelector("#header-container header");
  let lastScrollY = window.scrollY;

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 100) {
      header.classList.remove("-translate-y-full");
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY) {
      header.classList.add("-translate-y-full");
    } else {
      header.classList.remove("-translate-y-full");
    }

    lastScrollY = currentScrollY;
  }
  window.addEventListener("scroll", handleHeaderScroll);

  const faqQuestions = document.querySelectorAll(".faq-question");

  function toggleFAQ(e) {
    const clickedItem = e.currentTarget.parentElement;

    const isActive = clickedItem.classList.contains("active");

    const allFaqItems = document.querySelectorAll(".faq-item");
    allFaqItems.forEach((item) => {
      item.classList.remove("active");
    });

    if (!isActive) {
      clickedItem.classList.add("active");
    }
  }

  faqQuestions.forEach((question) => {
    question.addEventListener("click", toggleFAQ);
  });
});
