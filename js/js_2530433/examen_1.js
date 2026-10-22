document.querySelector("button[data-vista = 'examen1']").addEventListener("click", () => {
    drawExamen1();
    cambiarPantalla("examen1")
});

//Dibujado de la practica
function drawExamen1() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <h1>Rellene los campos solicitados</h1>
        <form id="formulario">
            <div class="grupo">
                <label for="nombre">Nombre:</label><br>
                <input type="text" id="nombre" required>
            </div>

            <div class="grupo">
                <label for="correo">Correo:</label><br>
                <input type="email" id="correo" required>
            </div>

            <div class="grupo">
                <label for="telefono">Teléfono:</label><br>
                <input type="text" id="telefono" minlength="10" maxlength="10" required>
            </div>

            <div class="grupo">
                <label>Curso:</label><br>
                <label><input type="radio" name="curso" value="1200" required> Desarrollo web: $1,200 MXN</label><br>
                <label><input type="radio" name="curso" value="1500"> JavaScript: $1,500 MXN</label><br>
                <label><input type="radio" name="curso" value="1800"> Bases de Datos: $1,800 MXN</label>
            </div>

            <div class="grupo">
                <label>Modalidad:</label><br>
                <label><input type="radio" name="modalidad" value="presencial" required> Presencial (Recargo $300)</label><br>
                <label><input type="radio" name="modalidad" value="linea"> En línea (Sin recargo)</label>
            </div>

            <div class="grupo">
                <label>¿Cuenta con credencial?:</label><br>
                <label><input type="radio" name="credencial" value="si" required> Sí (10% desc.)</label>
                <label><input type="radio" name="credencial" value="no"> No</label>
            </div>

            <div class="grupo">
                <label>
                    <input type="checkbox" id="terminos" required> Acepto los términos de privacidad
                </label>
            </div>

            <button type="submit">Ingresar datos</button>

            <hr>
            <h2>Resultado</h2>
            <div id="resultado"></div>
        </form>
    </section>
    `;
    const formulario = document.querySelector("#formulario");
    const resultado = document.querySelector("#resultado");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener valores de texto
        const nombre = document.querySelector("#nombre").value.trim();
        const correo = document.querySelector("#correo").value.trim();
        const telefono = document.querySelector("#telefono").value.trim();

        // Obtener la opción seleccionada de cada grupo
        const cursoSeleccionado = document.querySelector('input[name="curso"]:checked');
        const modalidadSeleccionada = document.querySelector('input[name="modalidad"]:checked');
        const credencialSeleccionada = document.querySelector('input[name="credencial"]:checked');

        if (!cursoSeleccionado || !modalidadSeleccionada || !credencialSeleccionada) {
            alert("Por favor seleccione todas las opciones del formulario.");
            return;
        }

        // Precio según el curso seleccionado
        const precioCurso = Number(cursoSeleccionado.value);

        // Aplicar descuento por credencial (10%)
        let descuento = 0;
        if (credencialSeleccionada.value === "si") {
            descuento = precioCurso * 0.10;
        }

        // Aplicar recargo por modalidad presencial
        let recargo = 0;
        if (modalidadSeleccionada.value === "presencial") {
            recargo = 300;
        }

        // Cuota fija de inscripción
        const cuota = 200;

        // Cálculo total
        const total = precioCurso - descuento + recargo + cuota;

        // Renderizar resultados en pantalla
        resultado.innerHTML = `
            <p><strong>Comprobante de Inscripción</strong></p>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Correo:</strong> ${correo}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <hr>
            <p><strong>Precio del curso:</strong> $${precioCurso.toFixed(2)} MXN</p>
            <p><strong>Descuento (Credencial):</strong> -$${descuento.toFixed(2)} MXN</p>
            <p><strong>Recargo (Modalidad):</strong> +$${recargo.toFixed(2)} MXN</p>
            <p><strong>Cuota fija:</strong> +$${cuota.toFixed(2)} MXN</p>
            <h3>Total a pagar: $${total.toFixed(2)} MXN</h3>
        `;
    });
}

//Mostado de la pantalla al reiniciar
if (pantalla === "examen1") drawExamen1();