// estructura de carrito


btnAgregar.addEventListener("click",
    agregarProductoCarrito 
)

document.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        agregarProductoCarrito()
    }
} )

function agregarProductoCarrito () {
    const nombreProducto = inputProductos.value;
    carrito.set(nombreProducto, 1);
    renderizarLista();
    inputProductos.value = ''
}

function renderizarLista() {
    listaProductos.replaceChildren(); //? sirve para cambiar a los hijos del "ul"
    for (let i of carrito.keys()) {
        const liEl = document.createElement("li");
        liEl.classList.add("mdl-list__item");
        const liElSpan = document.createElement("span");
        liElSpan.classList.add("mdl-list__item-primary-content");
        liElSpan.innerText = i;
        liEl.appendChild(liElSpan);
        listaProductos.appendChild(liEl);
    }
}

btnBorrar.addEventListener ("click", () => {
    carrito.clear();
    renderizarLista ();
}
)