document.querySelector("button[data-vista = 'practica10']").addEventListener("click", () => {
    drawPract10();
    cambiarPantalla("pract10")
});

//Dibujado de la practica
function drawPract10() {
    vista_nuevaAct.innerHTML = `
    <section class="actividadesRegistradas">
        
    </section>
    `;
    
}

//Mostado de la pantalla al reiniciar
if (pantalla === "pract10") drawPract10();