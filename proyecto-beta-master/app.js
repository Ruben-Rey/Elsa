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


/********************************************************************************* */
let impDTFtextil = document.getElementById("impDTF-modal");
let impDTFuv = document.getElementById("maquinaUV-modal");
let impSublimado = document.getElementById("sublimado-modal");
let laser = document.getElementById("laser-modal");


const URL_BBDD = "./bbdd.json";

let cont = 0;

fetch(URL_BBDD)
    .then( (response) => response.json())    
    .then( (data) =>{
        let impDTFtextil = data.articulos.maquinas.DTF_TEXTIL;
        let impDTFuv = data.articulos.maquinas.UV_DTF;
        let impSublimado = data.articulos.maquinas.IMPRESORA_SUBLIMADO;
        let laser = data.articulos.maquinas.LASER;

        RecorrerImpresoras(impDTFtextil);
        RecorrerImpresoras(impDTFuv);
        RecorrerImpresoras(impSublimado);
        RecorrerImpresoras(laser);
    });

function RecorrerImpresoras(data){
    data.forEach( item => {
        CreateCard(item);

    });

    cont = cont + 1;
}

function CreateCard(item){
    let div = document.createElement("div");
    div.className = "card-content";

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
    }  
}

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach((menuItem) => {
  const popup = menuItem.querySelector('.machine-modal');
  
  menuItem.addEventListener('mouseenter', () => {
    popup.style.display = 'block';
  });
  
  menuItem.addEventListener('mouseleave', () => {
    popup.style.display = 'none';
  });
});

/********************************************* */
let impDTFmachine = document.getElementById("impDTF-machine");

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
        <p>${item.descripcion}</p>
    `;
    contentDIV.innerHTML= content; // Usa textContent en lugar de innerHTML

    // Agregar los divs de img y content como hijos de contenedor
    contenedor.appendChild(imgDIV);
    contenedor.appendChild(contentDIV);

    impDTFmachine.appendChild(contenedor);
}




// Función para capturar el data-id y realizar acciones
    // Realizar alguna acción con el id (por ejemplo, consumir un JSON)
    
    fetch(URL_BBDD)
    .then( (response) => response.json())    
    .then( (data) =>{
        let impDTFtextil = data.articulos.maquinas.DTF_TEXTIL;
        console.log(impDTFtextil);
        RecorrerMaquinas(impDTFtextil);
    });

function RecorrerMaquinas(data){
    data.forEach( item => {
        CreateCardMachine(item);
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

/*video de sobre nosotros
function playVideo() {
    var video = document.getElementById("video");
    video.play();
    video.muted = true;
}*/




/*modo oscuro y claro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
})*/
