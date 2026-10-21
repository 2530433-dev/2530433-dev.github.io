//Llamado al dibujado de la vista y pantalla 
document.querySelector("button[data-vista = 'practica9']").addEventListener("click", () => {
    drawPract9();
    cambiarPantalla("pract9")
});

//Dibujado de la practica a mostrar 
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

    //Obtencion de datos del formulario
    const formulario = vista_nuevaAct.querySelector("#formularionomina");
    const nombreEmpleado = vista_nuevaAct.querySelector("#nombreEmpleado");
    const horastrabajadas = Number(vista_nuevaAct.querySelector("#horasTrabajadas"));
    const horasExtra = Number(vista_nuevaAct.querySelector("#horasExtra"));
    const pagoTotal = Number(vista_nuevaAct.querySelector("#totalPagado"));

    //Creacion del LocalStorage
    let guardado;
    try {
        guardado = JSON.parse(localStorage.getItem('datosGuardados')) || [];
    } catch {
        guardado = [];
    }

    //Guardado de localStorage
    function save() {
        localStorage.setItem('datosGuardados', JSON.stringify(guardado));
    }

    //Funcion para el envio de datos
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = vista_nuevaAct.querySelector("#nombre").value;
        const horas = Number(vista_nuevaAct.querySelector("#horas").value);
        const pago = Number(vista_nuevaAct.querySelector("#pago").value);

        let horasextras = 0;
        let total = 0;
        let extra = 0;

        //Condicionales para el pago final
        if (horas > 40) {
            horasextras = horas - 40;
            extra = horasextras * pago;
            total = (pago * 40) + (extra * 1.5);
        } else total = pago * horas;
        total = total.toFixed(2);

        //Mostrado del resultado
        vista_nuevaAct.querySelector("#nombreEmpleado").textContent = nombre;
        vista_nuevaAct.querySelector("#horasTrabajadas").textContent = horas;
        vista_nuevaAct.querySelector("#horasExtra").textContent = horasextras;
        vista_nuevaAct.querySelector("#totalPagado").textContent = total;
        guardado.push({ nombre, horas, horasextras, total });
        save();
    });
}

//Mostrado de pantalla al reiniciar
if (pantalla == "pract9") drawPract9();
