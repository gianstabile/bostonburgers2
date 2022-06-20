//Constructor de usuario
class Usuario {
  constructor(nombre, tel, dir, barrio) {
    this.nombre = nombre;
    this.tel = parseInt(tel);
    this.dir = dir;
    this.barrio = barrio;
  }
}

// Constructor de Burgers
class Burger {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = parseInt(precio);
  }
}

// Lista de productos
class Productos {
  constructor() {
    this.lista = [];
  }
  agregarProductos(item) {
    this.lista.push(item);
  }
  mostrarProductos() {
    let listaProductos = document.getElementById("grillaProductos");
    for (let index = 0; index < this.lista.length; index++) {
      const producto = this.lista[index];
      const item = document.createElement("div");
      item.className = "productos";
      item.innerHTML = `
        <div class="nombre">${producto.nombre}</div>
        <div class="precio">${"$" + producto.precio}</div>`;
      const botonSumar = document.createElement("button");
      botonSumar.textContent = "+";
      botonSumar.className = "botonSumar";
      item.append(botonSumar);
      listaProductos.append(item);

      botonSumar.addEventListener("click", function () {
        comboUsuario.push(producto);
        let carrito = document.getElementById("listArticulos");
        const articulo = document.createElement("div");
        articulo.className = "productos";
        articulo.innerHTML += `
        <div class="nombre">${producto.nombre}</div>
        <div class="precio">${"$" + producto.precio}</div>`;
        alert("Elegiste " + producto.nombre + " al combo.");
        carrito.append(articulo);
        console.log(comboUsuario);
      });
    }
  }
}

//Inicializo una lista de usuarios
const listaUsuarios = [];
//Inicializo una lista de productos añadidos
const comboUsuario = [];

// Variables y constantes de productos
const burgers = new Productos();

//Burgers instanseadas
const burger1 = new Burger("Carne", 680);
const burger2 = new Burger("Carne Premium", 850);
const burger3 = new Burger("Veggie", 640);
const burger4 = new Burger("Vegan", 700);
const burger5 = new Burger("Pollo", 650);

//Agrego los productos a la lista
burgers.agregarProductos(burger1);
burgers.agregarProductos(burger2);
burgers.agregarProductos(burger3);
burgers.agregarProductos(burger4);
burgers.agregarProductos(burger5);
console.log(burgers);

// Mostrar los productos en el HTML
burgers.mostrarProductos();

//Capturo boton submit
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
