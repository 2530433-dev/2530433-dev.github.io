document.querySelector("button[data-vista = 'practica8']").addEventListener("click", () => {
    drawPract8();
    cambiarPantalla("pract8")
});

//Dibujado de la practica
function drawPract8() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <main class="panel">
            <nav>
                <button data-vista="inicio">Inicio</button>
                <button data-vista="proyectos">Proyectos</button>
                <button data-vista="ajustes">Ajustes</button>
                <p></p>
            </nav>
            <header>
                <p class="eyebrow">Previo a examen</p>
                <h1>Gestión de Proyectos</h1>
            </header>
            <section id="app"></section>
        </main>
    </section>
    `;
    // Datos de la aplicación
    let proyectos = [];
    let vistaActiva = "inicio";

    let contenedor = document.querySelector("#app");
    let clave = "aplicacionProyectos";

    // Cargar los datos guardados
    try {
        let datosGuardados = localStorage.getItem(clave);

        if (datosGuardados) {
            let datos = JSON.parse(datosGuardados);

            proyectos = Array.isArray(datos.proyectos) ? datos.proyectos : [];
            vistaActiva = datos.vistaActiva || "inicio";
        }
    } catch (error) {
        console.log("Error al cargar los datos.");
        proyectos = [];
        vistaActiva = "inicio";
    }

    // Guardar proyectos y vista en localStorage
    function guardar() {
        let datos = {
            proyectos: proyectos,
            vistaActiva: vistaActiva
        };

        localStorage.setItem(clave, JSON.stringify(datos));
    }

    // Cambiar de vista
    function cambiarVista(vista) {
        vistaActiva = vista;
        guardar();
        pintar();
    }

    // Mostrar la vista seleccionada
    function pintar() {
        contenedor.replaceChildren();

        if (vistaActiva === "inicio") {
            let titulo = document.createElement("h2");
            let subtitulo = document.createElement("h3");
            let resumen = document.createElement("p");

            titulo.textContent = "Inicio";
            subtitulo.textContent = "Resumen";
            resumen.textContent = `Proyectos guardados: ${proyectos.length}`;

            contenedor.append(titulo, subtitulo, resumen);

        } else if (vistaActiva === "proyectos") {
            let titulo = document.createElement("h2");
            let texto = document.createElement("p");

            let inputNombre = document.createElement("input");
            let inputDescripcion = document.createElement("textarea");
            let selectEstado = document.createElement("select");
            let botonAgregar = document.createElement("button");
            let lista = document.createElement("div");

            titulo.textContent = "Proyectos";
            texto.textContent = "Agregar un nuevo proyecto:";

            inputNombre.type = "text";
            inputNombre.placeholder = "Nombre del proyecto";

            inputDescripcion.placeholder = "Descripción del proyecto";

            // Opciones de estado
            ["Pendiente", "En proceso", "Terminado"].forEach((estado) => {
                let opcion = document.createElement("option");

                opcion.value = estado;
                opcion.textContent = estado;

                selectEstado.append(opcion);
            });

            botonAgregar.textContent = "Agregar proyecto";
            botonAgregar.type = "button";

            // Agregar proyecto
            botonAgregar.addEventListener("click", () => {
                let nombre = inputNombre.value.trim();
                let descripcion = inputDescripcion.value.trim();
                let estado = selectEstado.value;

                if (nombre === "") {
                    alert("Escribe el nombre del proyecto.");
                    return;
                }

                proyectos.push({
                    nombre: nombre,
                    descripcion: descripcion,
                    estado: estado
                });

                guardar();
                pintar();
            });

            // Mostrar los proyectos guardados
            proyectos.forEach((proyecto) => {
                let tarjeta = document.createElement("article");
                let nombreProyecto = document.createElement("h3");
                let descripcionProyecto = document.createElement("p");
                let estadoProyecto = document.createElement("p");
                let cambiarEstado = document.createElement("select");
                let borrar = document.createElement("button");

                nombreProyecto.textContent = proyecto.nombre;

                descripcionProyecto.textContent =
                    proyecto.descripcion || "Sin descripción";

                estadoProyecto.textContent =
                    "Estado: " + (proyecto.estado || "Pendiente");

                // Cambiar estado del proyecto
                ["Pendiente", "En proceso", "Terminado"].forEach((estado) => {
                    let opcion = document.createElement("option");

                    opcion.value = estado;
                    opcion.textContent = estado;

                    if ((proyecto.estado || "Pendiente") === estado) {
                        opcion.selected = true;
                    }

                    cambiarEstado.append(opcion);
                });

                cambiarEstado.addEventListener("change", () => {
                    proyecto.estado = cambiarEstado.value;

                    guardar();
                    pintar();
                });

                // Eliminar un proyecto
                borrar.textContent = "Eliminar";
                borrar.type = "button";

                borrar.addEventListener("click", () => {
                    proyectos.splice(proyectos.indexOf(proyecto), 1);

                    guardar();
                    pintar();
                });

                tarjeta.append(
                    nombreProyecto,
                    descripcionProyecto,
                    estadoProyecto,
                    cambiarEstado,
                    borrar
                );

                lista.append(tarjeta);
            });

            contenedor.append(
                titulo,
                texto,
                inputNombre,
                inputDescripcion,
                selectEstado,
                botonAgregar,
                lista
            );

        } else if (vistaActiva === "ajustes") {
            let titulo = document.createElement("h2");
            let texto = document.createElement("p");
            let botonLimpiar = document.createElement("button");

            titulo.textContent = "Ajustes";
            texto.textContent = "Los datos se almacenan en localStorage.";
            botonLimpiar.textContent = "Limpiar todos los proyectos";
            botonLimpiar.type = "button";

            // Borrar todos los proyectos
            botonLimpiar.addEventListener("click", () => {
                if (confirm("¿Deseas eliminar todos los proyectos?")) {
                    proyectos = [];

                    guardar();
                    pintar();
                }
            });

            contenedor.append(titulo, texto, botonLimpiar);
        }
    }

    // Navegación entre las vistas
    document.querySelectorAll("nav button[data-vista]").forEach((boton) => {
        boton.addEventListener("click", () => {
            cambiarVista(boton.dataset.vista);
        });
    });

    // Comprobar que la vista guardada sea válida
    if (!["inicio", "proyectos", "ajustes"].includes(vistaActiva)) {
        vistaActiva = "inicio";
    }

    // Mostrar la última vista guardada
    pintar();
}

//Mostado de la pantalla al reiniciar
if (pantalla === "pract8") drawPract8();