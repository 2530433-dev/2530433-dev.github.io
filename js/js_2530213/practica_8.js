//Llamado al dibujado de la vista y pantalla 
document.querySelector("button[data-vista = 'practica8']").addEventListener("click", () => {
    drawPract8();
    cambiarPantalla("pract8")
});

//Dibujado de la practica a mostrar 
function drawPract8() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <nav>
        <button data-vista="inicio">Inicio</button>
        <button data-vista="proyecto">Proyectos</button>
        <button data-vista="ajustes">Ajustes</button>
    </nav>
    <header>
        <p class="eyebrow">Previo a examen</p>
        <h1>Gestor de proyectos</h1>
    </header>
    <section id="app"></section>
    </section>
    `

    //localStorage
    let clave = 'aplicacionesProyectos';
    let clave2 = 'estadosPaginas';
    let proyectos, estado;
    try {
        // Cargar proyectos (asegurando que por defecto sea un arreglo vacío '[]')
        let proyectosGuardados = localStorage.getItem(clave);
        proyectos = proyectosGuardados ? JSON.parse(proyectosGuardados) : [];

        // Cargar estado (asegurando que por defecto sea la pantalla de inicio)
        let estadoGuardado = localStorage.getItem(clave2);
        estado = estadoGuardado ? JSON.parse(estadoGuardado) : "inicio";
    } catch {
        proyectos = [];
        estado = "inicio";
    }

    //Guardado en el local
    function save() {
        localStorage.setItem(clave2, JSON.stringify(estado));
        localStorage.setItem(clave, JSON.stringify(proyectos));
    }

    //llamar
    vista_nuevaAct.querySelector("button[data-vista = 'inicio']").addEventListener("click", () => { drawInicio(); });
    vista_nuevaAct.querySelector("button[data-vista = 'proyecto']").addEventListener("click", () => { drawProyecto(); });
    vista_nuevaAct.querySelector("button[data-vista = 'ajustes']").addEventListener("click", () => { drawAjustes(); });

    //Draws de los data-vista
    let contenedor = vista_nuevaAct.querySelector("#app");

    //Dibujado de la pantalla de inicio
    function drawInicio() {
        contenedor.innerHTML = `
    <h2><strong>Resumen</strong></h2>
    <p>Proyectos: ${proyectos.length}</p>
    <p>Aplicaciones</p>`;
        estado = "inicio";
        save();
    }

    //Dibujado de la pantalla de proyecto
    function drawProyecto() {
        contenedor.innerHTML = `
        <h2><strong>Proyectos</strong></h2>
        <input id="project" placeholder="Nombre del proyecto">
        <button id="agregar">Agregar</button>
        <ul id="lista-proyectos"></ul>
    `;

        let input = contenedor.querySelector("#project");
        let lista = contenedor.querySelector("#lista-proyectos");

        // Mostrar proyectos guardados
        proyectos.forEach(nombre => {
            let elemento = document.createElement("article");
            elemento.className = "tarjeta";
            elemento.textContent = nombre;
            lista.appendChild(elemento);
            elemento.innerHTML += `<br><button class="eliminar">Eliminar</button>`;
            elemento.querySelector(".eliminar").addEventListener("click", () => {
                proyectos = proyectos.filter(proyecto => proyecto !== nombreProyecto);
                save();
                elemento.remove();
            });
        });

        //Agregado de proyecto
        contenedor.querySelector("#agregar").addEventListener("click", () => {
            let nombreProyecto = input.value.trim();
            if (nombreProyecto !== "") {
                proyectos.push(nombreProyecto);
                save();
                let elemento = vista_nuevaAct.createElement("article");
                elemento.className = "tarjeta";
                elemento.textContent = nombreProyecto;
                lista.appendChild(elemento);
                elemento.innerHTML += `<br><button class="eliminar">Eliminar</button>`;
                elemento.querySelector(".eliminar").addEventListener("click", () => {
                    proyectos = proyectos.filter(proyecto => proyecto !== nombreProyecto);
                    save();
                    elemento.remove();
                });
                input.value = "";
            }
        });

        //Estado de la pantalla
        estado = "proyecto";
        save();
    }

    //Dibujado de ajustes
    function drawAjustes() {
        contenedor.innerHTML = `
        <h2><strong>Ajustes</strong></h2>
        <p>Los datos se almacenan en localStorage</p>
        <button id="btn-limpiar">Limpiar</button>`;

        contenedor.querySelector("#btn-limpiar").addEventListener("click", () => {
            proyectos = [];
            save();
        });
        
        estado = "ajustes";
        save();
    }

    //Pantallas a mostrar 
    if (estado === "inicio" || estado === "") drawInicio();
    else if (estado === "proyecto") drawProyecto();
    else if (estado === "ajustes") drawAjustes();

}

//Dibujado de pantalla al reiniciar
if (pantalla == "pract8") drawPract8();
