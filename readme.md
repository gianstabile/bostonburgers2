# Boston Burgers
Proyecto intergrador iniciado para la cátedra de Javascript de Coderhouse.

Se pretende realizar una plataforma sencilla en la que se pueda solicitar y cotizar una hamburguesa personalizada con guarnición, además de conocer los tiempos de demora de la preparación y del delivery.


## Conceptos utilizados:
+ Variables *Let*
+ Condicionales *If...else* y *Switch*
+ Ciclos *While*
+ Funciones y llamado de funciones


## Primera entrega
En esta primera entrega se crean funciones para pedir y corroborar los datos del usuario que compra (nombre, teléfono, dirección y barrio). 

El HTML ha sido construído con Bootstrap, y por ahora solo tiene la sección de *Inicio*.

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