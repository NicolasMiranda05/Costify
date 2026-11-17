
// identificar los campos para llenar

const material = document.getElementById("material");
const cantidad = document.getElementById("cantidad");
const unidad = document.getElementById("unidad");
const valor = document.getElementById("valor");

// constantes de analisis financiero

const subtotal = document.getElementById("subtotal");
const presupuestoRestante = document.getElementById("presupuesto-restante");
const porcentajeUtilizado = document.getElementById("porcentaje-utilizado");
const graficoPresupuesto = document.getElementById("grafico-presupuesto");
const alertaPresupuesto = document.getElementById("alerta-presupuesto");

const presupuestoInicial = 5000000;
let totalAcumulado = 0;


//boton "agregarmateriales"

const botonAgregar = document.getElementById("agregar_material");

//identificar la tabla y el contador de material

const listaMateriales = document.getElementById("lista-materiales");
const contadorMateriales = document.getElementById("contador-materiales");

//detectar el botón y función del boton

botonAgregar.addEventListener("click", agregarMaterial);

function agregarMaterial (){
 const nombreMaterial = material.value; 
 const unidadIngresada = unidad.value;
 const cantidadIngresada = Number(cantidad.value);
 const valorIngresado = Number(valor.value);

    if (cantidadIngresada <= 0) {
        alert ("la cantidad debe ser mayor a 0");
        return;
    }

    if (nombreMaterial === "") {
        alert ("Selecciona un material");
        return;
    }

    if (valorIngresado <= 0){
        alert ("El valor ingresado debe ser mayor a 0");
        return;
    }

    if(unidadIngresada === ""){
        alert ("Debes ingresar alguna unidad de medida");
        return;
    }

    const totalMaterial = cantidadIngresada * valorIngresado;
     totalAcumulado += totalMaterial;
    actualizarResumen ();
    //desapareceer mensaje cuando está vacio

    const mensajeVacio = document.querySelector(".table_empty");
  

    if (mensajeVacio) {
        mensajeVacio.closest("tr").remove();
    }

    // agregar a HTML

    document.createElement("fila")

    // Material AGREGADO A LA PAGINA

    const fila = document.createElement("tr");
    const celdaMaterial = document.createElement("td");

    celdaMaterial.textContent = nombreMaterial;

    fila.appendChild(celdaMaterial);

    // CANTIDAD AGREGADO A PAG

    const celdaCantidad = document.createElement("td");

    celdaCantidad.textContent = cantidadIngresada;

    fila.appendChild(celdaCantidad);

    // UNIDAD AGREGADO A PAG

    const celdaUnidad = document.createElement("td");

    celdaUnidad.textContent = unidadIngresada;

    fila.appendChild(celdaUnidad);

    // VALOR AGREGADO A PAG

    const celdaValor = document.createElement("td");

    celdaValor.textContent = valorIngresado;

    fila.appendChild(celdaValor);
    
    // TOTAL

    const celdaTotal = document.createElement("td");

    celdaTotal.textContent = totalMaterial;

    fila.appendChild(celdaTotal);

    //BORRAR ALGUN MATERIAL

    const celdaAccion = document.createElement("td");
    const botonEliminar = document.createElement("button")

    //INSTRUCCIÓN PARA ELIMINAR FILA

    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "delete_button";

    celdaAccion.appendChild(botonEliminar);

    fila.appendChild(celdaAccion);

    botonEliminar.addEventListener("click", function (){

        totalAcumulado -= totalMaterial;
        actualizarResumen ();

        fila.remove();
        actualizarContador();
            
        if (listaMateriales.children.length === 0) {
            mostrarMensajeVacio();
        }

    })

    listaMateriales.appendChild(fila);
    actualizarContador();
}

function actualizarResumen () {
    
    subtotal.textContent = "$" + totalAcumulado.toLocaleString("es-CO");
    const presupuestoDisponible = presupuestoInicial - totalAcumulado;
    presupuestoRestante.textContent = "$" + presupuestoDisponible.toLocaleString("es-CO");
    const porcentajePresupuesto = totalAcumulado / presupuestoInicial * 100;
    const porcentajeGrafico = Math.min(porcentajePresupuesto, 100);
    const colorGrafico = porcentajePresupuesto > 100
        ? "#b42318"
        : "#123B5D";


    porcentajeUtilizado.textContent = porcentajePresupuesto.toFixed(1) + "%"
    

    graficoPresupuesto.style.background = `conic-gradient(
       ${colorGrafico} 0deg ${porcentajeGrafico * 3.6}deg,
        #e8edf1 ${porcentajeGrafico * 3.6}deg 360deg
    )`;

    if (porcentajePresupuesto >= 80 && porcentajePresupuesto < 100) {
        alertaPresupuesto.textContent = "Estás alcanzando el límite del presupuesto";
        alertaPresupuesto.hidden = false;
        alertaPresupuesto.classList.remove("exhausted");
        alertaPresupuesto.classList.remove("exceeded");


    } else if (porcentajePresupuesto === 100){
        alertaPresupuesto.textContent = "Has ocupado todo tu presupuesto"
        alertaPresupuesto.hidden = false;
        alertaPresupuesto.classList.add("exhausted");

    } else if (porcentajePresupuesto > 100){
        const presupuestoExcedido = totalAcumulado - presupuestoInicial;
        alertaPresupuesto.textContent = "Haz superado tu presupuesto inicial en $" + presupuestoExcedido.toLocaleString("es-CO");
        alertaPresupuesto.hidden = false;
        alertaPresupuesto.classList.add("exceeded");

    }else {
        alertaPresupuesto.hidden = true;
    }

}

//CONTADOR DE MATERIALES


function actualizarContador(){

// GUARDAR RESULTADO DE CONTADOR

    const cantidadMateriales = listaMateriales.children.length;
    console.log("filas encontradas:", cantidadMateriales);

    if (cantidadMateriales === 1) {
        contadorMateriales.textContent = "1 material";
    } else{
        contadorMateriales.textContent = cantidadMateriales + " materiales";
    }

}

function mostrarMensajeVacio() {

    const filaVacia = document.createElement("tr");
    const celdaVacia = document.createElement("td");

    celdaVacia.colSpan = 6; 
    celdaVacia.className = "table_empty";

    const iconoVacio = document.createElement("i");
    iconoVacio.className = "fa-solid fa-box-open";

    const textoPrincipal = document.createElement("p");
    textoPrincipal.textContent = "Aún no has registrado material.";

    const textoSecundario = document.createElement("small");
    textoSecundario.textContent = "Comienza registrando tu primer material";

    celdaVacia.appendChild(iconoVacio);
    celdaVacia.appendChild(textoPrincipal);
    celdaVacia.appendChild(textoSecundario);

    filaVacia.appendChild(celdaVacia);
    listaMateriales.appendChild(filaVacia);

}

//ANALISIS FINANCIERO











