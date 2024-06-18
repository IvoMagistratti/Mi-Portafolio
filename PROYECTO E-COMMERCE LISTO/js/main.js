// PRODUCTOS
const productos = [
    // Entretenimiento
    {
        id: "smartTV1",
        titulo: "Smart tv 01",
        imagen: "/img/smartTV1.png",
        categoria: {
            nombre: "Entretenimiento",
            id: "Entretenimiento"
        },
        precio: "400"
    },
    {
        id: "smartTV2",
        titulo: "Smart tv 02",
        imagen: "/img/smartTV2.png",
        categoria: {
            nombre: "Entretenimiento",
            id: "Entretenimiento"
        },
        precio: "400"
    },
    {
        id: "smartTV3",
        titulo: "Smart tv 03",
        imagen: "/img/smartTV3.png",
        categoria: {
            nombre: "Entretenimiento",
            id: "Entretenimiento"
        },
        precio: "400"
    },
    {
        id: "smartTV4",
        titulo: "Smart tv 04",
        imagen: "/img/smartTV4.png",
        categoria: {
            nombre: "Entretenimiento",
            id: "Entretenimiento"
        },
        precio: "400"
    },
    {
        id: "Musica1",
        titulo: "Equipo de musica 01",
        imagen: "/img/musica1.png",
        categoria: {
            nombre: "Entretenimiento",
            id: "Entretenimiento"
        },
        precio: "300"
    },
    {
        id: "Musica2",
        titulo: "Equipo de musica 02",
        imagen: "/img/musica2.png",
        categoria: {
            nombre: "Entretenimiento",
            id: "Entretenimiento"
        },
        precio: "300"
    },

// Cocina

    {
        id: "Cocina1",
        titulo: "Cocina 01",
        imagen: "/img/cocina1.png",
        categoria: {
            nombre: "Cocina",
            id: "Cocina"
        },
        precio: "200"
    },
    {
        id: "Cocina2",
        titulo: "Cocina 02",
        imagen: "/img/cocina2.png",
        categoria: {
            nombre: "Cocina",
            id: "Cocina"
        },
        precio: "200"
    },
    {
        id: "Freidora1",
        titulo: "Freidora 01",
        imagen: "/img/freidora1.png",
        categoria: {
            nombre: "Cocina",
            id: "Cocina"
        },
        precio: "80"
    },
    {
        id: "Freidora2",
        titulo: "Freidora 02",
        imagen: "/img/freidora2.png",
        categoria: {
            nombre: "Cocina",
            id: "Cocina"
        },
        precio: "80"
    },

// lavarropas

    {
        id: "Lavarropas1",
        titulo: "Lavarropas 01",
        imagen: "/img/lavarropas1.png",
        categoria: {
            nombre: "Lavarropas",
            id: "Lavarropas",
        },
        precio: "150"
    },
    {
        id: "Lavarropas2",
        titulo: "Lavarropas 02",
        imagen: "/img/lavarropas2.png",
        categoria: {
            nombre: "Lavarropas",
            id: "Lavarropas",
        },
        precio: "150"
    },
    {
        id: "Lavarropas3",
        titulo: "Lavarropas 03",
        imagen: "/img/lavarropas3.png",
        categoria: {
            nombre: "Lavarropas",
            id: "Lavarropas"
        },
        precio: "150"
    },
    {
        id: "Lavarropas4",
        titulo: "Lavarropas 04",
        imagen: "/img/lavarropas4.png",
        categoria: {
            nombre: "Lavarropas",
            id: "Lavarropas"
        },
        precio: "150"
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-cat");
const tituloPrincipal = document.querySelector("#titulo-principal");
let  botonesAgregar = document.querySelectorAll(".boton-agregar");
const numerito = document.querySelector("#numerito");




function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id=${producto.id}>Agregar</button>
        </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar()
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;



            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito
}