export function iniciar() {

    let impDTFtextil = document.getElementById("impDTF-modal");
    let impDTFuv = document.getElementById("maquinaUV-modal");
    let impSublimado = document.getElementById("sublimado-modal");
    let laser = document.getElementById("laser-modal");

    let insumosRender = document.querySelector(".renderInsumos");
    let portadaIMG = document.querySelector(".insumo_imgPortada");
    const URL_BBDD = "./bbdd.json";
    let cont = 0;
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

            let dataDTFtextil = data.articulos.maquinas.DTF_TEXTIL;
            let dataDTFuv = data.articulos.maquinas.UV_DTF;
            let dataSublimado = data.articulos.maquinas.IMPRESORA_SUBLIMADO;
            let datalaser = data.articulos.maquinas.LASER;
            RecorrerImpresoras(dataDTFtextil); ///numero 1 es para los navbar
            RecorrerImpresoras(dataDTFuv);
            RecorrerImpresoras(dataSublimado);
            RecorrerImpresoras(datalaser);

            // recorrerInsumos(insumosJSON.insumos_DTF);

            // Llamar a una función o hacer algo con los datos cargados

        } catch (error) {
            console.error("Ocurrió un error:", error);
            // Manejar el error de alguna manera
        }
    }

    function RecorrerImpresoras(datas){
        if (Array.isArray(datas)){
    
            datas.forEach( item => {
                CreateCardNav(item);
            });
    
            cont = cont + 1;
        }else{
            CreateCardNav(datas);
        }
    }


    function CreateCardNav(item){
    // mejora la condicion
        let div = document.createElement("div");
        div.className = "contenedor";

        let content = `
            <img src="${item.imagen}" alt="">
            <h2>${item.nombre}</h2>
        `;

        div.innerHTML= content;
    
        switch(cont){
            case 0:
                impDTFtextil.appendChild(div);
            break;

            case 1:
                impDTFuv.appendChild(div);
            break;

            case 2:
                impSublimado.appendChild(div);
            break;

            case 3:
                laser.appendChild(div);
            break;

            default:
                console.log("Este caso no existe", cont);
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
        let divCard = document.createElement("div");
        let divImagen = document.createElement("div");
        let divTitulo = document.createElement("div");
        divImagen.className = "insumo";

        let imagen = `
            <img src="${tinta.imagen}" alt="">   
        `;

        let contentTitulo = `
            <h2>${tinta.nombre}</h2>     
        `

        divImagen.innerHTML= imagen;
        divTitulo.innerHTML= contentTitulo;

        divCard.appendChild(divImagen);
        divCard.appendChild(divTitulo);
        insumosRender.appendChild(divCard);
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


    portadaIMG.innerHTML =`<img src="https://i.postimg.cc/HsLLb49v/pngtree-color-based-inks-in-the-bottom-half-of-a-black-table-picture-image_2711875.png"
    alt="">`;


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



