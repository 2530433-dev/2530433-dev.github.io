//Llamado al dibujado de la vista y pantalla 
document.querySelector("button[data-vista = 'practica7']").addEventListener("click", () => {
    drawPract7();
    cambiarPantalla("pract7")
});

//Dibujado de la practica a mostrar 
function drawPract7() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <p class="eyebrow">Practica no. 7</p>
    <h1>Carrito de compras</h1>
    <section id="productos" class="tablero"></section> <!--Falto hacer referencia a tablero-->
    <h2 id="total"></h2>
    <p id="estado"></p> <!--Me falto poner estado-->
    <button type="submit" id="vaciar">Vaciar Carrito</button>
    </section>
    `

    //catalogo de productos fuijo
    let productos = [
        { id: 1, nombre: "Libro JS", precio: 450 },
        { id: 2, nombre: "Ebook Css", precio: 400 },
        { id: 3, nombre: "Libro HTML", precio: 200 },
    ];
    //se intenta leer el formato guardado del array y se crea uno nuevo si falla
    let carrito;
    try {
        carrito = JSON.parse(localStorage.getItem('carritoversionado')) || {
            version: 1,
            productos: [],
            actualizado: Date.now(),
        };
    } catch {
        carrito = { version: 1, productos: [], actualizado: Date.now() };
    }
    //verificar que los datos antiguos tengan la estructura de la version 1
    if (!carrito.version)
        carrito = {
            version: 1,
            productos: carrito.productos || [],
            actualizado: Date.now(),
        };

    //guardar
    function guardar() {
        //actualiza la fecha y persiste el carrito de compras
        carrito.actualizado = Date.now();
        localStorage.setItem("carritoversionado", JSON.stringify(carrito));
    }

    function pintar() {
        //muestra el estado actual del carrito
        let contenedor = vista_nuevaAct.querySelector("#productos");
        productos.forEach((producto) => {
            let item = document.createElement("article");
            item.className = "tarjeta"; //aqui se ponia tarjeta en lugar de productos
            item.innerHTML = `<h2>${producto.nombre}</h2><p>${producto.precio}</p><button>Agregar</button>`;
            item.querySelector("button").addEventListener("click", () => {
                //incrementa el carrito respecta al precio o crea uno nuevo
                let existente = carrito.productos.find((p) => p.id === producto.id);
                existente
                    ? existente.cantidad++
                    : carrito.productos.push({ ...producto, cantidad: 1 });
                guardar();
                mostrarTotal();
            });
            contenedor.append(item);
        });
        mostrarTotal();
    }

    function mostrarTotal() {
        //Suma precio y actualiza el carrito
        let total = carrito.productos.reduce(
            (suma, item) => suma + item.precio * item.cantidad,
            0,
        )
        vista_nuevaAct.querySelector("#total").textContent = `Total: $${total}`;
        vista_nuevaAct.querySelector("#estado").textContent = //si era como yo dije
            `Versión ${carrito.version} · ${carrito.productos.length} productos`;
    }

    vista_nuevaAct.querySelector("#vaciar").addEventListener("click", () => {
        //Conserva la estructura y solo vacia los productos del locaStrorage
        carrito.productos = [];
        guardar();
        mostrarTotal();
    });

    pintar();

}

//Dibujado de pantalla al reiniciar
if (pantalla == "pract7") drawPract7();
