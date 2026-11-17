const formularioLogin = document.querySelector(".login_form");
const formularioRegistro = document.querySelector(".register_form");
const tituloFormulario = document.querySelector(".divition_header h1");
const parrafoFormulario = document.querySelector(".divition_header p");

//eliminar enlaces despues de registro 

const enlaceRecuperar = document.querySelector(".enlace_recuperar");

// enlazarse con los formularios

const enlaceRegistro = document.querySelector(".enlace_registro");
const enlaceLogin = document.querySelector(".enlace_login");

enlaceLogin.classList.add("oculto");

enlaceRegistro.addEventListener("click", function(event){
    
    formularioLogin.classList.add("oculto");
    formularioRegistro.classList.remove("oculto");

    //actualizar h1 y p

    tituloFormulario.textContent = "Crea tu cuenta";
    parrafoFormulario.textContent = "Registrate para acceder a los beneficios de Costify";

    //eliminar enlaces

    enlaceRecuperar.classList.add("oculto");
    enlaceRegistro.classList.add("oculto");
    enlaceLogin.classList.remove("oculto");

    event.preventDefault();
});

// comprobar si la contrasaeña y confirmar contraseña son iguales

const comprobarContrasena = document.getElementById("contrasena_registro");
const comprobarConfirmar = document.getElementById("confirmar_contrasena_registro");

// variable que determina si son iguales o no

const contrasenasCoinciden = comprobarContrasena.value === comprobarConfirmar.value;



formularioRegistro.addEventListener("sumbit", function(event){

    event.preventDefault();

    if (contrasenasCoinciden) {
    addEventListener()
    } else {

    }
});



