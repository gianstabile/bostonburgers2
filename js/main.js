//Constructor de usuario
class Usuario {
  constructor(nombre, tel, dir, barrio) {
    this.nombre = nombre;
    this.tel = parseInt(tel);
    this.dir = dir;
    this.barrio = barrio;
  }
}

// VARIABLES
// Variables e inicializacion de arrays
let carrito = [];
const itemsHtml = document.getElementById("itemsHtml");
const carritoHtml = document.querySelector("#carritoHtml");
const infoCarrito = document.getElementById("infoCarrito");
const filaProducto = document.getElementById("filaProducto");
const totalHtml = document.querySelector("#totalHtml .valorTotal");
const botonAgregar = document.getElementsByClassName("botonAgregar");
const botonEliminar = document.getElementById("eliminarItem");
const botonVaciar = document.querySelector("#botonVaciar");
const botonSiguiente = document.getElementById("formulario");

// JSON
if (JSON.parse(localStorage.getItem("carrito"))) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify([]));
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

// FUNCIONES
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
    itemPrecio.textContent = `$${dato.precio}`;
    //boton
    const itemButton = document.createElement("button");
    itemButton.setAttribute("id", dato.id);
    itemButton.classList.add("btn", "btn-primary", "botonAgregar");
    itemButton.textContent = "+";
    //append
    itemBody.append(itemImg, itemTitle, itemPrecio, itemButton);
    itemButton.addEventListener("click", agregarAlCarrito);
    itemDiv.appendChild(itemBody);
    itemsHtml.appendChild(itemDiv);
  });
}

// Funcion para agregar un item al carrito
function agregarAlCarrito(e) {
  const btn = e.target;
  const idBtn = btn.getAttribute("id");
  const sinDuplicados = articulos.find((prod) => prod.id == idBtn);
  const enCarrito = carrito.find((prod) => prod.id == sinDuplicados.id);
  if (!enCarrito) {
    carrito.push({ ...sinDuplicados, cantidad: 1 });
  } else {
    let carritoFiltrado = carrito.filter((prod) => prod.id != enCarrito.id);
    carrito = [
      ...carritoFiltrado,
      { ...enCarrito, cantidad: enCarrito.cantidad + 1 },
    ];
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log("Se agregó " + sinDuplicados.nombre + " al carrito.");
  console.log(carrito);
  renderizarCarrito();
}

// Funcion para renderizar los items en el carrito
function renderizarCarrito() {
  infoCarrito.innerText = "";
  filaProducto.innerText = "";
  if (carrito.length == 0) {
    const clearCart = `<div><p class="cartTable_txt">No hay productos en su carrito. </p></div>`;
    carritoHtml.innerHTML = clearCart;
  } else {
    const addCart = `<div><p class"cartTable_txt">Estos son los productos que ha agregado hasta el momento:</p></div>`;
    carritoHtml.innerHTML = addCart;
  }

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const { id, nombre, img, precio, cantidad } = item;
    //creo los elementos de la tabla
    const firstTr = document.createElement("tr");
    const firstTd = document.createElement("td");
    const imgTd = document.createElement("img");
    imgTd.classList.add("eliminarItem");
    imgTd.setAttribute("src", img);
    imgTd.classList.add("imgTable");
    const titleTd = document.createElement("td");
    titleTd.textContent = nombre;
    const qTd = document.createElement("td");
    qTd.textContent = "x " + cantidad;
    const priceTd = document.createElement("td");
    priceTd.textContent = (cantidad * precio).toFixed(2);
    const btnTd = document.createElement("td");
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger", "eliminarItem");
    btnDelete.setAttribute("id", id);
    btnDelete.textContent = "x";
    // agrego todo a la tabla
    firstTd.append(imgTd);
    btnTd.append(btnDelete);
    firstTr.append(firstTd, titleTd, qTd, priceTd, btnTd);
    // evento del boton borrar item
    btnDelete.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target;
      const idBtn = btn.getAttribute("id");
      const quitCarrito = carrito.filter((item) => {
        return item.id != idBtn;
      });
      const enCarrito = carrito.find((item) => item.id == idBtn);
      if (enCarrito.cantidad <= 1) {
        carrito.shift(enCarrito);
      } else {
        let carritoNew = carrito.filter((item) => item.id != idBtn);
        carrito = [
          ...carritoNew,
          { ...enCarrito, cantidad: enCarrito.cantidad - 1 },
        ];
      }
      console.log("Se eliminó " + nombre + " del carrito");
      console.log(carrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    });
    // agrego toda la estructura a html
    filaProducto.append(firstTr);
  }
  totalHtml.textContent = "$" + calcularTotal();
}

// Funcion para vaciar el carrito totalmente
function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
  console.log(carrito);
}

// Funcion para calcular el total del carrito
const calcularTotal = () => {
  return carrito
    .reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
    .toFixed(2);
};

// EVENTOS
// Boton Vaciar carrito
botonVaciar.addEventListener("click", vaciarCarrito);
// Boton submit del formulario
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

// INICIALIZAR
// Mostrar productos
renderizarItems();
// Mostrar carrito
renderizarCarrito();

//Inicializar una lista de usuarios
const listaUsuarios = [];
//Inicializar lista de articulos
const listaProducts = [];
