import Carrito from './carrito.mjs';
import './productos.mjs';

window.carrito = new Carrito();  // Exponemos la instancia de carrito al contexto global

document.getElementById("finalizar").addEventListener("click", () => {
    carrito.finalizarCompra();
});
