//Llamado al dibujado de la vista y pantalla 
document.querySelector("button[data-vista = 'examen2']").addEventListener("click", () => {
    drawExa2();
    cambiarPantalla("exa2")
});

//Dibujado de la practica a mostrar 
function drawExa2() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <h1>Mi nota personal</h1>
        <section id="info"></section>
        <section id="notas"></section>
    </section>
    `

    let nota
    try {//crea la clave donde se almacenara
        nota = JSON.parse(localStorage.getItem('notaExamen')) || "";//CAMBIO: ahora es un texto, no un arreglo
    } catch {
        nota = "";
    }
    function save() {//guarda en el local storage
        localStorage.setItem('notaExamen', JSON.stringify(nota));
    }
    function draw() {
        //notas e info de la nota
        let contenedorInfo = vista_nuevaAct.querySelector("#info");
        let contenedorNotas = vista_nuevaAct.querySelector("#notas");
        //"diseño"
        contenedorInfo.innerHTML = `
        <textarea id="contenido" placeholder = "Ingresa tu nota" required></textarea><br>
        <button id = "guardar">Guardar</button><button id="eliminar">Eliminar</button>`;
        //guardado
        contenedorInfo.querySelector("#guardar").addEventListener("click", () => {
            let texto = contenedorInfo.querySelector("#contenido");
            let contenidoTexto = texto.value;
            if (contenidoTexto != "") {
                contenedorNotas.innerHTML = `<p>${contenidoTexto}</p><br>`
                nota = contenidoTexto;
                save();
            }
            else contenedorNotas.innerHTML = `<p>Ingrese datos en la notas</p>`
        });
        //eliminar
        contenedorInfo.querySelector("#eliminar").addEventListener("click", () => {
            contenedorInfo.querySelector("#contenido").value = "";//CAMBIO: formulario no existe, se limpia el textarea
            contenedorNotas.innerHTML = "";//limpia la nota mostrada
            nota = "" //vacía la nota
            save();
        });
        if (nota != "") contenedorNotas.innerHTML = `<p>${nota}</p><br>`
    }
    draw();
}

//Mostrado de pantalla al reiniciar
if (pantalla == "exa2") drawExa2();