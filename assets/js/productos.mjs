// Definición de la clase Producto
class Producto {
    constructor(nombre, precio, cantidad = 1) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// Función para obtener productos de la API
const API_URL = 'https://world.openfoodfacts.org/api/v0/search.json?search_terms=snack&json=true';

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        try {
            console.log(data);
            // Iteramos sobre los productos obtenidos de la API y los pasamos a la función creacionCart
            data.products.slice(0, 10).forEach(element => {
                creacionCart({
                    image: element.image_url || 'https://via.placeholder.com/300', // Si no tiene imagen, usamos un placeholder
                    title: element.product_name,
                    price: (Math.floor(Math.random() * 10) + 1) // Asignamos un precio aleatorio
                });
            });
        } catch (error) {
            console.log("Error al cargar la información");
        }
    });

// Función para crear la carta de cada producto
function creacionCart(element) {
    // Creamos el elemento div como contenedor de la carta
    let newDiv = document.createElement('div');
    newDiv.classList.add('card');
    newDiv.style.width = '15rem';
    newDiv.style.height = 'auto';

    // Creamos el elemento img para las imágenes
    let newimg = document.createElement('img');
    newimg.src = element.image;
    newimg.alt = 'Imagen del producto';
    newimg.classList.add('card-img-top');
    newimg.style.width = '200px';
    newimg.style.height = '200px';

    // Creamos el elemento div que contendrá las descripciones
    let divDescripcion = document.createElement('div');
    divDescripcion.classList.add('card-body');

    // Creamos el elemento h5 para el título (nombre del producto)
    let newtitle = document.createElement('h5');
    newtitle.textContent = element.title;
    newtitle.classList.add('card-title');

    // Creamos el elemento p para el precio
    let newprice = document.createElement('p');
    newprice.textContent = `$${element.price}`;
    newprice.classList.add('card-text');

    // Creamos el botón para "Comprar"
    let newButton = document.createElement('a');
    newButton.textContent = "Comprar";
    newButton.classList.add('btn', 'btn-primary');
    newButton.addEventListener('click', () => {
        let cantidad;
        do {
            cantidad = prompt("Ingresa la cantidad de unidades:");
            if (isNaN(cantidad) || cantidad <= 0 || !/^\d+$/.test(cantidad)) {
                alert("Cantidad no válida. Intente nuevamente.");
            }
        } while (isNaN(cantidad) || cantidad <= 0 || !/^\d+$/.test(cantidad));
        
        // Agregar el producto al carrito
        const producto = new Producto(element.title, element.price, Number(cantidad));
        carrito.agregarProductos(producto);
        
        // Actualizar el carrito en la interfaz
        carrito.mostrarCarrito();
        
        // Preguntar si desea seguir agregando productos
        let continuar = prompt("¿Deseas seguir agregando productos? (s/n):").toLowerCase();
        while (continuar !== 's' && continuar !== 'n') {
            alert("Respuesta no válida. Por favor ingresa 's' o 'n'.");
            continuar = prompt("¿Deseas seguir agregando productos? (s/n):").toLowerCase();
        }
        
        // Si el usuario elige 'n', no se hace nada, el flujo continúa y la compra no se finaliza automáticamente
        if (continuar === 's') {
            // Si elige 's', se vuelve a mostrar la carta de productos
            return;
        }
    });

    // Agregamos los elementos al contenedor de la carta
    divDescripcion.appendChild(newtitle);
    divDescripcion.appendChild(newprice);
    divDescripcion.appendChild(newButton);
    newDiv.appendChild(newimg);
    newDiv.appendChild(divDescripcion);

    // Insertamos la nueva carta en la sección del HTML
    let section = document.getElementById("productos");
    section.appendChild(newDiv);
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProductos(producto) {
        this.productos.push(producto);
        alert(`${producto.cantidad} ${producto.nombre}(s) agregado(s) al carrito`);
    }

    mostrarCarrito() {
        const carritoElement = document.getElementById('carrito');
        carritoElement.innerHTML = ''; // Limpiar el carrito antes de mostrarlo
        this.productos.forEach(producto => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
            carritoElement.appendChild(li);
        });
        this.actualizarTotal();
    }

    actualizarTotal() {
        const total = this.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    finalizarCompra() {
        if (this.productos.length === 0) {
            alert("No hay productos en el carrito.");
            return;
        }

        // Generar el resumen de la compra
        let resumen = "Detalle de la compra:\n";
        this.productos.forEach(producto => {
            resumen += `${producto.nombre} - $${producto.precio} x ${producto.cantidad}\n`;
        });

        // Calcular el total
        const total = this.calcularTotalCompra();
        resumen += `El total de su compra es $${total.toFixed(2)}`;

        // Mostrar el resumen antes de finalizar la compra
        alert(resumen);

        // Limpiar el carrito después de mostrar el resumen
        this.productos = [];
        this.mostrarCarrito();

        // Mostrar el mensaje de agradecimiento solo si hay productos
        if (total > 0) {
            alert("Muchas Gracias Por Su Compra!");
        }

    }

    calcularTotalCompra() {
        return this.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    }
}

// Instanciar el carrito
const carrito = new Carrito();

// Agregar evento al botón "Finalizar Compra"
document.getElementById('finalizar').addEventListener('click', () => {
    carrito.finalizarCompra();
});
