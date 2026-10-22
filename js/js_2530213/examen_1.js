//Llamado al dibujado de la vista y pantalla 
document.querySelector("button[data-vista = 'examen1']").addEventListener("click", () => {
    drawExa1();
    cambiarPantalla("exa1")
});

//Dibujado de la practica a mostrar 
function drawExa1() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <h1>Examen Unidad 1</h1>
        <form id="formularioExamen">
            <label for="nombre">Nombre Completo: </label>
            <input type="text" id="nombreID" required><br><br>

            <label for="correo">Correo: </label>
            <input type="email" id="correoID" required><br><br>

            <label for="telefono">Telefono: </label>
            <input type="tel" id="telefonoID" minlength="10" maxlength="10" required><br><br>

            <label for="curso">Seleccione el curso a estudiar: </label> <br><br>
            <select class="nada" id="cursoID">
                <option value="1200">Desarrollo Web 1200 MXN</option>
                <option value="1500">JavaScript 1500 MXN</option>
                <option value="1800">Desarrollo Web 1800 MXN</option>
            </select><br><br>

            <label for="modalidadL">Selecciona la modalidad: </label> <br>
            <input class="nada" type="radio" name="modalidad" id="linea" value="linea"> Linea <br>
            <input class="nada" type="radio" name="modalidad" id="presencial" value="presencial"> Presencial <br><br>

            <label for="credencial">¿Cuentas con credencial?: </label> <br>
            <input type="radio" name="credencial" id="si" value="Si"> Si <br>
            <input type="radio" name="credencial" id="no" value="No"> No <br><br>

            <input type="checkbox" required> Acepto terminos y condiciones <br><br>

            <button type="submit">Incribirse</button>
        </form>

        <h2>Resultados</h2>
        <p id="nombre"></p>
        <p id="correo"></p>
        <p id="telefono"></p>
        <p id="curso"></p>
        <p id="modalidad"></p>
        <p id="precio"></p>
        <p id="recargo"></p>
        <p id="descuento"></p>
        <p id="cuota"></p>
        <p id="total"></p>

        <button type="button" id="limpiar">Limpiar</button>
    </section>
    `

    //Boton para la limpieza del formulario
    let limpiar = vista_nuevaAct.querySelector("#limpiar");
    //Llamado del formulario
    const formulario = vista_nuevaAct.querySelector("#formularioExamen")
    
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        //Llamado de las variables
        const nombre = vista_nuevaAct.querySelector("#nombreID").value;
        const correo = vista_nuevaAct.querySelector("#correoID").value;
        const telefono = Number(vista_nuevaAct.querySelector("#telefonoID").value);

        //Validacion de la direccion del correo
        if (!correo.includes("@upv.edu.mx")) {
            alert("El correo debe ser similar a matricula@upv.edu.mx");
            return;
        }

        //Datos ingresados
        const curso = Number(vista_nuevaAct.querySelector("#cursoID").value);
        const modalidad = vista_nuevaAct.querySelector('input[name="modalidad"]:checked');
        const credencial = vista_nuevaAct.querySelector('input[name="credencial"]:checked');

        //Mas validaciones
        if (!modalidad) {
            alert("Debes seleccionar una modalidad");
            return;
        }

        if (!credencial) {
            alert("Debes seleccionar una opcion en credencial");
            return;
        }

        //Calculo final de los precios
        let cuota = 200;

        let modalidadEscogida = modalidad.value;
        let credencialEstado = credencial.value;
        let agregado = 0;
        let descuento = 0

        if (modalidadEscogida == "presencial") agregado = 300;
        if (credencialEstado == "Si") descuento = curso * .10;

        let total = curso + agregado + cuota - descuento

        //Motrado de los resultados
        vista_nuevaAct.querySelector("#nombre").textContent = "Nombre del estudiante: " + nombre;
        vista_nuevaAct.querySelector("#correo").textContent = "Correo del estudiante: " + correo;
        vista_nuevaAct.querySelector("#telefono").textContent = "Telefono del estudiante: " + telefono;
        vista_nuevaAct.querySelector("#curso").textContent = "Curso seleccionado: " + curso;
        vista_nuevaAct.querySelector("#cuota").textContent = "Cuota fija: 200 MXN";
        vista_nuevaAct.querySelector("#recargo").textContent = "Recargo de modalidad: " + agregado + " MXN";
        vista_nuevaAct.querySelector("#descuento").textContent = "Descuento Aplicado: " + descuento + " MXN";
        vista_nuevaAct.querySelector("#total").textContent = "Total a pagar: " + total + " MXN";

    });

    //Limpieza del formulario
    limpiar.addEventListener("click", function (event) {
        formulario.reset();
        vista_nuevaAct.querySelector("#nombre").textContent = "";
        vista_nuevaAct.querySelector("#correo").textContent = "";
        vista_nuevaAct.querySelector("#telefono").textContent = "";
        vista_nuevaAct.querySelector("#curso").textContent = "";
        vista_nuevaAct.querySelector("#cuota").textContent = "";
        vista_nuevaAct.querySelector("#recargo").textContent = "";
        vista_nuevaAct.querySelector("#descuento").textContent = "";
        vista_nuevaAct.querySelector("#total").textContent = "";
    });
}

//Mostrado de pantalla al reiniciar
if (pantalla == "exa1") drawExa1();
