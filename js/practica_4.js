document.querySelector("button[data-vista = 'practica4']").addEventListener("click", () => { 
    drawPract4(); 
    cambiarPantalla("pract4")
});

function drawPract4() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <h1>Consumo electrico</h1>
    <form id="formularioConsumo" action="">
        <label for="nombre">Nombre: </label>
        <input type="text" id="nombre" required><br><br>
        <label for="anterior">Lectura anterior: </label>
        <input type="number" id="anterior" required><br><br>
        <label for="nueva">Lectura Nueva: </label>
        <input type="number" id="nueva" required><br><br>
        <button type="submit">Calcular</button>
    </form>
    <hr>
    <h2>Resultado</h2>
    <section>
        <p id="nombre_usuario"></p>
        <p id="consumo"></p>
        <p id="pago"></p>
    </section>
    </section>
    `

    const formulario = vista_nuevaAct.querySelector("#formularioConsumo");
    const nombreUsuario = vista_nuevaAct.querySelector("#nombre_usuario");
    const consumoTexto = vista_nuevaAct.querySelector("#consumo");
    const pagoTexto = vista_nuevaAct.querySelector("#pago");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = vista_nuevaAct.querySelector("#nombre").value.trim();
        const anterior = Number(vista_nuevaAct.querySelector("#anterior").value);
        const nueva = Number(vista_nuevaAct.querySelector("#nueva").value);

        if (nueva < anterior) {
            nombreUsuario.textContent = "";
            consumoTexto.textContent = "";
            pagoTexto.textContent = "Error: la lectura actual no puede ser menor que la anterior.";
            return;
        }

        const consumo = nueva - anterior;
        let total = 0;
        if (consumo > 250) total = consumo * 1.80;
        else if (consumo > 100) total = consumo * 1.50;
        else total = consumo * 1.20;

        nombreUsuario.textContent = `Cliente: ${nombre}`;
        consumoTexto.textContent = `Consumo: ${consumo} kWh`;
        pagoTexto.textContent = `Total a pagar: $${total.toFixed(2)}`;
    });

}

if (pantalla == "pract4") drawPract4();
