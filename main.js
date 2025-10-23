// main.js - Menú desplegable de usuario (Login/Registro)

document.addEventListener('DOMContentLoaded', function() {
    
    
    
    const userButton = document.getElementById('user');
    
    if (!userButton) {
        console.error('❌ No se encontró el botón de usuario');
        return;
    }
    
    // Crear el menú desplegable
    function crearMenuUsuario() {
        // Verificar si ya existe el menú
        if (document.getElementById('user-dropdown')) {
            return;
        }
        
        const dropdown = document.createElement('div');
        dropdown.id = 'user-dropdown';
        dropdown.className = 'dropdown-menu';
        dropdown.setAttribute('role', 'menu');
        dropdown.setAttribute('aria-label', 'Menú de usuario');
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
        userButton.parentElement.style.position = 'relative';
        
        // Insertar el menú después del botón
        userButton.insertAdjacentElement('afterend', dropdown);
    }
    
    // Abrir/cerrar el menú
    function toggleMenuUsuario(e) {
        e.stopPropagation(); // Evitar que el click se propague
        
        let dropdown = document.getElementById('user-dropdown');
        
        // Si no existe, crearlo
        if (!dropdown) {
            crearMenuUsuario();
            dropdown = document.getElementById('user-dropdown');
            setTimeout(() => {
                dropdown.classList.add('show');
                userButton.setAttribute('aria-expanded', 'true');
            }, 10);
        } else {
            // Toggle la clase 'show'
            const isOpen = dropdown.classList.toggle('show');
            userButton.setAttribute('aria-expanded', isOpen);
        }
    }
    
    // Cerrar el menú al hacer click fuera
    function cerrarMenuUsuario(e) {
        const dropdown = document.getElementById('user-dropdown');
        
        // Si el menú existe y está abierto
        if (dropdown && dropdown.classList.contains('show')) {
            // Verificar que el click NO sea en el botón ni en el menú
            if (!dropdown.contains(e.target) && e.target !== userButton && !userButton.contains(e.target)) {
                dropdown.classList.remove('show');
                userButton.setAttribute('aria-expanded', 'false');
            }
        }
    }
    
    // Cerrar el menú con la tecla Escape
    function cerrarConEscape(e) {
        if (e.key === 'Escape') {
            const dropdown = document.getElementById('user-dropdown');
            
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                userButton.setAttribute('aria-expanded', 'false');
                userButton.focus(); // Devolver el foco al botón
            }
        }
    }
    
    
    // Configurar atributos ARIA en el botón
    userButton.setAttribute('aria-haspopup', 'true');
    userButton.setAttribute('aria-expanded', 'false');
    
    // Event Listeners
    userButton.addEventListener('click', toggleMenuUsuario);
    document.addEventListener('click', cerrarMenuUsuario);
    document.addEventListener('keydown', cerrarConEscape);
    
    
});