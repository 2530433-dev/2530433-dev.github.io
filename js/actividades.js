document.querySelector("button[data-vista = 'practica3']").addEventListener("click", () => { drawOtro(); });

function drawOtro() {
    vista.innerHTML = `
    <main class="panel">
        <p class="eyebrow">Ejercicio Cards Kanban</p>
        <h1>Tablero de actividades</h1>
        <form id="formulario">
            <input type="text" name="titulo" placeholder="Nueva Tarjeta" required>
            <select name="estado">
                <option value="pendiente">Pendiente</option>
                <option value="proceso">Proceso</option>
                <option value="terminado">Terminado</option>
            </select>
            <button type="submit">Agregar</button>
        </form>
        <section class="tablero">
            <div>
                <h2>Pendiente</h2>
                <section id="pendiente"></section>
            </div>
            <div>
                <h2>En proceso</h2>
                <section id="proceso"></section>
            </div>
            <div>
                <h2>Terminado</h2>
                <section id="terminado"></section>
            </div>
        </section>
    </main>
    `
}