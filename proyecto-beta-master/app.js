/***SLIDERRRRRRRRRRRRRRRRRRRRRRRRRRR************************************RRRRRRRRRRRRRRR******************* */
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;

if (next && prev) {
    next.onclick = function(){
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }
    
    prev.onclick = function(){
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }
  
    let refreshInterval = setInterval(() => {
        if (next) {
            next.click();
        }
    }, 3000);
}

let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000); 
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

/*********************************************************************************/


let impDTFtextil = document.getElementById("impDTF-modal");
let impDTFuv = document.getElementById("maquinaUV-modal");
let impSublimado = document.getElementById("sublimado-modal");
let laser = document.getElementById("laser-modal");

let impMachine = document.getElementById("imp-machine");
let tituloBanner = document.getElementById("titulo-banner");

const URL_BBDD = "./bbdd.json";

let cont = 0;
let maquinasJSON; 

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
    .then( (data) =>{   
        let dataDTFtextil = data.articulos.maquinas.DTF_TEXTIL;
        let dataDTFuv = data.articulos.maquinas.UV_DTF;
        let dataSublimado = data.articulos.maquinas.IMPRESORA_SUBLIMADO;
        let datalaser = data.articulos.maquinas.LASER;

        RecorrerImpresoras(dataDTFtextil, 1); ///numero 1 es para los navbar
        RecorrerImpresoras(dataDTFuv, 1);
        RecorrerImpresoras(dataSublimado, 1);
        RecorrerImpresoras(datalaser, 1);

        if (window.location.href.includes("index.html")) {
            RecorrerImpresoras(data.articulos.maquinas.DTG[0],2); ///numero 2 es lo mismo pero con botones y la serie EPSON 
            RecorrerImpresoras(data.articulos.maquinas.LASER[2],2);
            RecorrerImpresoras(data.articulos.maquinas.LASER[0],2); 
            RecorrerImpresoras(data.articulos.maquinas.UV_DTF[2],2);
            RecorrerImpresoras(data.articulos.maquinas.UV_DTF[3],2);  
        }
        
    })
    .catch( (error)=>{
        console.error("Ocurrió un error:", error);
})


function RecorrerImpresoras(datas, tipo){
    if (Array.isArray(datas)){

        datas.forEach( item => {
            CreateCard(item, tipo);
        });

        cont = cont + 1;
    }else{
        CreateCard(datas, tipo);
    }
}



