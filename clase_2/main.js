// estructura de carrito

const carrito = new Map();

btnAgregar.addEventListener("click",() => {
    const nombreProducto = inputProductos.value
    carrito.set(nombreProducto,0)
})

function renderizarLista (){
    for (let i of carrito.keys()) {
        
    }
}