# SGAA – Gestor de Actividades Académicas

Proyecto integrador de la Unidad 2 de **Aplicaciones Web**. Sirve para organizar tareas, proyectos y exámenes sin perder la información al recargar la página. Usa solo **HTML, CSS y JavaScript**.

**Equipo**

| Integrante | Matrícula | Rol |
|---|---|---|
| Alfredo Ismael Ramos Zuñiga | 2530213 | A: formulario, validaciones, registro, guardado en LocalStorage y estadísticas |
| Eduardo Gael Alonso Lara | 2530433 | B: diseño, eliminación, busqueda de tareas y filtrado por estado o prioridad |

---

# Parte 1. Instrucciones

## Cómo abrirlo

1. Descomprime el ZIP.
2. Abre `index.html` en tu navegador (Chrome, Edge o Firefox).
3. Para un mejor funcionamiento abrir desde el servidor `https://2530433-dev.github.io/`, este permite la reproduccion de videos.

## Carpetas

```
index.html
css/estilos.css
js/app.js
js/js_2530213/   (prácticas y exámenes de Alfredo)
js/js_2530433/   (prácticas y exámenes de Gael)
evidencias/semana1/
evidencias/semana2/
README.md
```

## Cómo usarlo

1. **Agregar:** llena título, materia y fecha (obligatorios). Descripción, prioridad y estado son opcionales. Pulsa **Guardar**.
2. **Cambiar estado:** usa el selector dentro de cada tarjeta.
3. **Editar:** pulsa **Editar** y responde los cuadros. El ID no cambia.
4. **Eliminar:** pulsa **Eliminar** y confirma.
5. **Buscar:** escribe en el buscador (título o materia, sin importar mayúsculas).
6. **Filtrar:** elige estado y prioridad; los filtros se combinan.
7. **Estadísticas:** las cuatro tarjetas de arriba muestran total, pendientes, en proceso y terminadas.

Los datos se guardan solos y vuelven al recargar la página.

## Prácticas, exámenes y videos

- La barra superior tiene los botones **Gestor, Práctica 3 a 10 y Examen 1 y 2**.
- Fuera del gestor aparece un selector de autor (Alfredo o Gael).
- En **Mis videos** (parte inferior del formulario) están los videos del desarrollo.

## Borrar los datos

En el navegador: *Herramientas de desarrollo → Application → Local Storage* y elimina la clave `actividadesAcademicas`.

---

# Parte 2. Documentación técnica

## Cómo está hecho

- `index.html`: estructura de la página, navegación y contenedor `#vista`.
- `js/app.js`: guarda y lee datos, dibuja el gestor y maneja los eventos.
- `css/estilos.css`: estilos y diseño adaptable (Grid, Flexbox y `@media`).

Flujo: al cargar, se leen los datos de `localStorage`, se dibuja el gestor y cada cambio se guarda y vuelve a dibujar la lista.

## Modelo de datos

```javascript
{
    id: 1,
    titulo: 'Proyecto de JavaScript',
    materia: 'Aplicaciones Web',
    descripcion: 'Desarrollar una aplicación con DOM',
    fechaEntrega: '2026-10-23',
    prioridad: 'alta',      // alta | media | baja
    estado: 'pendiente'     // pendiente | proceso | terminado
}
```

Se guarda como arreglo en `localStorage` con la clave `actividadesAcademicas`. También se guardan `pantallaActual` y `autorActual`.

## Funciones principales

| Función | Qué hace |
|---|---|
| `save()` | Guarda el arreglo con `JSON.stringify`. |
| `cambiarPantalla()` | Recuerda la vista y muestra u oculta el selector de autor. |
| `drawGestor()` | Dibuja formulario, estadísticas y filtros, y registra los eventos. |
| `conteo()` | Calcula y muestra las estadísticas. |
| `renderLista()` | Filtra (búsqueda + estado + prioridad) y dibuja las tarjetas. |

## Decisiones

- Sin frameworks: todo con DOM nativo.
- Un solo arreglo en memoria para el gestor que se sincroniza con `localStorage` en cada operación.
- IDs nuevos con `máximo + 1` para no repetirlos al eliminar.
- Las prácticas se cargan dinámicamente según el autor elegido.

## Pruebas obligatorias realizadas

- [✓] Registrar actividad válida
- [✓] Rechazar título vacío
- [✓] Registrar al menos cinco actividades
- [✓] Editar conservando el ID
- [✓] Cambiar estado a completada
- [✓] Eliminar con confirmación y comprobar cancelación
- [✓] Recargar y comprobar persistencia
- [✓] Buscar por materia y por título
- [✓] Filtro pendiente + prioridad alta
- [✓] Estadísticas tras eliminar

## Aportaciones

| Integrante | Aportación |
|---|---|
| Alfredo Ramos | HTML, formulario, captura en JS, validaciones, registro, estadisticas y localStorage |
| Gael Alonso | CSS, visualización de datos, eliminación y seleccion de autor |
| Ambos | CRUD, pruebas, documentación, videos y exposición |

## Evidencias

Capturas en `evidencias/semana1` y `evidencias/semana2`, bitácora diaria (`bitacora_diaria.xlsx`), videos en YouTube y repositorio con commits de ambos.


# Para publicar en GitHub (GitHub Pages)

El proyecto es solo HTML, CSS y JavaScript, así que se puede publicar gratis con GitHub Pages.

1. **Crear el repositorio:** en [github.com](https://github.com) pulsa **New repository**, ponle nombre (por ejemplo `SGAA_Equipo_XX`), elige **Public** y créalo.
2. **Subir los archivos:** pulsa **Add file → Upload files**, arrastra el contenido del proyecto y pulsa **Commit changes**. `index.html` debe quedar en la raíz.
3. **Activar Pages:** ve a **Settings → Pages**, en **Source** elige **Deploy from a branch**, selecciona la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
4. **Abrir el proyecto:** después de uno o dos minutos estará en
   `https://USUARIO.github.io/SGAA_Equipo_XX/`
5. **Trabajo en equipo:** agrega al otro integrante en **Settings → Collaborators**; los commits de ambos quedan como evidencia.

**Si algo falla:** revisa que `index.html` esté en la raíz y que los nombres de carpetas y archivos coincidan exactamente con los de `app.js`, porque GitHub distingue mayúsculas de minúsculas.