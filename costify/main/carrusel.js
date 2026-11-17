let carrusel = document.getElementById("carrusel")

let imagenes = [
    "assets/dinamic1.jpeg",
    "assets/dinamic2.jpeg",
    "assets/dinamic3.jpeg",
    "assets/dinamic4.jpeg",
    "assets/dinamic5.jpeg"
];

//contador de imagenes

let indiceActual = 0;

function cambiarImagen() {

    carrusel.style.backgroundImage = `linear-gradient(rgba(18, 59, 93, 0.7), rgba(18, 59, 93, 0.7)), url("${imagenes[indiceActual]}")`;

    indiceActual = indiceActual + 1

    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }


}

cambiarImagen();

setInterval(cambiarImagen, 5000);

