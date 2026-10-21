document.querySelector("button[data-vista = 'practica7']").addEventListener("click", () => {
    drawPract7();
    cambiarPantalla("pract7")
});

//Dibujado de la practica
function drawPract4() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <main class="panel">
            <p class="eyebrow">Práctica no. 7</p>
            <h1>Carrito de compras</h1>
            <p id="estado"></p>
            
            <section id="productos"></section>
            
            <h2 id="total">Total: $0</h2>
            <button type="button" id="vaciar">Vaciar carrito</button>
        </main>
    </section>
    `;
    // Catálogo de productos fijo
    const productos = [
        { id: 1, nombre: "Libro JS", precio: 450 },
        { id: 2, nombre: "Libro CSS", precio: 400 },
        { id: 3, nombre: "Libro HTML", precio: 200 }
    ];

    // Se intenta leer el estado guardado o se inicializa uno nuevo
    let carrito;
    try {
        carrito = JSON.parse(localStorage.getItem("carritoVersionado")) || {
            version: 1,
            productos: [],
            actualizado: Date.now()
        };
    } catch {
        carrito = { version: 1, productos: [], actualizado: Date.now() };
    }

    // Verifica que los datos antiguos tengan la estructura de la versión
    if (!carrito.version) {
        carrito = {
            version: 1,
            productos: carrito.productos || [],
            actualizado: Date.now()
        };
    }

    // Persistir en LocalStorage
    function guardar() {
        carrito.actualizado = Date.now();
        localStorage.setItem("carritoVersionado", JSON.stringify(carrito));
    }

    // Renderizar la lista de productos en el DOM
    function pintar() {
        const contenedor = document.querySelector("#productos");
        contenedor.innerHTML = ""; // Limpia el contenedor antes de pintar

        productos.forEach((producto) => {
            const item = document.createElement("article");
            item.className = "producto";
            item.innerHTML = `
                <h2>${producto.nombre}</h2>
                <p>$${producto.precio}</p>
                <button type="button">Agregar</button>
            `;

            item.querySelector("button").addEventListener("click", () => {
                // Incrementar cantidad si ya existe o añadir nuevo
                const existente = carrito.productos.find((p) => p.id === producto.id);
                
                if (existente) {
                    existente.cantidad++;
                } else {
                    carrito.productos.push({ ...producto, cantidad: 1 });
                }

                guardar();
                mostrarTotal();
            });

            contenedor.append(item);
        });

        mostrarTotal();
    }

    // Calcular y mostrar el total y estado del carrito
    function mostrarTotal() {
        const total = carrito.productos.reduce(
            (suma, item) => suma + item.precio * item.cantidad,
            0
        );

        // Cantidad total de artículos considerando sus cantidades individuales
        const totalArticulos = carrito.productos.reduce(
            (suma, item) => suma + item.cantidad,
            0
        );

        document.querySelector("#total").textContent = `Total: $${total}`;
        document.querySelector("#estado").textContent = 
            `Versión: ${carrito.version} | ${totalArticulos} producto(s) en carrito`;
    }

    // Vaciar carrito
    document.querySelector("#vaciar").addEventListener("click", () => {
        carrito.productos = [];
        guardar();
        mostrarTotal();
    });

    // Inicializar la aplicación
    pintar();
}

//Mostado de la pantalla al reiniciar
if (pantalla === "pract7") drawPract7();