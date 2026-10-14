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

function save() {//guardado del local
    localStorage.setItem('tareasGuardadas', JSON.stringify(tareas));
}

//llamado de pestana segun el boton
document.querySelector("button[data-vista = 'gestorTareas']").addEventListener("click", () => { drawGestor(); });
document.querySelector("button[data-vista = 'otro']").addEventListener("click", () => { drawOtro(); });

let boton = "Guardar";
let vista = document.querySelector("#vista");
function drawGestor() {//mostrado de infotmacion
    //formulario
    vista.innerHTML = `
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
        <p id='mensaje'></p>
    </section>

    <section class="actividadesRegistradas">
        <h1>Actividades registradas</h1>
        <label for="busqueda">Buscar titulo o materia</label>
        <input id='busqueda' placeholder='Buscar...'>
        <label for="estado">Estado</label>
        <select>
            <option value='todos'>Todos</option>
            <option value='pendiente'>Pendiente</option>
            <option value='proceso'>En proceso</option>
            <option value='terminada'>Terminada</option>
        </select>
        <label for="prioridad">Prioridad</label>
        <select>
            <option value='baja'>Baja</option>
            <option value='media'>Media</option>
            <option value='alta'>Alta</option>
        </select>
    </section>    
    `

    vista.querySelector('#guardarActividad').addEventListener('click', () => {//boton de guardado
        const titulo = vista.querySelector('#titulo').value.trim();
        const materia = vista.querySelector('#materia').value.trim();
        const descripcion = vista.querySelector('#descripcion').value.trim();
        const fecha = vista.querySelector('#fecha').value;
        const prioridad = vista.querySelector('#prioridad').value;
        const estado = vista.querySelector('#estado').value;
        let mensaje = vista.querySelector('#mensaje')

        //validaciones
        if (titulo == "") {
            mensaje.textContent = "El titulo es obligatorio";
        } else if (materia == "") {
            mensaje.textContent = "La materia es obligatoria";
        } else if (fecha == "") {
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
            vista.querySelector('#titulo').value = "";
            vista.querySelector('#materia').value = "";
            vista.querySelector('#descripcion').value = "";
            vista.querySelector('#fecha').value = "";
            mensaje.textContent = "Actividad guardada";
        }
    });
}

function drawOtro() {
    vista.innerHTML = `
    `
}
