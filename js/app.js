let tareas;
// tareas = {
//     id: 1,
//     titulo: 'Proyecto de JavaScript',
//     materia: 'Aplicaciones Web',
//     descripcion: 'Desarrollar una aplicación con DOM',
//     fechaEntrega: '2026-10-23',
//     prioridad: 'alta',
//     estado: 'pendiente'
// };
try {//guardado en local
    tareas = JSON.parse(localStorage.getItem('tareasGuardadas')) || [];
} catch {
    tareas = [];
}
//pantallas a llamar
let pantalla = localStorage.getItem('pantallaActual') || 'gestor';

//cambiar autores de las practicas
const selectorAutor = document.querySelector("#selectorAutor");
const autor = document.querySelector("#autor");

// restaura el guardado
autor.value = localStorage.getItem('autorActual') || "";
if (!autor.value) autor.selectedIndex = 0;

// cambia el autor y recarga la página
autor.addEventListener("change", () => {
    localStorage.setItem('autorActual', autor.value);
    location.reload();
});

function cambiarPantalla(nombre) {
    pantalla = nombre;
    localStorage.setItem('pantallaActual', nombre);

    //lo muestra en todos menos en gestor
    selectorAutor.hidden = (pantalla === "gestor");  
}

function save() {//guardado del local
    localStorage.setItem('tareasGuardadas', JSON.stringify(tareas));
}



//llamado de pestana segun el boton
document.querySelector("button[data-vista = 'gestorTareas']").addEventListener("click", () => {
    cambiarPantalla("gestor");
    drawGestor();
});
//document.querySelector("button[data-vista = 'otro']").addEventListener("click", () => { drawOtro(); });

let boton = "Guardar";
let vista_nuevaAct = document.querySelector("#vista");
let vistaActividades = document.querySelector("#vistaActividades");
let vistaLista = document.querySelector("#lista");
let color = "";
let ttpendientes = 0;
let ttproceso = 0;
let tterminadas = 0;

function drawGestor() {//mostrado de infotmacion
    //formulario
    vista_nuevaAct.innerHTML = `
    <section class="nuevaActividad">
        <h2>Nueva Actividad</h2>
        <label for="titulo">Titulo *</label><br>
        <input id='titulo' placeholder='Ej. Proyecto de JavaScript'><br><br>
        <label for="materia">Materia *</label><br>
        <input id='materia' placeholder='Ej. Aplicaciones Web'><br><br>
        <label for="descripcion">Descripcion</label><br>
        <input id='descripcion' placeholder='Detalles de la entrega'><br><br>
        <label for="fecha">Fecha de Entrega</label><br>
        <input type='date' id='fecha' placeholder='Detalles de la entrega'><br><br>
        <label for="prioridad">Prioridad</label>
        <select id='prioridad'>
            <option value='baja'>Baja</option>
            <option value='media'>Media</option>
            <option value='alta'>Alta</option>
        </select>
        <label for="estado">Estado</label>
        <select id='estado'>
            <option value='pendiente'>Pendiente</option>
            <option value='proceso'>En proceso</option>
            <option value='terminada'>Terminada</option>
        </select><br><br>
        <button id="guardarActividad">${boton}</button><br>
        <p id='mensaje'><strong></strong></p>
    </section>
    
    <section class="actividadesRegistradas">

        <div class="resumen">
            <div class="resumen_apartado"><h3>Totales: <span id="tareasT"></span></h3></div>
            <div class="resumen_apartado"><h3>Pendientes: <span id="tareasP"></span></h3></div>
            <div class="resumen_apartado"><h3>Proceso: <span id="tareasEP"></span></h3></div>
            <div class="resumen_apartado"><h3>Terminadas: <span id="tareasTE"></span></h3></div>
        </div>
        <h1>Actividades registradas</h1>
        <label for="busqueda">Buscar titulo o materia</label>
        <input id='busqueda' placeholder='Buscar...'>
        <label for="filtroEstado">Estado</label>
        <select id="filtroEstado">
            <option value='todos'>Todos</option>
            <option value='pendiente'>Pendiente</option>
            <option value='proceso'>En proceso</option>
            <option value='terminado'>Terminada</option>
        </select>
        <label for="filtroPrioridad">Prioridad</label>
        <select id="filtroPrioridad">
            <option value='todos'>Todos</option>
            <option value='baja'>Baja</option>
            <option value='media'>Media</option>
            <option value='alta'>Alta</option>
        </select>
        <br><br>
        <div id="lista"></div>
    </section>
    `

    //filtrado
    let buscar = document.querySelector("#busqueda").value.toLowerCase();

    //Mostrado
    lista = vista_nuevaAct.querySelector("#lista");

    //id base
    let id = 1;

    vista_nuevaAct.querySelector('#guardarActividad').addEventListener('click', () => {//boton de guardado
        pantalla = 'gestor'
        let titulo = vista.querySelector('#titulo').value.trim();
        let materia = vista.querySelector('#materia').value.trim();
        let descripcion = vista.querySelector('#descripcion').value.trim();
        let fecha = vista.querySelector('#fecha').value;
        let prioridad = vista.querySelector('#prioridad').value;
        let estado = vista.querySelector('#estado').value;
        let mensaje = vista.querySelector('#mensaje')

        //validaciones
        if (titulo == "") {
            mensaje.style.color = "red";
            mensaje.textContent = "El titulo es obligatorio";
        } else if (materia == "") {
            mensaje.style.color = "red";
            mensaje.textContent = "La materia es obligatoria";
        } else if (fecha == "") {
            mensaje.style.color = "red";
            mensaje.textContent = "Fecha es obligatoria";
        } else {

            //Asignacion de ids para que no falle
            if (tareas.length === 0) id = 1;
            else id = Math.max(...tareas.map(a => a.id || 0)) + 1

            tareas.push({//asignacion al local
                id: id,
                titulo,
                materia,
                descripcion,
                fechaEntrega: fecha,
                prioridad,
                estado
            });
            save();

            //reseteo
            vista_nuevaAct.querySelector('#titulo').value = "";
            vista_nuevaAct.querySelector('#materia').value = "";
            vista_nuevaAct.querySelector('#descripcion').value = "";
            vista_nuevaAct.querySelector('#fecha').value = "";
            mensaje.style.color = "black";
            mensaje.textContent = "Actividad guardada";
        }
    });
    document.querySelector("#busqueda").addEventListener("input", renderLista);
    document.querySelector("#filtroEstado").addEventListener("change", renderLista);
    document.querySelector("#filtroPrioridad").addEventListener("change", renderLista);

    conteo();
    // muestra la lista de inicio
    renderLista();
}

