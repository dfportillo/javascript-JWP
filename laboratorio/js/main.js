
///////////////////////////
btn_add.addEventListener("click",
    addProductCart
);

//////////////// 

document.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        addProductCart()
    };
});

function addProductCart() {
    const productName = input.value;
    cart.set(productName, 1);
    renderizarLista();
    input.value = '';
};

function renderizarLista() {

    productList.replaceChildren(); //* no repite los elementos del map

    for (let i of cart.keys()) {

        const liEl = document.createElement('li');
        liEl.classList.add("mdl-list__item");
        const spanEl = document.createElement('span');
        spanEl.classList.add("mdl-list__item-primary-content");
        spanEl.textContent = i;
        const divAmount = document.createElement('div');
        divAmount.id = "btn_amount";
        const spanAdd = document.createElement('span');
        spanAdd.classList.add('material-symbols-outlined', 'btn_add-amount');
        spanAdd.textContent = 'add';
        let spanAmount = document.createElement('span');
        spanAmount.id = 'amount';
        spanAmount.textContent = cart.get(i);
        const spanSub = document.createElement('span');
        spanSub.classList.add('material-symbols-outlined', 'btn_sub-amount');
        spanSub.textContent = 'remove';
        const divDelELBox = document.createElement('div');
        const spanDelElBoxIcon = document.createElement('span');
        divDelELBox.classList.add('btndel_element-box');
        spanDelElBoxIcon.classList.add('material-symbols-outlined', 'btn_delete-element');
        spanDelElBoxIcon.textContent = 'delete';

        /////////////// eventos para sumar y restar cant de producto
        spanAdd.addEventListener('click', function () {

            let currentAmunt = cart.get(i);
            if (currentAmunt >= 0) {
                cart.set(i, currentAmunt + 1);
                spanAmount.textContent = cart.get(i);
            };
        });

        spanSub.addEventListener('click', () => {
            let currentAmunt = cart.get(i);
            if (currentAmunt > 0) {
                cart.set(i, currentAmunt - 1);
                spanAmount.textContent = cart.get(i);
            } else {
                cart.set(i, 0);
            }
        });

        ///// evento eliminar

        divDelELBox.addEventListener('click', () => {
            cart.delete(i);
            this.renderizarLista()
        });


        ///////////////////////
        liEl.appendChild(spanEl);
        divAmount.appendChild(spanAdd);
        divAmount.appendChild(spanAmount);
        divAmount.appendChild(spanSub);
        liEl.appendChild(divAmount);
        productList.appendChild(liEl);
        divDelELBox.appendChild(spanDelElBoxIcon);
        liEl.appendChild(divDelELBox);
    };


};

btn_borrar.addEventListener('click', () => {
    cart.clear();
    renderizarLista();
});

//* ////////////////////ServiceWorker///////////////////////////////

function registrarServiceWorker(url) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register(url) // metodo registra sw en nuestra web 
            .then(reg => { // el codigo anterior devuelve una promesa
                console.info('ServiceWorker instalado correactamente', reg.scope)
            })
            .catch((error) => console.error(error));
    };
};

document.addEventListener("DOMContentLoaded",()=>{
    registrarServiceWorker('./sw.js');
})


////////////////////////////////////////////////

function guardarItems() {
    items.length = 0;
    let index = 1;

    for(let[productName,quantity] of cart){
        items.push({
            id:index,
            productName:productName,
            quantity:quantity
        });
        index++;
    }
};

function cargarItems() {
    let storage = localStorage.getItem("super_lista_items");
    if(storage){
        let loadedItems = JSON.parse(storage);
        items = loadedItems;
        for(let item of items){
            cart.set(item.productName,item.quantity);
        }
        renderizarLista();
    }
};

function limpiarItems(){
    localStorage.removeItem("super_lista_items");
    items = [];
    cart.clear();
    renderizarLista();
};


/////////////////////////////////////////////////////

function guardarItemsLocalStorage(items){
    localStorage.setItem('super_lista_items',JSON.stringify(items))
}

btnGuardar.addEventListener("click",function(){
    guardarItems();
    guardarItemsLocalStorage(items);
});


btnCargar.addEventListener("click",()=>{
    cargarItems();
});


btnLimpiar.addEventListener("click",()=>{
    limpiarItems();
});


