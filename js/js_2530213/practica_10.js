//Llamado al dibujado de la vista y pantalla 
document.querySelector("button[data-vista = 'practica10']").addEventListener("click", () => {
    drawPract10();
    cambiarPantalla("pract10")
});

//Dibujado de la practica a mostrar 
function drawPract10() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <h1>Encuesta del curso</h1>
    <form id="formularioEncuesta" action="">
        <label for="nombre">Nombre: </label>
        <input type="text" id="nombre" required><br><br>
        <label for="grupo">Grupo: </label>
        <input type="text" id="grupo" required><br><br>
        <label for="tema">Tema favorito: </label>
        <select id="tema">
            <option value="variables">Variables</option>
            <option value="condiciones">Condiciones</option>
            <option value="ciclos">Ciclos</option>
            <option value="funciones">Funciones</option>
            <option value="arreglos">Arreglos</option>
        </select><br><br>
        <label>Calificación: </label>
        <div class="opciones">
            <label><input type="radio" name="calificacion" value="1" required> 1</label>
            <label><input type="radio" name="calificacion" value="2"> 2</label>
            <label><input type="radio" name="calificacion" value="3"> 3</label>
            <label><input type="radio" name="calificacion" value="4"> 4</label>
            <label><input type="radio" name="calificacion" value="5"> 5</label>
        </div>
        <label for="comentarios">Comentarios: </label>
        <textarea id="comentarios"></textarea><br><br>

        <button type="submit">Enviar Formulario</button>
    </form>
    <hr>
    <h2>Resultado</h2>
    <section>
        <p id="mostrarNombre"></p>
        <p id="mostrarGrupo"></p>
        <p id="mostrarTema"></p>
        <p id="mostrarCalificacion"></p>
        <p id="mostrarComentarios"></p>
    </section>
    </section>
    `

    //Obtencion de datos del formulario
    const formulario = vista_nuevaAct.querySelector("#formularioEncuesta");
    const mostrarNombre = vista_nuevaAct.querySelector("#mostrarNombre");
    const mostrarGrupo = vista_nuevaAct.querySelector("#mostrarGrupo");
    const mostrarTema = vista_nuevaAct.querySelector("#mostrarTema");
    const mostrarCalificacion = vista_nuevaAct.querySelector("#mostrarCalificacion");
    const mostrarComentarios = vista_nuevaAct.querySelector("#mostrarComentarios");

    //Creacion del LocalStorage (una sola encuesta)
    let encuesta;
    try {
        encuesta = JSON.parse(localStorage.getItem('encuestaGuardada')) || {};
    } catch {
        encuesta = {};
    }

    //Guardado de localStorage
    function save() {
        localStorage.setItem('encuestaGuardada', JSON.stringify(encuesta));
    }

    //Mostrado del resultado
    function mostrar() {
        if (encuesta.nombre) {
            mostrarNombre.textContent = `Nombre: ${encuesta.nombre}`;
            mostrarGrupo.textContent = `Grupo: ${encuesta.grupo}`;
            mostrarTema.textContent = `Tema favorito: ${encuesta.tema}`;
            mostrarCalificacion.textContent = `Calificación: ${encuesta.calificacion}`;
            mostrarComentarios.textContent = `Comentarios: ${encuesta.comentarios}`;
        }
    }

    //Funcion para el envio de datos
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = vista_nuevaAct.querySelector("#nombre").value.trim();
        const grupo = vista_nuevaAct.querySelector("#grupo").value.trim();
        const tema = vista_nuevaAct.querySelector("#tema").value;
        const seleccionado = formulario.querySelector('input[name="calificacion"]:checked');
        const calificacion = seleccionado.value;
        const comentarios = vista_nuevaAct.querySelector("#comentarios").value.trim();

        //Reemplaza la encuesta anterior
        encuesta = { nombre, grupo, tema, calificacion, comentarios };
        save();
        mostrar();
    });

    //Muestra la encuesta guardada al reiniciar
    mostrar();
}

//Mostrado de pantalla al reiniciar
if (pantalla == "pract10") drawPract10();