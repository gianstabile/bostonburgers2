const articulos = [
  {
    id: 1,
    categoria: "Burgers",
    nombre: "Carne",
    precio: 670,
    img: "./images/burgercarne.png",
  },
  {
    id: 2,
    categoria: "Burgers",
    nombre: "Carne Premium",
    precio: 840,
    img: "./images/burgerpremium.png",
  },
  {
    id: 3,
    categoria: "Burgers",
    nombre: "Veggie",
    precio: 700,
    img: "./images/burgerveggie.png",
  },
  {
    id: 4,
    categoria: "Burgers",
    nombre: "Pollo",
    precio: 750,
    img: "./images/burgerpollo.png",
  },
  {
    id: 10,
    categoria: "Panes",
    nombre: "Pan convencional",
    precio: 0,
    img: "./images/burger-bread.png",
  },
  {
    id: 11,
    categoria: "Panes",
    nombre: "Pan de campo",
    precio: 0,
    img: "./images/burger-bread.png",
  },
  {
    id: 12,
    categoria: "Panes",
    nombre: "Pan de salvado",
    precio: 0,
    img: "./images/burger-bread2.png",
  },
  {
    id: 13,
    categoria: "Panes",
    nombre: "Pan con semillas",
    precio: 0,
    img: "./images/burger-bread2.png",
  },
  {
    id: 20,
    categoria: "Aderezos",
    nombre: "Mayonesa",
    precio: 0,
    img: "./images/mayonesa.png",
  },
  {
    id: 21,
    categoria: "Aderezos",
    nombre: "Mostaza",
    precio: 0,
    img: "./images/mostaza.png",
  },
  {
    id: 22,
    categoria: "Aderezos",
    nombre: "BBQ",
    precio: 0,
    img: "./images/ketchup.png",
  },
  {
    id: 23,
    categoria: "Aderezos",
    nombre: "Ketchup",
    precio: 0,
    img: "./images/ketchup.png",
  },
  {
    id: 30,
    categoria: "Guarniciones",
    nombre: "Papas fritas",
    precio: 200,
    img: "./images/papasfritas.png",
  },
  {
    id: 31,
    categoria: "Guarniciones",
    nombre: "Papas noisette",
    precio: 250,
    img: "./images/noisettes.png",
  },
  {
    id: 32,
    categoria: "Guarniciones",
    nombre: "Rabas",
    precio: 450,
    img: "./images/rabas.png",
  },
  {
    id: 33,
    categoria: "Guarniciones",
    nombre: "Papas Boston",
    precio: 300,
    img: "./images/papasboston.png",
  },
  {
    id: 34,
    categoria: "Guarniciones",
    nombre: "Papas rejilla",
    precio: 200,
    img: "./images/papasrejilla.png",
  },
  {
    id: 40,
    categoria: "Extras",
    nombre: "Jamón",
    precio: 50,
    img: "./images/jamon.png",
  },
  {
    id: 41,
    categoria: "Extras",
    nombre: "Queso",
    precio: 80,
    img: "./images/queso.png",
  },
  {
    id: 42,
    categoria: "Extras",
    nombre: "Cebolla morada",
    precio: 30,
    img: "./images/cebolla.png",
  },
  {
    id: 43,
    categoria: "Extras",
    nombre: "Lechuga",
    precio: 10,
    img: "./images/jamon.png",
  },
  {
    id: 44,
    categoria: "Extras",
    nombre: "Tomate",
    precio: 10,
    img: "./images/tomate.png",
  },
];

//Constructor de usuario
class Usuario {
  constructor(nombre, tel, dir, barrio) {
    this.nombre = nombre;
    this.tel = parseInt(tel);
    this.dir = dir;
    this.barrio = barrio;
  }
}

// Variables e inicializacion de arrays
let carrito = [];
const divisa = "$";
const itemsHtml = document.getElementById("itemsHtml");
const carritoHtml = document.querySelector("#carritoHtml");
const totalHtml = document.getElementById("totalHtml");
const botonVaciar = document.querySelector("#botonVaciar");

// Funcion para mostrar articulos en HTML
function renderizarItems() {
  articulos.forEach((dato) => {
    //div
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card", "col-sm-4");
    //card
    const itemBody = document.createElement("div");
    itemBody.classList.add("card-body");
    //titulo
    const itemTitle = document.createElement("h5");
    itemTitle.classList.add("card-title");
    itemTitle.textContent = dato.nombre;
    //thumbnail
    const itemImg = document.createElement("img");
    itemImg.classList.add("img-fluid");
    itemImg.setAttribute("src", dato.img);
    //precio
    const itemPrecio = document.createElement("p");
    itemPrecio.classList.add("card-text");
    itemPrecio.textContent = `${divisa}${dato.precio}`;
    //boton
    const itemButton = document.createElement("button");
    itemButton.classList.add("btn", "btn-primary");
    itemButton.textContent = "+";
    //append
    itemBody.append(itemImg, itemTitle, itemPrecio, itemButton);
    itemDiv.appendChild(itemBody);
    itemsHtml.appendChild(itemDiv);
    itemButton.addEventListener("click", () => {
      carrito.push(dato);
      alert("Agregaste " + dato.nombre + " al carrito.");

      carritoHtml.innerHTML = ``;
      renderizarCarrito();
    });
  });
}
console.log(carrito);

// Funcion para renderizar los items en el carrito
function renderizarCarrito() {
  carritoHtml.innerText = " ";
  carrito.forEach((el) => {
    const divCart = document.createElement("div");
    divCart.innerHTML = `
        <div class="card col-sm-4">
        <div class="card-body"> 
        <img class="img-fluid" src="${el.img}">
        <h5 class="card-title">${el.nombre}</h5>
        <p class="card-text">$${el.precio}</p>
        <button id="botonBorrar" class="btn btn-danger eliminarItem" data-id=${el.id}>x</button>
        </div></div>
    `;
    carritoHtml.append(divCart);
  });
}

//Vaciar item del carrito

//funcion para borrar un item del carrito
function borrarItemCarrito(el) {
  const id = el.target.getAttribute("data-id");
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  renderizarCarrito();
}

//funcion para calcular el total
// function calcularTotal() {
//   return carrito
//     .reduce((total, item) => {
//       const miItem = articulos.filter((itemarticulos) => {
//         return itemarticulos.id === parseInt(item);
//       });
//       return total + miItem[0].precio;
//     }, 0)
//     .toFixed(2);
// }

//funcion para vaciar el carrito totalmente
function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

//eventos
// botonVaciar.addEventListener("click", vaciarCarrito);

//inicializar
renderizarItems();
renderizarCarrito();

//Inicializar una lista de usuarios
const listaUsuarios = [];
//Inicializar lista de articulos
const listaProducts = [];

//Capturar boton submit
let botonSiguiente = document.getElementById("formulario");
botonSiguiente.addEventListener("submit", (event) => {
  event.preventDefault();
  let nombreUsuario = document.getElementById("nombreUsuario").value;
  let telUsuario = document.getElementById("telUsuario").value;
  if (telUsuario.length <= 9) {
    alert("Recuerde poner su número de teléfono sin el 0 y el 15.");
    return false;
  }
  let dirUsuario = document.getElementById("dirUsuario").value;
  let barrio = document.querySelector('input[name="envio"]:checked').value;
  let usuario1 = new Usuario(nombreUsuario, telUsuario, dirUsuario, barrio);
  listaUsuarios.push(usuario1);
  console.log(listaUsuarios);
});
