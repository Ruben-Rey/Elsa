export function iniciar() {

    let insumosRender = document.querySelector(".renderInsumos");
    let portadaIMG = document.querySelector(".insumo_imgPortada");
    const URL_BBDD = "./bbdd.json";
    let insumosJSON;

    async function cargarDatos() {
        try {
            const response = await fetch(URL_BBDD);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // Ahora que los datos se han cargado correctamente, puedes ejecutar cualquier código que dependa de maquinasJSON aquí
            insumosJSON = data.articulos.insumos;

            // recorrerInsumos(insumosJSON.insumos_DTF);

            // Llamar a una función o hacer algo con los datos cargados

        } catch (error) {
            console.error("Ocurrió un error:", error);
            // Manejar el error de alguna manera
        }
    }

    cargarDatos();

    function recorrerInsumos(insumos){

        insumos.forEach( (tinta, index) => {
            if (index !== 0){
                CreateCard(tinta);
            }
        });
    }


    function CreateCard(tinta){
        
        let div = document.createElement("div");
        div.className = "insumo";

        let content = `
            <img src="${tinta.imagen}" alt="">
            <h2>${tinta.nombre}</h2>
        `;
        console.log(content);
        div.innerHTML= content;

        insumosRender.appendChild(div);
    }

    function limpiarContenedor() {
        const renderInsu = document.querySelector(".renderInsumos");
        while (renderInsu.firstChild) {
            renderInsu.removeChild(renderInsu.firstChild);
        }
    }

    function crearPortada(portada){

        let imagen = `
        <img src="${portada.photo_general}" alt="">
        `
        portadaIMG.innerHTML = imagen;

    }

    const insumosList = document.querySelector(".ulconta-principal");

    // Agrega un evento de clic a la lista de categorías

    insumosList.addEventListener("click", (event) => {
        
        // Comprueba si se hizo clic en un elemento <a> dentro de un <li>
        if (event.target.tagName === "A") {
            event.preventDefault(); // Evita la navegación predeterminada del enlace
            // Obtén el ID de la categoría seleccionada
            const insumoId = event.target.parentElement.id;
            limpiarContenedor();
            crearPortada(insumosJSON[insumoId][0]);
            recorrerInsumos(insumosJSON[insumoId]);
        }
    });
}