//Conteo de actividades
function conteo() {
    ttpendientes = 0;
    ttproceso = 0;
    tterminadas = 0;
    tareas.forEach(actividad => {
        if (actividad.estado == "pendiente") ttpendientes++;
        if (actividad.estado == "proceso") ttproceso++;
        if (actividad.estado == "terminado") tterminadas++;
    });
    document.querySelector("#tareasT").textContent = tareas.length;
    document.querySelector("#tareasP").textContent = ttpendientes;
    document.querySelector("#tareasEP").textContent = ttproceso;
    document.querySelector("#tareasTE").textContent = tterminadas;
}

function renderLista() {
    let contenedorLista = document.querySelector("#lista");
    if (!contenedorLista) return;
    contenedorLista.innerHTML = "";

    let busqueda = document.querySelector("#busqueda") ? document.querySelector("#busqueda").value.toLowerCase() : "";
    let filtroEstado = document.querySelector("#filtroEstado") ? document.querySelector("#filtroEstado").value : "todos";
    let filtroPrioridad = document.querySelector("#filtroPrioridad") ? document.querySelector("#filtroPrioridad").value : "todos";

    // filtrar tareas
    let tareasFiltradas = tareas.filter(tarea => {
        let igualTexto = tarea.titulo.toLowerCase().includes(busqueda) || tarea.materia.toLowerCase().includes(busqueda);
        let igualEstado = filtroEstado === "todos" || tarea.estado === filtroEstado;
        let igualPrioridad = filtroPrioridad === "todos" || tarea.prioridad === filtroPrioridad;

        return igualTexto && igualEstado && igualPrioridad;
    });

    // Renderizar tarjetas
    tareasFiltradas.forEach((tarjeta) => {
        let indiceReal = tareas.indexOf(tarjeta);

        let elemento = document.createElement("article");
        elemento.className = "tarjeta";

        elemento.innerHTML = `
            <h3>${tarjeta.titulo}</h3>
            <p><strong>Materia:</strong> ${tarjeta.materia}</p>
            <p><strong>Descripción:</strong> ${tarjeta.descripcion || 'N/A'}</p>
            <p><strong>Fecha Entrega:</strong> ${tarjeta.fechaEntrega}</p>
            <p><strong>Prioridad:</strong> ${tarjeta.prioridad}</p>
            <label><strong>Estado:</strong></label>
            <select class="cambiarEstado">
                <option value="pendiente" ${tarjeta.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                <option value="proceso" ${tarjeta.estado === 'proceso' ? 'selected' : ''}>En proceso</option>
                <option value="terminado" ${tarjeta.estado === 'terminado' ? 'selected' : ''}>Terminada</option>
            </select><br><br>
            <button class="editar">Editar</button>
            <button class="eliminar">Eliminar</button>
            <hr>
        `;

        // cambiar estado
        elemento.querySelector(".cambiarEstado").addEventListener("change", (e) => {
            tarjeta.estado = e.target.value;
            save();
            renderLista();
        });

        // editar tarea
        elemento.querySelector(".editar").addEventListener("click", () => {
            let nuevoTitulo = prompt("Nuevo título:", tarjeta.titulo);
            let nuevaDescripcion = prompt("Nueva descripción:", tarjeta.descripcion);
            let nuevaFechaEntrega = prompt("Nueva fecha de entrega:", tarjeta.fechaEntrega);
            let nuevaPrioridad = prompt("Nueva prioridad:", tarjeta.prioridad);

            if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
                tarjeta.titulo = nuevoTitulo.trim();
            }
            if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== "") {
                tarjeta.descripcion = nuevaDescripcion.trim();
            }
            if (nuevaFechaEntrega !== null && nuevaFechaEntrega.trim() !== "") {
                tarjeta.fechaEntrega = nuevaFechaEntrega.trim();
            }
            if (nuevaPrioridad !== null && nuevaPrioridad.trim() !== "") {
                tarjeta.prioridad = nuevaPrioridad.trim();
            }
            save();
            renderLista();
        });

        // eliminar tarea
        elemento.querySelector(".eliminar").addEventListener("click", () => {
            tareas.splice(indiceReal, 1);
            save();
            renderLista();
        });

        contenedorLista.appendChild(elemento);
    });
}

//Mostrado de pantalla al reiniciar
if (pantalla == "gestor") drawGestor();

// Mostrar u ocultar el select segun la pantalla al iniciar
selectorAutor.hidden = (pantalla === "gestor");

// Cargar las practicas de la carpeta del autor elegido
["practica_3", "practica_4", "practica_5", "practica_6", "practica_7",
 "practica_8", "practica_9", "practica_10", "examen_1", "examen_2"]
.forEach(nombre => {
    const s = document.createElement("script");
    s.src = autor.value + nombre + ".js";
    s.onerror = () => console.warn("No se pudo cargar " + s.src);
    document.body.appendChild(s);
});