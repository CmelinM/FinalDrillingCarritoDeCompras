export default class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProductos(producto) {
        this.productos.push(producto);
        alert(`${producto.cantidad} ${producto.nombre}(s) agregado(s) al carrito`);
    }

    calculartotalCompra() {
        const total = this.productos.reduce(
            (total, producto) => total + producto.precio * producto.cantidad,
            0
        );
        return total;
    }

    finalizarCompra() {
        if (this.productos.length === 0) {
            // alert("No hay productos en el carrito.");
            return;
        }
    
        const total = this.calculartotalCompra();
        const detalleCompra = this.detalleCompra();
        alert(
            `Detalle de la compra:\n${detalleCompra}El total de su compra es $${total}\nMuchas Gracias Por Su Compra`
        );
    
        // Limpiar el carrito después de finalizar la compra
        this.productos = [];
    }
    

    detalleCompra() {
        let detalle = "";
        this.productos.forEach((producto) => {
            detalle += `Producto: ${producto.nombre} Precio: $${producto.precio} Cantidad: ${producto.cantidad}\n`;
        });
        return detalle;
    }
}
