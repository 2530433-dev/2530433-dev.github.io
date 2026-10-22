document.querySelector("button[data-vista = 'practica5']").addEventListener("click", () => {
    drawPract5();
    cambiarPantalla("pract5")
});

//Dibujado del formulario
function drawPract5() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <p class="eyebrow">Ejercicio Cards Kanban</p>
        <h1>Tablero de actividades</h1>
        <form id="formulario">
            <input type="text" name="titulo" placeholder="Nueva Tarjeta" required>
            <select name="estado">
                <option value="pendiente">Pendiente</option>
                <option value="proceso">Proceso</option>
                <option value="terminado">Terminado</option>
            </select>
            <button type="submit">Agregar</button>
        </form>
        <section class="tablero">
            <div>
                <h2>Pendiente</h2>
                <section id="pendiente"></section>
            </div>
            <div>
                <h2>En proceso</h2>
                <section id="proceso"></section>
            </div>
            <div>
                <h2>Terminado</h2>
                <section id="terminado"></section>
            </div>
        </section>
    </section>
    `

    //cada targeta conoce su tittulo y la columna en que se encuentra
    let tarjetas = JSON.parse(localStorage.getItem("tableroKanban") || "[]");

    function guardar() {
        //guarda  las tres columnas y las distribuye para conservar su columna
        localStorage.setItem("tableroKanban", JSON.stringify(tarjetas));
    }
    function pintar() {
        //limpia las tres columnas
        ["pendiente", "proceso", "terminado"].forEach((estado) =>
            vista_nuevaAct.querySelector(`#${estado}`).replaceChildren()
        );

        //Mostrado de las tarjetas
        tarjetas.forEach((tarjeta, indice) => {
            let contenedor = vista_nuevaAct.querySelector(`#${tarjeta.estado}`);
            let elemento = document.createElement("article");
            elemento.className = "tarjeta";
            elemento.innerHTML =
                "<span></span><br><button>Avanzar</button><button>Retroceder</button><button>Editar</button><button>Eliminar</button>";
            elemento.querySelector("span").textContent = tarjeta.titulo;
            //avanza a la siuiente columna
            elemento.querySelectorAll("button")[0].addEventListener("click", () => {
                let estados = ["pendiente", "proceso", "terminado"];
                tarjeta.estado =
                    estados[Math.min(estados.indexOf(tarjeta.estado) + 1, 2)];
                guardar();
                pintar();
            });
            //retrocede
            elemento.querySelectorAll("button")[1].addEventListener("click", () => {
                let estados = ["pendiente", "proceso", "terminado"];
                tarjeta.estado =
                    estados[Math.max(estados.indexOf(tarjeta.estado) - 1, 0)];
                guardar();
                pintar();
            });
            //edtar
            elemento.querySelectorAll("button")[2].addEventListener("click", () => {
                tarjeta.titulo = prompt("Nuevo titulo");
                guardar();
                pintar();
            });
            //elimina
            elemento.querySelectorAll("button")[3].addEventListener("click", () => {
                tarjetas.splice(indice, 1);
                guardar();
                pintar();
            });
            contenedor.append(elemento);

        }
        );
    }

    //Envio y guradado de valores
    vista_nuevaAct.querySelector("#formulario").addEventListener("submit", (evento) => {
        //crea una tarjeta en la columna correspondiente
        evento.preventDefault();
        tarjetas.push(Object.fromEntries(new FormData(evento.target)));
        guardar();
        evento.target.reset();
        pintar();
    });
    pintar();
}

//Mostrado de pantalla al reiniciar
if (pantalla == "pract5") drawPract5();
