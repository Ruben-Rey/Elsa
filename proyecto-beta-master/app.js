/***SLIDERRRRRRRRRRRRRRRRRRRRRRRRRRR************************************RRRRRRRRRRRRRRR******************* */
// let slider = document.querySelector('.slider .list');
// let items = document.querySelectorAll('.slider .list .item');
// let next = document.getElementById('next');
// let prev = document.getElementById('prev');
// let dots = document.querySelectorAll('.slider .dots li');

// let lengthItems = items.length - 1;
// let active = 0;
// next.onclick = function(){
//     active = active + 1 <= lengthItems ? active + 1 : 0;
//     reloadSlider();
// }
// prev.onclick = function(){
//     active = active - 1 >= 0 ? active - 1 : lengthItems;
//     reloadSlider();
// }
// let refreshInterval = setInterval(()=> {next.click()}, 3000);
// function reloadSlider(){
//     slider.style.left = -items[active].offsetLeft + 'px';
//     // 
//     let last_active_dot = document.querySelector('.slider .dots li.active');
//     last_active_dot.classList.remove('active');
//     dots[active].classList.add('active');

//     clearInterval(refreshInterval);
//     refreshInterval = setInterval(()=> {next.click()}, 3000); 
// }

// dots.forEach((li, key) => {
//     li.addEventListener('click', ()=>{
//          active = key;
//          reloadSlider();
//     })
// })
// window.onresize = function(event) {
//     reloadSlider();
// };


/*********************************************************************************/
let impDTFtextil = document.getElementById("impDTF-modal");
// let impDTFuv = document.getElementById("maquinaUV-modal");
// let impSublimado = document.getElementById("sublimado-modal");
// let laser = document.getElementById("laser-modal");

const URL_BBDD = "./bbdd.json";

let cont = 0;

fetch(URL_BBDD)
    .then( (response) => response.json())    
    .then( (data) =>{
        let impDTFtextil = data.articulos.maquinas.DTF_TEXTIL;
        // let impDTFuv = data.articulos.maquinas.UV_DTF;
        // let impSublimado = data.articulos.maquinas.IMPRESORA_SUBLIMADO;
        // let laser = data.articulos.maquinas.LASER;

        RecorrerImpresoras(impDTFtextil);
        // RecorrerImpresoras(impDTFuv);
        // RecorrerImpresoras(impSublimado);
        // RecorrerImpresoras(laser);

        if (window.location.href.includes("index.html")) {
            RecorrerMaquinas(data.articulos.maquinas.DTG[0]);
            RecorrerMaquinas(data.articulos.maquinas.LASER[2]);
            RecorrerMaquinas(data.articulos.maquinas.LASER[0]); 
            RecorrerMaquinas(data.articulos.maquinas.UV_DTF[2]);
            RecorrerMaquinas(data.articulos.maquinas.UV_DTF[3])  
        }

    });

function RecorrerImpresoras(datas){

      datas.forEach( item => {
        CreateCard(item);
    });
    cont = cont + 1;
}

function CreateCard(item){
    let div = document.createElement("div");
    div.className = "contenedor";

    let content = `
        <img src="${item.imagen}" alt="">
        <h2>${item.nombre}</h2>
    `;

    div.innerHTML= content;
    impDTFtextil.appendChild(div);
    /*switch(cont){
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
    }  */
}
const menuItems = document.querySelectorAll('.index__contain');
menuItems.forEach((menuItem) => {
    const popup = menuItem.querySelector('.card-content-machine');
    menuItem.addEventListener('mouseenter', () => {
    popup.style.display = 'block';
    });
    menuItem.addEventListener('mouseleave', () => {
    popup.style.display = 'none';
    });
});

/********************************************* */

let impDTFmachine = document.getElementById("impDTF-machine");
let tituloBanner = document.getElementById("titulo-banner");

function RecorrerMaquinas(data){
    if (Array.isArray(data)){
        data.forEach( item => {
            CreateCardMachine(item);
        });
    }else{
        CreateCardMachine(data);
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
    
    fetch(URL_BBDD)
    .then((response) => response.json())
    .then((data) => {
        // Aquí, puedes utilizar el ID para obtener la información específica del JSON
        const maquina = data.articulos.maquinas[id];
    
        RecorrerMaquinas(maquina);
    
        // Luego, puedes mostrar la información en la página "maquinas.html"
    });
}else{
    // Aquí puedes manejar el caso en el que no haya un ID en los parámetros de la URL
    console.error("No se encontró un ID en los parámetros de la URL.");
}

function CreateCardMachine(item){
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
        <p>${item.modelo}</p>
    `;
    contentDIV.innerHTML = content; // Usa textContent en lugar de innerHTML

    // Agregar los divs de img y content como hijos de contenedor
    contenedor.appendChild(imgDIV);
    contenedor.appendChild(contentDIV);

    impDTFmachine.appendChild(contenedor);
}



function limpiarContenedor() {
    const impDTFmachine = document.getElementById("impDTF-machine");
    while (impDTFmachine.firstChild) {
        impDTFmachine.removeChild(impDTFmachine.firstChild);
    }
}
// Obtén una referencia a la lista de categorías
const categoryList = document.querySelector(".container-principal");

// Agrega un evento de clic a la lista de categorías
categoryList.addEventListener("click", (event) => {
    // Comprueba si se hizo clic en un elemento <li> (categoría)
    if (event.target.tagName === "LI") {
        // Obtén el ID de la categoría seleccionada
        const categoryId = event.target.id;
        tituloBanner.innerHTML = categoryId; 
        loadMachinesByCategory(categoryId);
    }
});
/*//*************************************************************************************************************************** */

function loadMachinesByCategory(categoryId) {
    limpiarContenedor();
    fetch(URL_BBDD)
    .then((response) => response.json())
    .then((data) => {
        let categoria = data.articulos.maquinas[categoryId];
        RecorrerMaquinas(categoria);
    })
    .catch((error) => {
            console.error("Error al cargar las máquinas:", error);
        });
}


const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 5000 // Cambiar cada 5 segundos
    },
    on: {
        slideChange: function () {
            // Detener la reproducción de videos al cambiar de diapositiva
            const videos = document.querySelectorAll('.swiper-slide video');
            videos.forEach(video => {
                video.pause();
            });
        }
    }
});