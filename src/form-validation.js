document.addEventListener("DOMContentLoaded", function () {
  /** @type {HTMLFormElement | null} */
  const form = document.querySelector(".register form");
  /** @type {HTMLInputElement | null} */
  const nombreInput = /** @type {HTMLInputElement} */ (
    document.getElementById("nombre")
  );
  /** @type {HTMLInputElement | null} */
  const apellidosInput = /** @type {HTMLInputElement} */ (
    document.getElementById("apellidos")
  );
  /** @type {HTMLInputElement | null} */
  const correoInput = /** @type {HTMLInputElement} */ (
    document.getElementById("correo")
  );
  /** @type {HTMLInputElement | null} */
  const contrasenaInput = /** @type {HTMLInputElement} */ (
    document.getElementById("contrasena")
  );
  /** @type {HTMLInputElement | null} */
  const direccionInput = /** @type {HTMLInputElement} */ (
    document.getElementById("direccion")
  );

  /**
   * Muestra un mensaje de error en la UI, asociado a un input.
   * @param {HTMLInputElement} inputElement - El <input> que tiene el error.
   * @param {string} mensaje - El texto de error que se mostrará.
   * @returns {void}
   */

  function mostrarError(inputElement, mensaje) {
    const formGroup = inputElement.parentElement;

    /** @type {HTMLElement | null} */
    const errorElement = formGroup.querySelector(".error-message");

    if (errorElement) {
      errorElement.textContent = mensaje;
      errorElement.style.visibility = "visible";
    }

    inputElement.classList.add("error");
  }

  /**
   * Limpia el mensaje de error de un input.
   * @param {HTMLInputElement} inputElement - El <input> que queremos limpiar.
   * @returns {void}
   */

  function limpiarError(inputElement) {
    const formGroup = inputElement.parentElement;

    /** @type {HTMLElement | null} */
    const errorElement = formGroup.querySelector(".error-message");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.visibility = "hidden";
    }

    inputElement.classList.remove("error");
  }

  /**
   * Valida que un campo no esté vacío.
   * @param {HTMLInputElement} inputElement - El input a validar.
   * @param {string} nombreCampo - El nombre del campo para mostrar en el error.
   * @returns {boolean} - True si el campo es válido, false si está vacío.
   */
  function validarCampoRequerido(inputElement, nombreCampo) {
    const valor = inputElement.value.trim();

    if (valor === "") {
      mostrarError(inputElement, `El campo ${nombreCampo} es obligatorio.`);
      return false;
    } else {
      limpiarError(inputElement);
      return true;
    }
  }

  /**
   * Valida el formato del correo electrónico.
   * @returns {boolean} - True si el correo es válido, false si no lo es.
   */
  function validarCorreo() {
    const valor = correoInput.value.trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
      mostrarError(correoInput, "El correo es obligatorio");
      return false;
    } else if (!regexEmail.test(valor)) {
      mostrarError(
        correoInput,
        "El formato del correo no es válido (ej: usuario@dominio.com)."
      );
      return false;
    } else {
      limpiarError(correoInput);
      return true;
    }
  }

  /**
   * Valida que la contraseña cumpla con los requisitos de seguridad.
   * @returns {boolean} - True si la contraseña es válida, false si no cumple los requisitos.
   */
  function validarContrasena() {
    const valor = contrasenaInput.value.trim();

    const reglas = [
      {
        test: (v) => v.length >= 8,
        mensaje: "Debe tener al menos 8 caracteres.",
      },
      {
        test: (v) => /[A-Z]/.test(v),
        mensaje: "Debe tener al menos una letra mayúscula.",
      },
      {
        test: (v) => /[a-z]/.test(v), // Buena idea añadir minúsculas también
        mensaje: "Debe tener al menos una letra minúscula.",
      },
      {
        test: (v) => /[0-9]/.test(v),
        mensaje: "Debe tener al menos un número.",
      },
      {
        test: (v) => /[!@#$%^&*(),.?":{}|<>_]/.test(v), // Añadí el guion bajo
        mensaje: "Debe tener al menos un caracter especial (ej: !@#$_).",
      },
    ];

    if (valor === "") {
      mostrarError(contrasenaInput, "La contraseña es obligatoria.");
      return false;
    }

    for (const regla of reglas) {
      if (!regla.test(valor)) {
        mostrarError(contrasenaInput, regla.mensaje);
        return false;
      }
    }
    limpiarError(contrasenaInput);
    return true;
  }

  nombreInput.addEventListener("blur", () => {
    validarCampoRequerido(nombreInput, "Nombre");
  });

  apellidosInput.addEventListener("blur", () => {
    validarCampoRequerido(apellidosInput, "Apellidos");
  });

  direccionInput.addEventListener("blur", () => {
    validarCampoRequerido(direccionInput, "Direccion");
  });

  correoInput.addEventListener("blur", validarCorreo);
  contrasenaInput.addEventListener("blur", validarContrasena);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("!Submit interceptado!");

    const esNombreValido = validarCampoRequerido(nombreInput, "Nombre");
    const esApellidoValido = validarCampoRequerido(apellidosInput, "Apellidos");
    const esCorreoValido = validarCorreo();
    const esContrasenaValida = validarContrasena();
    const esDireccionValida = validarCampoRequerido(
      direccionInput,
      "Direccion"
    );

    const todasLasValidaciones = [
      esNombreValido,
      esApellidoValido,
      esCorreoValido,
      esContrasenaValida,
      esDireccionValida,
    ];

    const esFormularioTotalmenteValido = todasLasValidaciones.every(Boolean);

    if (esFormularioTotalmenteValido) {
      console.log("¡Formulario VÁLIDO! Listo para enviar.");
      alert("¡Registro exitoso! (Simulación)");
    } else {
      console.log("Formulario INVÁLIDO. Revisa los errores.");
    }
  });

  /**
   * Configura la simulación del formulario.
   * @returns {void}
   */
  function setFormSimulacion() {
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const submitButton = /** @type {HTMLButtonElement} */ (
          document.getElementById("submitBtn")
        );

        if (submitButton) {
          const originalButton = submitButton.textContent;

          submitButton.textContent = "Procesando...";
          submitButton.disabled = true;

          setTimeout(() => {
            alert("¡Registro realizado! (Simulacion)");
            submitButton.textContent = originalButton;
            submitButton.disabled = false;
            form.reset();
          }, 1500);
        }
      });
    }
  }
});
