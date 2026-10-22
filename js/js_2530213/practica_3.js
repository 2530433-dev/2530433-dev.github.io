document.querySelector("button[data-vista = 'practica3']").addEventListener("click", () => { 
    drawPract3(); 
    cambiarPantalla("pract3")
});

//Dibujado de la pantalla
function drawPract3() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
    <h1>Calculo de edades</h1>
    <p>Abra la consola del navegador para ver el resultado</p>
    </section>
    `

    //Asignacion de la edad
    let edad = 17;
    //Validaciones de la edad
    if (edad >= 50) console.log("Eres de la tercera edad");
    else if (edad >= 18) console.log("Eres mayor de edad");
    else console.log("Eres menor de edad");

}

//Mostrado de pantalla al reiniciar
if (pantalla == "pract3") drawPract3();
