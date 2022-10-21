///////////////////////////////// OBJETOS Y VARIABLES ///////////////////////////////
let items = [];
const btnAgregar = document.querySelector("#btn-entrada-producto");
const btnBorrar = document.querySelector("#btn-borrar-productos");
const btnGuardar = document.querySelector("#btn-storage-guardar");
const btnLimpiar = document.querySelector('#btn-storage-limpiar');
const btnCargar = document.querySelector('#btn-storage-cargar')

///////////////////////////////// FUNCIONES /////////////////////////////////////////
/**
 *
 * nombre: crearItem
 * parametro: objeto *El objeto está desestructurado, es decir, se toma las propiedades por
 * separado para facilitar su acceso
 * retorno: elemento del DOM
 */
function crearItem({ id, nombre, cantidad, precio }) {
  // Creo un método que me permita automatizar la creación de los input ya que es un proceso parecido para ambos
  const inputTemplate = (changeCallback, inputId, labelValue) => {
    const span = document.createElement("span");
    span.classList.add("mdl-list__item-primary-content", "w-20");

    const div = document.createElement("div");
    div.classList.add("mdl-textfield", "mdl-js-textfield");

    const input = document.createElement("input");
    input.classList.add("mdl-textfield__input");
    input.onchange = changeCallback;
    input.type = "text";
    input.id = inputId;
    div.appendChild(input);

    const label = document.createElement("label");
    label.classList.add("mdl-textfield__label");
    label.for = inputId;
    label.innerHTML = labelValue;
    div.appendChild(label);

    span.appendChild(div);

    return span;
  };

  const li = document.createElement("li");
  li.classList.add("mdl-list__item");

  const spanIcon = document.createElement("span");
  spanIcon.classList.add("mdl-list__item-primary-content", "w-10");
  spanIcon.innerHTML = '<i class="material-icons">shopping_cart</i>';
  li.appendChild(spanIcon);

  const spanNombre = document.createElement("span");
  spanNombre.innerHTML = nombre;
  spanNombre.classList.add("mdl-list__item-primary-content", "w-30");
  li.appendChild(spanNombre);

  li.appendChild(
    inputTemplate(
      function (e) {
        items[id].cantidad = Number(e.target.value);
      },
      "cant-" + id,
      cantidad
    )
  );

  li.appendChild(
    inputTemplate(
      function (e) {
        items[id].precio = Number(e.target.value);
      },
      "precio-" + id,
      precio
    )
  );

  return li;
}

/**
 *
 * nombre: renderItems
 * parametro: items (array de items a renderizar)
 * retorno: nada
 * proceso: la lógica es muy simple y consta de tres pasos bien definidos
 *  1) Seleccionar el contenedor (#ul_lista)
 *  2) Vaciar el contenedor, lo que ocasiona que se borren todos los items (innerHTML = "")
 *  3) Volver a llenar el contenedor basado en los items actuales (forEach)
 *      Al redibujar los items desde código, es necesario actualizar los estilos CSS
 *      del ul provistos por MaterialDesign con componentHandler.upgradeElements()
 */
function renderItems(items) {
  let ul = document.querySelector("#ul_lista");
  // Borrar los elementos actuales
  ul.innerHTML = "";

  // Cargar los elementos de la lista
  items.forEach(function (producto, indice) {
    ul.appendChild(
      crearItem({
        id: indice,
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        precio: producto.precio,
      })
    );
  });
  // Actualizar los estilos de MaterialDesign
  componentHandler.upgradeElements(ul);
}


///////////////////////////////// EVENTOS ///////////////////////////////////////////
btnAgregar.addEventListener("click", () => {
  let input = document.querySelector("#ingreso-producto");
  let producto = input.value;

  if (producto != "") {
    items.push({
      nombre: producto,
      cantidad: 1,
      precio: 0,
    });

    renderItems(items);
  }

  input.value = "";
});

btnBorrar.addEventListener("click", () => {
  items = [];
  renderItems(items);
});


///////////////////////////////// SERVICE WOKER ///////////////////////

function registrarServiceWorker(url) {
  if ("serviceWorker" in navigator) { //! verificamos que el navegador pueda correr un service worker
    navigator.serviceWorker.register(url)// este metodo nos devuelve una promesa
      .then((registracion) => {
        console.info("service worker instalado correctamente", registracion.scope); // veremos el scope donde esta instalado
      })
      .catch((error) => console.log(error));
  };
};

registrarServiceWorker("./sw.js")

//////////////////////////GUARDAR PRODUCTOS EN LOCAL STORAGE/////////////////////////////////////////////////////


function cargar() {
  // let l_storage = localStorage.getItem('super_lista_items')
  // if (l_storage) {
  //   return JSON.parse(l_storage);
  // }
  // return false //! si no hay datos retorna false

  return fetch('https://630583c7697408f7edc69ebc.mockapi.io/js_AWP')
    .then((response) => response.json())
    .then((data) => {
      if(data){
        return data
      } else {
        return false
      }
    })
    .catch(() => {return false})
}

function guardar(items) {

  let itemsObj = Object.fromEntries(items)

  // const options = { method: 'PUT', body: JSON.stringify(items), headers: { 'Content-type': 'application/json; charset=UTF-8' } }
  // fetch('https://630583c7697408f7edc69ebc.mockapi.io/js_AWP' ,options)
  // .then(response => response.json())
  // .then(json => { id.value = json.id })
  // .catch(error => console.error(`se ha producido el siguiente error: ${error}`))
  console.log (itemsObj)
}

function limpiar() {
  localStorage.removeItem('super_lista_items');
    items = [];
    renderItems(items)
}

document.addEventListener("DOMContentLoaded", () => {
  registrarServiceWorker();
    cargar()
      .then (res => {
        if (res && confirm('esta seguro que desea cargar datos desde la API WEB ?')){
          items = res ; 
          renderItems (items);
        }
      })
})

btnGuardar.addEventListener("click", () => {
  guardar(items);
});

btnLimpiar.addEventListener('click', () => {
  limpiar();
})

btnCargar.addEventListener("click" , () => {
  //! debido a que ahora "cargar()" es una promesa no puede ser llamada asi
  cargar()
    .then (res => {
      items = res ; 
      renderItems (items)
    })
});

