document.querySelector("button[data-vista = 'practica6']").addEventListener("click", () => {
    drawPract6();
    cambiarPantalla("pract6")
});

//Dibujado de la practica
function drawPract6() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <main class="panel">
            <p class="eyebrow">Preferencias de usuario</p>
            <form id="formulario">
                <input type="text" id="nombre" name="nombre" placeholder="Nombre" required>
                <br>

                <p class="eyebrow">Tema</p>
                <select name="tema" id="tema">
                    <option value="claro">Claro</option>
                    <option value="oscuro">Oscuro</option>
                </select>
                <br>

                <p class="eyebrow">Tamaño de texto</p>
                <select name="tamano" id="tamano">
                    <option value="pequeno">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                </select>
                <br>

                <button type="submit" id="btnGuardar">Guardar preferencias</button>
                <button type="button" id="btnEliminar">Eliminar preferencias</button>
            </form>

            <p id="mensaje"></p>
        </main>
    </section>
    `;
    const nombre = document.querySelector("#nombre");
    const tema = document.querySelector("#tema");
    const tamano = document.querySelector("#tamano");
    const mensaje = document.querySelector("#mensaje");

    const btnGuardar = document.querySelector("#btnGuardar");
    const btnEliminar = document.querySelector("#btnEliminar");

    function aplicarPreferencias(preferencias) {
        document.body.style.backgroundColor =
            preferencias.tema === "oscuro" ? "#222" : "#ba0000";

        document.body.style.color =
            preferencias.tema === "oscuro" ? "#ba0000" : "#000";

        if (preferencias.tamano === "pequeno") {
            document.body.style.fontSize = "14px";
        } else if (preferencias.tamano === "mediano") {
            document.body.style.fontSize = "18px";
        } else {
            document.body.style.fontSize = "24px";
        }
    }

    function guardarPreferencias(e) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        const preferencias = {
            nombre: nombre.value.trim(),
            tema: tema.value,
            tamano: tamano.value
        };

        localStorage.setItem(
            "preferenciasUsuario",
            JSON.stringify(preferencias)
        );

        aplicarPreferencias(preferencias);
        mensaje.textContent = "Preferencias guardadas correctamente.";
    }

    function cargarPreferencias() {
        const guardado = localStorage.getItem("preferenciasUsuario");

        if (!guardado) {
            return;
        }

        const preferencias = JSON.parse(guardado);

        nombre.value = preferencias.nombre || "";
        tema.value = preferencias.tema || "claro";
        tamano.value = preferencias.tamano || "mediano";

        aplicarPreferencias(preferencias);

        if (preferencias.nombre) {
            mensaje.textContent = `Bienvenido, ${preferencias.nombre}`;
        }
    }

    function eliminarPreferencias() {
        localStorage.removeItem("preferenciasUsuario");

        nombre.value = "";
        tema.value = "claro";
        tamano.value = "mediano";

        aplicarPreferencias({
            tema: "claro",
            tamano: "mediano"
        });

        mensaje.textContent = "Preferencias eliminadas.";
    }

    btnGuardar.addEventListener("click", guardarPreferencias);
    btnEliminar.addEventListener("click", eliminarPreferencias);

    cargarPreferencias();
}

//Mostado de la pantalla al reiniciar
if (pantalla === "pract6") drawPract6();