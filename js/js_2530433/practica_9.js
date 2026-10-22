document.querySelector("button[data-vista = 'practica9']").addEventListener("click", () => {
    drawPract9();
    cambiarPantalla("pract9")
});

//Dibujado de la practica
function drawPract9() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <h1>Ingrese los datos requeridos</h1>
    
        <form id="formulario">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" required>
            <br><br>

            <label for="horas">Horas trabajadas:</label>
            <input type="number" id="horas" min="0" step="any" required>
            <br><br>

            <label for="pago">Pago por hora:</label>
            <input type="number" id="pago" min="0" step="any" required>
            <br><br>

            <div class="acciones">
                <button type="submit">Realizar validación</button>
                <button type="button" id="btnLimpiar">Limpiar</button>
            </div>

            <hr>
            <h2>Cheque</h2>

            <div id="cheque"></div>
        </form>
    </section>
    `;
    const formulario = document.querySelector("#formulario");
    const cheque = document.querySelector("#cheque");
    const btnLimpiar = document.querySelector("#btnLimpiar");

    const nombreInput = document.querySelector("#nombre");
    const horasInput = document.querySelector("#horas");
    const pagoInput = document.querySelector("#pago");

    // Función encargada de calcular la nómina y pintar el resultado
    function calcularYMostrar(nombre, horasTotales, pagoPorHora) {
        let extra = 0;
        let horasNormales = horasTotales;

        if (horasTotales > 40) {
            extra = horasTotales - 40;
            horasNormales = 40;
        }

        const normales = horasNormales * pagoPorHora;
        const extras = extra * (pagoPorHora * 1.5);
        const total = normales + extras;

        cheque.style.whiteSpace = "pre-line";
        cheque.textContent = `
            Nombre: ${nombre}
            Pago por horas normales: $${normales.toFixed(2)}
            Pago por horas extra: $${extras.toFixed(2)}
            Total pagado: $${total.toFixed(2)}
        `;

        return {
            nombre,
            horas: horasTotales,
            pago: pagoPorHora,
            normales,
            extras,
            total
        };
    }

    // Cargar los datos desde localStorage si existen
    function cargarPreferencias() {
        const datosGuardados = localStorage.getItem("nominaUsuario");

        if (!datosGuardados) return;

        const datos = JSON.parse(datosGuardados);

        // Restaurar los valores en los inputs
        nombreInput.value = datos.nombre;
        horasInput.value = datos.horas;
        pagoInput.value = datos.pago;

        // Volver a calcular y mostrar la información
        calcularYMostrar(datos.nombre, Number(datos.horas), Number(datos.pago));
    }

    // Manejo del evento Submit del formulario
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = nombreInput.value.trim();
        const horas = Number(horasInput.value);
        const pago = Number(pagoInput.value);

        // Calcular y obtener los resultados
        const resultado = calcularYMostrar(nombre, horas, pago);

        // Guardar objeto completo en localStorage
        localStorage.setItem("nominaUsuario", JSON.stringify(resultado));
    });

    // Evento para limpiar localStorage
    btnLimpiar.addEventListener("click", function() {
        localStorage.removeItem("nominaUsuario");
        formulario.reset();
        cheque.textContent = "";
    });

    // Inicializar la carga automática
    cargarPreferencias();
}

//Mostado de la pantalla al reiniciar
if (pantalla === "pract9") drawPract9();