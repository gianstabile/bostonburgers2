//Constructor de usuario
class Usuario {
  constructor(nombre, tel, dir, barrio) {
    this.nombre = nombre;
    this.tel = parseInt(tel);
    this.dir = dir;
    this.barrio = barrio;
  }
}

class Pedido {
  constructor(usuario, productos, direccion, total) {
    this.usuario = usuario;
    this.productos = productos;
    this.direccion = direccion;
    this.total = total;
  }
}

// VARIABLES
// Variables e inicializacion de arrays
let carrito = [];
let usuario = {};
let pedido = {};
let articulos = [];
let listaUsuarios = [];
const itemsHtml = document.getElementById("itemsHtml");
const carritoHtml = document.querySelector("#carritoHtml");
const infoCarrito = document.getElementById("infoCarrito");
const filaProducto = document.getElementById("filaProducto");
const totalHtml = document.querySelector("#totalHtml .valorTotal");
const botonAgregar = document.getElementsByClassName("botonAgregar");
const botonEliminar = document.getElementById("eliminarItem");
const botonVaciar = document.querySelector("#botonVaciar");
const botonComprar = document.getElementById("botonComprar");
const botonSiguiente = document.getElementById("formulario");
let buscador = document.getElementById("buscador").value;

// LOCALSTORAGE (OPERADOR LÓGICO OR)
carrito = JSON.parse(localStorage.getItem("carrito")) || [];
usuario = JSON.parse(sessionStorage.getItem("usuario")) || {};
console.log(usuario);

// FETCH de los productos
fetch("./js/productos.json")
  .then((data) => data.json())
  .then((data) => {
    articulos = data;
    renderizarItems(articulos);
    console.log("Artículos en el carrito:");
    console.log(carrito);
  });

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
  // OPERADOR TERNARIO
  if (!enCarrito) {
    carrito.push({ ...sinDuplicados, cantidad: 1 });
  } else {
    let carritoFiltrado = carrito.filter((prod) => prod.id != enCarrito.id);
    carrito = [
      ...carritoFiltrado,
      { ...enCarrito, cantidad: enCarrito.cantidad + 1 },
    ];
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1200,
  });
  Toast.fire({
    icon: "success",
    title: "Se añadió el producto.",
  });
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
        carrito = carrito.filter((item) => item.id != idBtn);
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
  localStorage.clear();
  renderizarCarrito();
  Swal.fire({
    title: "Carrito vacío",
    icon: "success",
    text: "Has vaciado todo el carrito de compras.",
    confirmButtonText: "Aceptar",
    backdrop: `rgba(0, 0, 0, 0.5)`,
  });
  console.log(carrito);
}

function renderizarPedido() {
  Swal.fire({
    title: "Felicitaciones " + usuario.nombre + "!",
    icon: "success",
    text: "Se realizó tu pedido correctamente. Ahora te redirigiremos a la página de pagos.",
    backdrop: `rgba(0, 0, 0, 0.5)`,
    timer: 6000,
    timerProgressBar: true,
    confirmButtonText: "Aceptar",
    allowOutsideClick: true,
    willClose: () => {
      window.location.href = "https://www.mercadopago.com.ar/";
    },
  });
}

// Funcion para calcular el total del carrito
const calcularTotal = () => {
  return carrito
    .reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
    .toFixed(2);
};

// EVENTOS
// Boton submit del formulario
botonSiguiente.addEventListener("submit", (event) => {
  event.preventDefault();
  let nombre = document.getElementById("nombreUsuario").value;
  let tel = document.getElementById("telUsuario").value;
  let dir = document.getElementById("dirUsuario").value;
  let barrio = document.querySelector('input[name="envio"]:checked').value;
  let usuario = new Usuario(nombre, tel, dir, barrio);
  // Validar si existe un usuario
  if (listaUsuarios.length >= 1) {
    usuario = JSON.parse(sessionStorage.getItem("usuario"));
    console.log(usuario);
    Swal.fire({
      title: "Espera tu turno",
      icon: "info",
      text: "Espera por favor que " + usuario.nombre + " termine su compra.",
      confirmButtonText: "Aceptar",
      backdrop: `rgba(0, 0, 0, 0.5)`,
    });
  } else {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    listaUsuarios.push(usuario);
    Swal.fire({
      title: "Usuario añadido",
      icon: "success",
      text: "Se agregaron tus datos correctamente.",
      confirmButtonText: "Aceptar",
      backdrop: `rgba(0, 0, 0, 0.5)`,
    });
  }
  console.log(usuario);

  // OPERADOR AND
  if (telUsuario.length <= 9) {
    Swal.fire({
      title: "Comprobar datos",
      icon: "warning",
      text: "Recuerde poner su número de teléfono sin el 0 y el 15.",
      confirmButtonText: "Aceptar",
      backdrop: `rgba(0, 0, 0, 0.5)`,
    });
    return false;
  }
  botonSiguiente.reset();
});
// Boton Vaciar carrito
botonVaciar.addEventListener("click", vaciarCarrito);
// Boton Comprar pedido - Se agregó una validación para panes y hamburguesas
botonComprar.addEventListener("click", function () {
  // OPERADOR TERNARIO
  usuario != undefined &&
  carrito.length != 0 &&
  carrito.some((item) => item.categoria == "Burgers") &&
  carrito.some((item) => item.categoria == "Panes")
    ? (renderizarPedido(),
      console.log(
        "Felicitaciones " +
          usuario.nombre +
          "! Se realizó tu pedido correctamente."
      ),
      // creación de un pedido para el usuario
      (pedido = new Pedido(
        usuario.nombre,
        carrito,
        usuario.dir,
        calcularTotal()
      )))
    : (Swal.fire({
        title: "Error",
        icon: "error",
        text: "Debes completar el formulario o agregar sí o sí una hamburguesa y algún pan para continuar.",
        confirmButtonText: "Aceptar",
        backdrop: `rgba(0, 0, 0, 0.5)`,
      }),
      console.log(
        "Hubo un error. Debes completar el formulario o agregar algún producto al carrito para continuar."
      ));
  localStorage.clear(), sessionStorage.clear();
  usuario = {};
  console.log(pedido);
});
// Buscador o filtro
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    e.target.value = "";
  }
  if (e.target.matches("#buscador")) {
    console.log(e.key);
    document.querySelectorAll(".card").forEach((producto) => {
      producto.textContent.toLowerCase().includes(e.target.value)
        ? producto.classList.remove("filtro")
        : producto.classList.add("filtro");
    });
  }
});

// INICIALIZAR
// Mostrar productos
renderizarItems();
// Mostrar carrito
renderizarCarrito();
