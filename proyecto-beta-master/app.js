let impDTFtextil = document.getElementById("impDTF-modal");
let impDTFuv = document.getElementById("maquinaUV-modal");
let impSublimado = document.getElementById("sublimado-modal");
// let laser = document.getElementById("laser-modal");

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
