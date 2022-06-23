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
      carritoHtml.innerHTML = ``;
      carrito.push(dato);
      console.log("Agregaste " + dato.nombre + " al carrito.");
      renderizarCarrito();
    });
  });
}

// Funcion para renderizar los items en el carrito
function renderizarCarrito() {
  carritoHtml.innerText = " ";
  const sinDuplicados = [...new Set(carrito)];
  sinDuplicados.forEach((el) => {
    const itemArticulo = articulos.filter((valor) => {
      return valor.id === el;
    });
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === el ? (total += 1) : total;
    }, 0);
    const valorTotalporItem = carrito
      .map((el) => el.precio)
      .reduce((cantidad, precio) => {
        return cantidad + precio;
      });
    const divCart = document.createElement("div");
    divCart.innerHTML = `
        <div class="card col-sm-4">
        <div class="card-body"> 
        <img class="img-fluid" src="${el.img}">
        <h5 class="card-title">${el.nombre} x ${numeroUnidadesItem}</h5>
        <p class="card-text">$${el.precio}</p>
        <button id="botonBorrar" class="btn btn-danger eliminarItem" data-id=${el.id}>x</button>
        </div></div>
    `;
    carritoHtml.append(divCart);
  });
  // totalHtml.textContent=calcularTotal();
}
console.log(carrito);

//Vaciar item del carrito
//funcion para borrar un item del carrito
// function borrarItemCarrito(item) {
//   carrito = carrito.filter((valor) => {
//     return valor.id !== item.id;
//   });
//   renderizarCarrito();
// }

//funcion para calcular el total
// function calcularTotal() {
//   return carrito.reduce((total, item) => {
//     const miItem = articulos.filter((el) => {return el.id === parseInt(item)});
//       return total + miItem.precio;
//     }, 0);
// }

//funcion para vaciar el carrito totalmente
function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

//eventos
botonVaciar.addEventListener("click", vaciarCarrito);

//inicializar
renderizarItems();
renderizarCarrito();
console.log(carrito)

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
