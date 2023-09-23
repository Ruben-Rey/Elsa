export function iniciar() {

    let impDTFtextil = document.getElementById("impDTF-modal");
    let impDTFuv = document.getElementById("maquinaUV-modal");
    let impSublimado = document.getElementById("sublimado-modal");
    let laser = document.getElementById("laser-modal");
    let folleto = document.querySelector(".folleto a");

    const URL_BBDD = "./bbdd.json";
    let cont = 0;
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

    let maquinaEncontrada;

    conexion(URL_BBDD)
        .then( (data) =>{
            let dataDTFtextil = data.articulos.maquinas.DTF_TEXTIL;
            let dataDTFuv = data.articulos.maquinas.UV_DTF;
            let dataSublimado = data.articulos.maquinas.IMPRESORA_SUBLIMADO;
            let datalaser = data.articulos.maquinas.LASER;
            RecorrerImpresoras(dataDTFtextil); ///numero 1 es para los navbar
            RecorrerImpresoras(dataDTFuv);
            RecorrerImpresoras(dataSublimado);
            RecorrerImpresoras(datalaser);

            buscarID(id);
    })

    function RecorrerImpresoras(datas){
        if (Array.isArray(datas)){
    
            datas.forEach( item => {
                CreateCard(item);
            });
    
            cont = cont + 1;
        }else{
            CreateCard(datas);
        }
    }


    function CreateCard(item){
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

    function buscarID(id){
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
    let insumo = document.querySelector(".info_insumos");


    let keyInsumo;
    function renderizar(maquina){
        
        keyInsumo = maquina.tipo;
        let tipoInsumo = maquinasJSON.articulos.insumos[`insumos_${keyInsumo}`];
        
        let descripcionGeneral = `
        <p>${maquina.descripcion_general}</p>
        `
        descripGeneral.innerHTML = descripcionGeneral;

        let imagen = `
        <img src="${maquina.imagen}" alt="">
        `
        descripImagen.innerHTML = imagen;

        let contenedorInsumos = document.createElement("div");
        contenedorInsumos.className = "card-insumos";

        let contentInsumo = `
            <img src=${tipoInsumo[1].imagen} alt="">
            
        `
        let contenedorTitulo = document.createElement("div");
        let contentTitulo = `
            <p>${tipoInsumo[1].nombre}</p>
            
        `
        contenedorTitulo.innerHTML = contentTitulo;
        contenedorInsumos.innerHTML = contentInsumo;
        insumo.appendChild(contenedorInsumos);
        insumo.appendChild(contenedorTitulo);

        folleto.href = maquina.folleto;


        let titulo = `
        <h1>${maquina.nombre}    <br> ${maquina.modelo}</h1>
        `
        descripTitulo.innerHTML = titulo;

        let video = `
        <iframe src="${maquina.video}" frameborder="0"
        allowfullscreen></iframe>
        `
        descripVideo.innerHTML = video;
    }

    // Obtén una referencia al botón para mostrar el modal y al modal
    const botonMostrarModal = document.getElementById('mostrarModal');
    const modal = document.getElementById('myModal');

    // Obtén una referencia al botón para cerrar el modal
    const botonCerrarModal = document.getElementById('cerrarModal');

    // Agrega un manejador de eventos para mostrar el modal cuando se hace clic en el botón
    botonMostrarModal.addEventListener('click', () => {
        modal.style.display = 'block'; // Muestra el modal
        document.body.classList.add("modal-open");
    });

    // Agrega un manejador de eventos para cerrar el modal cuando se hace clic en el botón de cerrar
    botonCerrarModal.addEventListener('click', () => {
        modal.style.display = 'none'; // Oculta el modal
        document.body.classList.remove("modal-open");
    });

    // Agrega un manejador de eventos para cerrar el modal cuando se hace clic fuera del modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Oculta el modal si se hace clic fuera de él
        }
    });
}