function CreateCard(item, tipo){
    // mejora la condicion
    console.log(tipo);
    if (tipo == 1){
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
    else if (tipo == 2) {

        let contenedor = document.createElement("div");
        contenedor.className = "card-content-machine";

        let imgDIV = document.createElement("div");
        imgDIV.className = "card-content-img";
        
        let contentDIV = document.createElement("div");
        contentDIV.className = "card-content-text";

        let img = `
            <img src="${item.imagen}" alt="">
        `;
        imgDIV.innerHTML = img;

        let content = `
            <h2>${item.serie}</h2>
            <p>${item.modelo}</p>
            <h3>${item.nombre}</h3>
            <button>Ver video</button>
        `;
        contentDIV.innerHTML = content; // Usa textContent en lugar de innerHTML

        // Agregar los divs de img y content como hijos de contenedor
        contenedor.appendChild(imgDIV);
        contenedor.appendChild(contentDIV);

        impMachine.appendChild(contenedor);
    }
    else if (tipo == 3) {

        let contenedor = document.createElement("div");
        contenedor.className = "card-content-machine";

        let imgDIV = document.createElement("div");
        imgDIV.className = "card-content-img";
        
        let contentDIV = document.createElement("div");
        contentDIV.className = "card-content-text";

        let img = `
            <img src="${item.imagen}" alt="">
        `;
        imgDIV.innerHTML = img;

        let content = `
            <h2>${item.nombre}</h2>
            <h3>${item.modelo}</h3>
            <p>${item.descripcion}</p>
            <button>Mas información ></button>  
        `;
        contentDIV.innerHTML = content; // Usa textContent en lugar de innerHTML

        // Agregar los divs de img y content como hijos de contenedor
        contenedor.appendChild(imgDIV);
        contenedor.appendChild(contentDIV);

        impMachine.appendChild(contenedor);
    }
}



function capturarId(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace

    // Obtener el data-id del enlace
    const enlace = event.currentTarget;
    const id = enlace.getAttribute("data-id");
    console.log(id);

    if (id !== "nosotros" && id !== "index") {
        // Redirigir a la página "maquinas.html" y pasar el ID como parámetro en la URL
        window.location.href = `maquinas.html?id=${id}`;
    } else if (id === "nosotros") {
        window.location.href = "nosotros.html";
    } else if (id === "index") {
        window.location.href = "index.html";
    }
}

// Agregar un evento click a cada enlace de la barra de navegación
const enlaces = document.querySelectorAll(".nav-links a");
enlaces.forEach((enlace) => {
    enlace.addEventListener("click", capturarId);
});

const enlacesCategoria = document.querySelectorAll(".contenedor-cartas a");
enlacesCategoria.forEach((enlace) => {
    enlace.addEventListener("click", capturarId);
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
tituloBanner.innerHTML = id;

if(id){
    conexion(URL_BBDD)
        .then( (data) =>{
            const maquinas = data.articulos.maquinas[id];
            RecorrerImpresoras(maquinas, 3);
        })

}else{
    // Aquí puedes manejar el caso en el que no haya un ID en los parámetros de la URL
    console.error("No se encontró un ID en los parámetros de la URL.");
}





// const divOcultar = document.getElementById("imp-machine");

// // Recorre todos los elementos con la clase "ocultar"
// clickOcultar.forEach(enlace => {
    //   // Agrega un manejador de eventos a cada elemento
    //   enlace.addEventListener("click", function(event) {
        //     event.preventDefault();
        //     divOcultar.style.display = "none";
        //   });
        // });
        
        
        
        
        
        // Captura todos los enlaces con la clase "ocultar"
        
const clickOcultar = document.querySelectorAll(".ocultar");

// Agrega un manejador de eventos para cada enlace
clickOcultar.forEach((enlace) => {
  enlace.addEventListener("click", function (event) {
    event.preventDefault(); // Previene la acción predeterminada del enlace

    // Obtiene el ID del enlace clickeado
    const idEnlace = this.getAttribute("id");
    console.log("/***********************/", idEnlace);

    // Realiza una búsqueda en los datos JSON utilizando idCategoria e idEnlace
    let maquinaEncontrada = null;

    if (maquinasJSON) {

      for (const categoria in maquinasJSON.articulos.maquinas) {
        maquinaEncontrada = maquinasJSON.articulos.maquinas[categoria].find(
          (maquina) => maquina.id.toString() === idEnlace
        );
        if (maquinaEncontrada) {
          break;
        }
      }
    }

    // Aquí puedes hacer lo que quieras con la máquina encontrada
    if (maquinaEncontrada) {
        // Por ejemplo, aquí puedes mostrar la información en un modal o en algún otro lugar en tu página
        console.log("Máquina encontrada:", maquinaEncontrada);
        CreateCard(maquinaEncontrada);
         // Luego, puedes usar maquinaEncontrada para mostrar la información en el lugar deseado en tu página.
    } else {
        console.log("Máquina no encontrada");
    }
  });
});


// const mySwiper = new Swiper('.swiper-container', {
//     slidesPerView: 3,
//     loop: true,
//     spaceBetween: 20,
//     autoplay: {
//         delay: 5000 // Cambiar cada 5 segundos
//     },
//     on: {
//         slideChange: function () {
//             // Detener la reproducción de videos al cambiar de diapositiva
//             const videos = document.querySelectorAll('.swiper-slide video');
//             videos.forEach(video => {
//                 video.pause();
//             });
//         }
//     }
// });







// const menuItems = document.querySelectorAll('.index__contain');
// menuItems.forEach((menuItem) => {
//     const popup = menuItem.querySelector('.card-content-machine');
//     menuItem.addEventListener('mouseenter', () => {
//     popup.style.display = 'block';
//     });
//     menuItem.addEventListener('mouseleave', () => {
//     popup.style.display = 'none';
//     });
// });

/********************************************* */




function limpiarContenedor() {
    const impMachine = document.getElementById("imp-machine");
    while (impMachine.firstChild) {
        impMachine.removeChild(impMachine.firstChild);
    }
}
// Obtén una referencia a la lista de categorías
const categoryList = document.querySelector(".container-principal");

// Agrega un evento de clic a la lista de categorías
categoryList.addEventListener("click", (event) => {
    // Comprueba si se hizo clic en un elemento <a> dentro de un <li>
    if (event.target.tagName === "A") {
        event.preventDefault(); // Evita la navegación predeterminada del enlace
        // Obtén el ID de la categoría seleccionada
        const categoryId = event.target.parentElement.id;
        tituloBanner.innerHTML = categoryId;
        loadMachinesByCategory(categoryId);
    }
});

function loadMachinesByCategory(categoryId) {
    limpiarContenedor();
    
    conexion(URL_BBDD)
        .then((data) => {
            let categoria = data.articulos.maquinas[categoryId];
            console.log(categoria);
            RecorrerImpresoras(categoria, 3);
        })
        .catch((error) => {
            console.error("Error al cargar las máquinas:", error);
        });
}