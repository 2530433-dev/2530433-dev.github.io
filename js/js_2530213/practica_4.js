document.querySelector("button[data-vista = 'practica4']").addEventListener("click", () => {
    drawPract4();
    cambiarPantalla("pract4")
});

let consumo;
try {
    consumo = JSON.parse(localStorage.getItem("consumoElectrico")) || { 
        nombre: "N/A", consumoact: 0, pago: 0 
    };
} catch {
    consumo = { nombre: "N/A", consumoact: 0, pago: 0 }
}

//guardado del localStorage
function save() {
    localStorage.setItem("consumoElectrico", JSON.stringify(consumo));
}

//Dibujado de la practica
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

    //Llamado de los apartados y del formulario
    const formulario = vista_nuevaAct.querySelector("#formularioConsumo");
    const nombreUsuario = vista_nuevaAct.querySelector("#nombre_usuario");
    const consumoTexto = vista_nuevaAct.querySelector("#consumo");
    const pagoTexto = vista_nuevaAct.querySelector("#pago");

    //funcion para mostrar lo guardado
    function mostrar() {
        nombreUsuario.textContent = `Cliente: ${consumo.nombre}`;
        consumoTexto.textContent = `Consumo: ${consumo.consumoact} kWh`;
        pagoTexto.textContent = `Total a pagar: $${Number(consumo.pago).toFixed(2)}`;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        //Variables a utilizar
        const nombre = vista_nuevaAct.querySelector("#nombre").value.trim();
        const anterior = Number(vista_nuevaAct.querySelector("#anterior").value);
        const nueva = Number(vista_nuevaAct.querySelector("#nueva").value);

        //Validaciones de lecturas
        if (nueva < anterior) {
            nombreUsuario.textContent = "";
            consumoTexto.textContent = "";
            pagoTexto.textContent = "Error: la lectura actual no puede ser menor que la anterior.";
            return;
        }

        //Calculo de costos
        const consumonuevo = nueva - anterior;
        let total = 0;
        if (consumonuevo > 250) total = consumonuevo * 1.80;
        else if (consumonuevo > 100) total = consumonuevo * 1.50;
        else total = consumonuevo * 1.20;

        consumo = {
            nombre: nombre, 
            consumoact: consumonuevo,
            pago: total
        }
        save(); 
        mostrar();
    });

    //Mostrado de informacion al cargar
    mostrar();
}

//Mostrado de pantalla al reiniciar
if (pantalla == "pract4") drawPract4();
