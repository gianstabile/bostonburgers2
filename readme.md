# Boston Burgers

Proyecto intergrador iniciado para la cátedra de Javascript de Coderhouse.

Se pretende realizar una plataforma sencilla en la que se pueda solicitar y cotizar una hamburguesa personalizada con guarnición, además de conocer los tiempos de demora de la preparación y del delivery.

## Conceptos utilizados:

- Variables _Let_
- Condicionales _If...else_ y _Switch_
- Ciclos _While_
- Funciones y llamado de funciones
- Boostrap
- Métodos y filtros
- Eventos
- Librerías

## Primera entrega

En esta primera entrega se crean funciones para pedir y corroborar los datos del usuario que compra (nombre, teléfono, dirección y barrio).

El HTML ha sido construído con Bootstrap, y por ahora solo tiene la sección de _Inicio_.

#### Añadiendo Arrays y Objetos

Con esta nueva entrega se busca automatizar le proceso de petición de datos y la creación de listas con los usuarios que han pedido productos. Proximamente crearé distintos métodos para elegir las diferentes opciones de productos.

#### Sumando Clases, y métodos MAP y FILTER

En esta entrega se muestra por console.log algunos detalles filtrados de los arrays, como las guarniciones o las burgers sin carne. Además, se calcular el total del pedido, y se muestra cómo se arma la actual burger (ingredientes, aderezos, panes).

## Segunda entrega

En esta versión ya se trabaja con DOM sobre una lista de productos definidos. Se crea un formulario en donde los usuarios registran sus datos para el envío, y pueden ir eligiendo los distintos ingredientes de un listado, y así sumarlo al carrito. Finalmente calcular el costo total del pedido.

#### Boostrap y CSS

Modifiqué la estética del prototipo de tienda usando Boostrap, y trabajando sobre CSS.

#### Eventos

Agregué botones con eventos para sumar el artículo al carrito, y para crear un nuevo usuario a partir de un formulario. Agregué una operación de sumar los productos en vez de duplicarlos al agregarlos al carrito.

#### Optimizando el código

Incorporé operadores ternarios para los condicionales IF, y utilicé el operador lógico OR para reducir y limpiar código. Además, incorporé el método clear para el localstorage, cuando se vacía el carrito de compras.

#### Agregando librerías

Sumé al proyecto la librería Sweet Alert para interactuar con el usuario en los avisos de las acciones que ejecuta sobre la página. Para cada situación sobre el carrito o formulario usé diferentes íconos según el evento, y utilicé la función Toast para avisar cuando se añade un producto nuevo. Además, por consola también se registra cada acción.

#### Buscador o filtro

Incorporé un buscador por palabras, utilizando el evento AddEventListener sobre un input hecho en bootstrap, que se ubica sobre los productos. Al ingresar las primeras letras ya filtra según los nombres de los productos.

#### Método fetch

Reemplacé el array de productos por un archivo de datos .JSON, simulando que traigo un stock de productos externo. Mediante el Fetch, los incorporo a mi lista de productos.

## Entrega final

El proyecto ha tomado forma. He agregado la posibilidad de borrar los ítems individualmente del carrito, además de vaciarlo por completo. Al comprar se redirige a Mercadopago para efectuar el pago. Agregué también, por medio de la librería SweetAlert, un botón de Feedback en la parte superior.
Estoy contento con la funcionalidad y estética lograda. Seguramente hay mucho más por agregar y pulir, pero en las funciones básicas está correctamente andando.



Fecha de finalización del proyecto: 20/07/2022. 