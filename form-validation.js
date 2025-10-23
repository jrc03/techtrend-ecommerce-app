document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".register form");
  const nombreInput = document.getElementById("nombre");
  const apellidosInput = document.getElementById("apellidos");
  const correoInput = document.getElementById("correo");
  const contrasenaInput = document.getElementById("contrasena");
  const direccionInput = document.getElementById("direccion");

  /**
   * Muestra un mensaje de error en la UI, asociado a un input.
   * @param {HTMLElement} inputElement - El <input> que tiene el error.
   * @param {string} mensaje - El texto de error que se mostrará.
   */

  function mostrarError(inputElement, mensaje) {
    const formGroup = inputElement.parentElement;

    const errorElement = formGroup.querySelector(".error-message");

    errorElement.textContent = mensaje;
    errorElement.style.display = "block";

    inputElement.classList.add("error");
  }

  /**
   * Limpia el mensaje de error de un input.
   * @param {HTMLElement} inputElement - El <input> que queremos limpiar.
   */

  function limpiarError(inputElement) {
    const formGroup = inputElement.parentElement;

    const errorElement = formGroup.querySelector(".error-message");

    errorElement.textContent = "";
    errorElement.style.display = "none";

    inputElement.classList.remove("error");
  }

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

  form.addEventListener("submit", function (event) {
    event.preventDefault();

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
});
