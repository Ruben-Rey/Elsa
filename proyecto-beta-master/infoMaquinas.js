console.log("infomaquinas.js está cargado.");


const URL_BBDD = "./bbdd.json";
let maquinasJSON;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Esta funcion se encarga de obtener la data del JSON
async function conexion(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Ahora que los datos se han cargado correctamente, puedes ejecutar cualquier código que dependa de maquinasJSON aquí
        maquinasJSON = data;
        return data;
    } catch (error) {
        console.error("Ocurrió un error:", error);
        throw error; // Propaga el error para que pueda ser manejado en el lugar adecuado
    }
}


conexion(URL_BBDD)
    .then( () =>{   
        buscarID();

})

function buscarID(){
    for (const categoria in maquinasJSON.articulos.maquinas) {
        maquinaEncontrada = maquinasJSON.articulos.maquinas[categoria].find(
          (maquina) => maquina.id.toString() === id
        );
        if (maquinaEncontrada) {
          break;
        }
    }

    if (maquinaEncontrada) {
        // Por ejemplo, aquí puedes mostrar la información en un modal o en algún otro lugar en tu página
        console.log("Máquina encontrada:", maquinaEncontrada);
        renderizar(maquinaEncontrada);
         // Luego, puedes usar maquinaEncontrada para mostrar la información en el lugar deseado en tu página.
    } else {
        console.log("Máquina no encontrada");
    }
}


let descripGeneral = document.querySelector(".genral_des");
let descripImagen = document.querySelector(".genral_img");
let descripVideo = document.querySelector(".video_pick");
let descripTitulo = document.querySelector(".titulo");

function renderizar(maquina){
    let descripcionGeneral = `
    <p>${maquina.descripcion_general}</p>
    `
    descripGeneral.innerHTML = descripcionGeneral;

    let imagen = `
    <img src="${maquina.imagen}" alt="">
    `
    descripImagen.innerHTML = imagen;
    
    let titulo = `
    <h1>${maquina.nombre}    <br> ${maquina.modelo}</h1>
    `
    descripTitulo.innerHTML = titulo;

    let video = `
    <iframe width="1300" height="900" src="${maquina.video}" frameborder="0"
    allowfullscreen></iframe>
    `
    descripVideo.innerHTML = video;
}