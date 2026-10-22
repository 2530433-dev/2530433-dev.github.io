document.querySelector("button[data-vista = 'practica3']").addEventListener("click", () => {
    drawPract3();
    cambiarPantalla("pract3")
});

//Dibujado de la practica
function drawPract3() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        <h1>Calcula categoria de edad</h1>
        <p>Abra la consola del navegador para ver el resultado</p>
    </section>
    `;
    const edad = 67;

    if(edad < 18){
        console.log("Es menor de edad");
    }else if(edad >= 18 && edad < 50){
        console.log("Es mayor de edad");
    } else{
        console.log("Tercera edad");
    }
}

//Mostado de la pantalla al reiniciar
if (pantalla === "pract3") drawPract3();