document.querySelector("button[data-vista = 'practica9']").addEventListener("click", () => {
    drawPract9();
    cambiarPantalla("pract9")
});

function drawPract9() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <h1>Cálculo nomina</h1>
    <form id="formularionomina" action="">
        <label for="nombre">Nombre del empleado: </label>
        <input type="text" id="nombre" required><br><br>
        <label for="horas">Horas Trabajadas: </label>
        <input type="number" id="horas" required><br><br>
        <label for="pago">Pago por hora: </label>
        <input type="number" id="pago" required><br><br>

        <button type="submit">Calcular</button>
    </form>
    <hr>
    <h2>Resultado</h2>
    <section>
        <p id="nombreEmpleado"></p>
        <p id="horasTrabajadas"></p>
        <p id="horasExtra"></p>
        <p id="totalPagado"></p>
    </section>
    </section>
    `
}

if (pantalla == "pract9") drawPract9();
