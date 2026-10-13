let tareas;
const actividad = {
    id: 1,
    titulo: 'Proyecto de JavaScript',
    materia: 'Aplicaciones Web',
    descripcion: 'Desarrollar una aplicación con DOM',
    fechaEntrega: '2026-10-23',
    prioridad: 'alta',
    estado: 'pendiente'
};
try{
    tareas = JSON.parse(localStorage.getItem('tareasGuardadas')|| {
        id: null,
        titulo:'',
        materia:'',
        descripcion:'',
        fechaEntrega:'',
        prioridad:'',
        estado:'',
    })
}catch{
    tareas = {
        id: null,
        titulo:'',
        materia:'',
        descripcion:'',
        fechaEntrega:'',
        prioridad:'',
        estado:'',
    }
}

function save () {
    localStorage.setItem('tareasGuardadas', JSON.stringify(tareas));
}

document.querySelector("button[data-vista = 'gestorTareas']").addEventListener("click", () => { drawGestor(); });
document.querySelector("button[data-vista = 'otro']").addEventListener("click", () => { drawOtro(); });

let vista = document.querySelector("#vista");
function drawGestor () {
    vista.innerHTML = `
    <h2>Nueva Actividad</h2>
    <h3>Titulo *</h3>
    <input id='titulo' placeholder='Ej. Proyecto de JavaScript'>
    <h3>Materia *</h3>
    <input id='materia' placeholder='Ej. Aplicaciones Web'>
    <h3>Descripción</h3>
    <input id='materia' placeholder='Detalles de la entrega'>
    `
}
function drawOtro () {
    vista.innerHTML = `
    `
}
