let impDTFtextil = document.getElementById("impDTF-modal");
let impDTFuv = document.getElementById("maquinaUV-modal");
let impSublimado = document.getElementById("sublimado-modal");
// let laser = document.getElementById("laser-modal");

/***SLIDERRRRRRRRRRRRRRRRRRRRRRRRRRR************************************RRRRRRRRRRRRRRR******************* */
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
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


/********************************************************************************* */

const URL_BBDD = "./bbdd.json";

let impresoras = ["impDTFtextil", "impDTFuv", "impSublimado"]

let cont = 0;

fetch(URL_BBDD)
    .then( (response) => response.json())    
    .then( (data) =>{
        let impDTFtextil = data.articulos.maquinas.DTF_TEXTIL;
        let impDTFuv = data.articulos.maquinas.DTF_UV;
        let impSublimado = data.articulos.maquinas.IMPRESORA_SUBLIMADO;
        // let laser = data.articulos.maquinas.IMPRESORA_SUBLIMADO;
        RecorrerImpresoras(impDTFtextil);
        RecorrerImpresoras(impDTFuv);
        RecorrerImpresoras(impSublimado);
        // RecorrerImpresoras(impDTFtextil);
        
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
        <p>${item.descripcion}</p>
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


document.addEventListener('DOMContentLoaded', function () {
    let mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 3, // Muestra 3 videos a la vez
        spaceBetween: 10, // Espacio entre los videos
        loop: true, // Crea un bucle de desplazamiento
        autoplay: {
            delay: 3000, // Cambia los videos cada 3 segundos
            disableOnInteraction: false, // Permite que el autoplay continúe después de la interacción del usuario
        },
    });
});





/*modo oscuro y claro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
})*/
