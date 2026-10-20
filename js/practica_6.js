document.querySelector("button[data-vista = 'practica6']").addEventListener("click", () => {
    drawPract6();
    cambiarPantalla("pract6")
});

function drawPract6() {
    vista_nuevaAct.innerHTML = `
    <body>
    <section class="actividadesRegistradas">
        <p class="eyebrow">Preferencias de usuario</p>
        <h1>Preferencias</h1>
        <form id="formulario">
            <input type="text" name="nombre" id="nombre" placeholder="Nombre" required>
            <select id="tema">
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
            </select>
            <select id="tamano">
                <option value="pequeno">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
            </select>
            <button id="btnGuardar" type="button">Agregar</button>
            <button id="btnEliminar" type="button">Eliminar</button>
            <textarea id="mensaje" name="textarea"></textarea>
        </form>
    </section>
    </body>
    `

    const nombre = vista_nuevaAct.querySelector("#nombre");
    const tema = vista_nuevaAct.querySelector("#tema");
    const tamano = vista_nuevaAct.querySelector("#tamano");
    const mensaje = vista_nuevaAct.querySelector("#mensaje");

    const btnGuardar = vista_nuevaAct.querySelector("#btnGuardar");
    const btnEliminar = vista_nuevaAct.querySelector("#btnEliminar");

    function aplicarPreferencias(preferencias) {
        document.body.style.backgroundColor =
            preferencias.tema === "oscuro" ? "#222" : "#fff";

        document.body.style.color =
            preferencias.tema === "oscuro" ? "#fff" : "#000";

        if (preferencias.tamano === "pequeno") {
            document.body.style.fontSize = "14px";
        } else if (preferencias.tamano === "mediano") {
            document.body.style.fontSize = "18px";
        } else {
            document.body.style.fontSize = "24px";
        }
    }

    function guardarPreferencias() {
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
        const guardado =
            localStorage.getItem("preferenciasUsuario");

        if (!guardado) {
            return;
        }

        const preferencias = JSON.parse(guardado);

        nombre.value = preferencias.nombre;
        tema.value = preferencias.tema;
        tamano.value = preferencias.tamano;

        aplicarPreferencias(preferencias);

        if (preferencias.nombre) {
            mensaje.textContent =
                `Bienvenido, ${preferencias.nombre}`;
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

if (pantalla == "pract6") drawPract6();
