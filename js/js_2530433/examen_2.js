document.querySelector("button[data-vista = 'examen2']").addEventListener("click", () => {
    drawExamen2();
    cambiarPantalla("examen2")
});

//Dibujado de la practica
function drawExamen2() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <main>
            <h1>Mi nota personal</h1>
            <input type="text" id="nota" name="nota" placeholder="Escribe una nota" required>
            <button type="button" id="guardar">Guardar</button>
            <button type="button" id="eliminar">Eliminar</button>
        </main>
        <br>
        <hr>
        <h2>Nota</h2>
        <section id="contenedor"></section>
    </section>
    `;
    const inputNota = document.querySelector("#nota");
    const contenedor = document.querySelector("#contenedor");
    const btnGuardar = document.querySelector("#guardar");
    const btnEliminar = document.querySelector("#eliminar");

    // Se recupera la nota de localStorage o se inicializa vacía
    let nota;
    try {
        nota = JSON.parse(localStorage.getItem("notaExamen")) || "";
    } catch {
        nota = "";
    }

    // Persiste la nota en el almacenamiento local
    function guardar() {
        localStorage.setItem("notaExamen", JSON.stringify(nota));
    }

    // Renderiza la nota guardada en el DOM
    function pintar() {
        if (nota) {
            contenedor.textContent = nota;
            inputNota.value = nota;
        } else {
            contenedor.textContent = "No hay ninguna nota guardada.";
            inputNota.value = "";
        }
    }

    // Evento para guardar la nota
    btnGuardar.addEventListener("click", () => {
        const texto = inputNota.value.trim();

        if (!texto) {
            alert("Escribe una nota antes de guardar.");
            return;
        }

        nota = texto;
        guardar();
        pintar();
    });

    // Evento para eliminar la nota de localStorage
    btnEliminar.addEventListener("click", () => {
        localStorage.removeItem("notaExamen");
        nota = "";
        pintar();
    });

    // Carga inicial
    pintar();
}

//Mostado de la pantalla al reiniciar
if (pantalla === "examen2") drawExamen2();