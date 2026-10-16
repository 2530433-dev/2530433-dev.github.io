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
//pantalla a llamar
let pantalla = 'gestor';

function save() {//guardado del local
    localStorage.setItem('tareasGuardadas', JSON.stringify(tareas));
}

//llamado de pestana segun el boton
document.querySelector("button[data-vista = 'gestorTareas']").addEventListener("click", () => { drawGestor(); });
//document.querySelector("button[data-vista = 'otro']").addEventListener("click", () => { drawOtro(); });

let boton = "Guardar";
let vista_nuevaAct = document.querySelector("#vista");
let vistaActividades = document.querySelector("#vistaActividades");
let vistaLista = document.querySelector("#lista");
let color = "";
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
    </section>`

    vistaActividades.innerHTML = `
    <section class="actividadesRegistradas">
        <h1>Actividades registradas</h1>
        <label for="busqueda">Buscar titulo o materia</label>
        <input id='busqueda' placeholder='Buscar...'>
        <label for="estado">Estado</label>
        <select>
            <option value='todos'>Todos</option>
            <option value='pendiente'>Pendiente</option>
            <option value='proceso'>En proceso</option>
            <option value='terminado'>Terminada</option>
        </select>
        <label for="prioridad">Prioridad</label>
        <select>
            <option value='baja'>Baja</option>
            <option value='media'>Media</option>
            <option value='alta'>Alta</option>
        </select>
    </section>    
    `

    vistaLista.innerHTML = ``

    //filtrado
    let buscar = document.querySelector("#busqueda").value.toLowerCase();

    //Mostrado
    lista = document.querySelector("#lista");

    ["pendiente", "proceso", "terminado"].forEach((estado) =>
        document.querySelector("#lista").replaceChildren()
    );

    tareas.forEach((tarjeta, indice) => {
        let contenedor = vista_nuevaAct.querySelector(`#${tarjeta.estado}`);
        let elemento = document.createElement("article");
        elemento.className = "tarjeta";
        elemento.innerHTML =
            "<span></span><br><button>Avanzar</button><button>Retroceder</button><button>Editar</button><button>Eliminar</button>";
        elemento.querySelector("span").textContent = tarjeta.titulo;
        //avanza a la siuiente columna
        elemento.querySelectorAll("button")[0].addEventListener("click", () => {
            let estados = ["pendiente", "proceso", "terminado"];
            tarjeta.estado =
                estados[Math.min(estados.indexOf(tarjeta.estado) + 1, 2)];
            save();
            drawGestor();
        });

        //retrocede
        elemento.querySelectorAll("button")[1].addEventListener("click", () => {
            let estados = ["pendiente", "proceso", "terminado"];
            tarjeta.estado =
                estados[Math.max(estados.indexOf(tarjeta.estado) - 1, 0)];
            save();
            drawGestor();
        });

        //edtar
        elemento.querySelectorAll("button")[2].addEventListener("click", () => {
            tarjeta.titulo = prompt("Nuevo titulo");
            save();
            drawGestor();
        });
        //elimina
        elemento.querySelectorAll("button")[3].addEventListener("click", () => {
            tareas.splice(indice, 1);
            save();
            drawGestor();
        });
        contenedor.append(elemento);
    });



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
            tareas.push({//asignacion al local
                id: tareas.length,
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
}

function drawOtro() {
    vista.innerHTML = `
    `
}

if(pantalla == 'gestor'){
    drawGestor()
}