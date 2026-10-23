//Llamado al dibujado de la vista y pantalla 
document.querySelector("button[data-vista = 'practica10']").addEventListener("click", () => {
    drawPract10();
    cambiarPantalla("pract10")
});

//Dibujado de la practica a mostrar 
function drawPract10() {
    vista_nuevaAct.innerHTML = `
    <article class="actividadesRegistradas">
        <header>
            <h1>Encuesta del curso</h1>
        </header>

        <form id="formularioEncuesta">
            <div class="campo-formulario">
                <label for="nombre">Nombre: </label>
                <input type="text" id="nombre" required>
            </div>

            <div class="campo-formulario">
                <label for="grupo">Grupo: </label>
                <input type="text" id="grupo" required>
            </div>

            <div class="campo-formulario">
                <label for="tema">Tema favorito: </label>
                <select id="tema">
                    <option value="variables">Variables</option>
                    <option value="condiciones">Condiciones</option>
                    <option value="ciclos">Ciclos</option>
                    <option value="funciones">Funciones</option>
                    <option value="arreglos">Arreglos</option>
                </select>
            </div>

            <fieldset class="opciones">
                <legend>Calificación: </legend>
                <label><input type="radio" name="calificacion" value="1" required> 1</label>
                <label><input type="radio" name="calificacion" value="2"> 2</label>
                <label><input type="radio" name="calificacion" value="3"> 3</label>
                <label><input type="radio" name="calificacion" value="4"> 4</label>
                <label><input type="radio" name="calificacion" value="5"> 5</label>
            </fieldset>

            <div class="campo-formulario">
                <label for="comentarios">Comentarios: </label>
                <textarea id="comentarios"></textarea>
            </div>

            <button type="submit">Enviar Formulario</button>
        </form>

        <hr>

        <section class="panel-resultados">
            <h2>Resultado</h2>
            <div class="resumen-datos">
                <p id="mostrarNombre"></p>
                <p id="mostrarGrupo"></p>
                <p id="mostrarTema"></p>
                <p id="mostrarCalificacion"></p>
                <p id="mostrarComentarios"></p>
            </div>
        </section>
    </article>
    `;

    // Selección de elementos DOM
    const $form = vista_nuevaAct.querySelector("#formularioEncuesta");
    const $lblNombre = vista_nuevaAct.querySelector("#mostrarNombre");
    const $lblGrupo = vista_nuevaAct.querySelector("#mostrarGrupo");
    const $lblTema = vista_nuevaAct.querySelector("#mostrarTema");
    const $lblCalificacion = vista_nuevaAct.querySelector("#mostrarCalificacion");
    const $lblComentarios = vista_nuevaAct.querySelector("#mostrarComentarios");

    // Estado local y lectura de LocalStorage
    let registroEncuesta = {};
    try {
        const datosAlmacenados = localStorage.getItem('encuestaGuardada');
        if (datosAlmacenados) {
            registroEncuesta = JSON.parse(datosAlmacenados);
        }
    } catch (e) {
        registroEncuesta = {};
    }

    // Persistencia en LocalStorage
    const guardarEnStorage = () => {
        localStorage.setItem('encuestaGuardada', JSON.stringify(registroEncuesta));
    };

    // Renderizado en pantalla
    const actualizarVista = () => {
        if (registroEncuesta.nombre) {
            $lblNombre.textContent = `Nombre: ${registroEncuesta.nombre}`;
            $lblGrupo.textContent = `Grupo: ${registroEncuesta.grupo}`;
            $lblTema.textContent = `Tema favorito: ${registroEncuesta.tema}`;
            $lblCalificacion.textContent = `Calificación: ${registroEncuesta.calificacion}`;
            $lblComentarios.textContent = `Comentarios: ${registroEncuesta.comentarios}`;
        }
    };

    // Evento de envío del formulario
    $form.addEventListener("submit", (e) => {
        e.preventDefault();

        const valNombre = $form.querySelector("#nombre").value.trim();
        const valGrupo = $form.querySelector("#grupo").value.trim();
        const valTema = $form.querySelector("#tema").value;
        const opcionCalificacion = $form.querySelector('input[name="calificacion"]:checked');
        const valComentarios = $form.querySelector("#comentarios").value.trim();

        registroEncuesta = {
            nombre: valNombre,
            grupo: valGrupo,
            tema: valTema,
            calificacion: opcionCalificacion ? opcionCalificacion.value : '',
            comentarios: valComentarios
        };

        guardarEnStorage();
        actualizarVista();
    });

    // Carga inicial
    actualizarVista();
}

//Mostrado de pantalla al reiniciar
if (pantalla == "pract10") drawPract10();