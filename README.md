# La Obra

Juego de sorteo en el navegador: cada jugada muestra la bandera de un país y, según lo que ganes, se van construyendo casas en 3D. Es una **simulación sin dinero real**: la billetera es virtual.

Funciona como **PWA**: se puede instalar en el celular o la computadora y, una vez abierto, anda sin conexión.

## Cómo se juega

- Cada obra arranca con $5.000 de la billetera virtual (que empieza con $100.000).
- Elegís la apuesta (botones o monto libre) y tocás **Sortear**. Sale una bandera y cobrás o perdés según la tabla de pagos.
- **La casa crece con lo que ganás**, no con lo que cargás:
  - Casa 1: se completa al llegar a **2x** lo invertido.
  - Casa 2 y casa 3: cada una se completa al multiplicar por **1,5** el crédito con que arrancó.
  - Una casa terminada **queda construida** aunque después pierdas.
- **Vender la casa** pasa tu crédito a la billetera. Después podés empezar otra obra.
- La partida, la billetera y la configuración se guardan en el navegador.

## Administración

El botón **Administrar** pide la clave **1318**. Con la clave se ven:

- **Configurar premios**: números del sorteo, cantidad de premios, retorno al jugador, pesos de cada premio, redondeo, metas de las casas y orden de los países.
- La tabla de pagos, los movimientos de la billetera y las estadísticas.

> La clave sirve para ocultar la configuración a los jugadores, pero está dentro del código: no es seguridad real.

## Jugar en tu computadora

Necesitás [Node.js](https://nodejs.org) (no hace falta instalar nada más).

- **Windows:** doble clic en `iniciar.bat`.
- **Mac / Linux:** `./iniciar.sh` (o `bash iniciar.sh`).
- O a mano: `node server.js` y abrí <http://localhost:8080>.

Para usar otro puerto: `PORT=3000 node server.js`.

> Abrir `index.html` con doble clic no alcanza: el navegador bloquea los módulos 3D y el modo sin conexión cuando la página no se sirve desde un servidor.

## Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (por ejemplo `la-obra`).
2. Subí **todo el contenido de esta carpeta** a la raíz del repositorio (incluido el archivo oculto `.nojekyll`):
   ```bash
   cd la-obra
   git init
   git add .
   git commit -m "La Obra"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/la-obra.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guardá.
4. En uno o dos minutos queda en `https://TU_USUARIO.github.io/la-obra/`. Desde ahí se puede instalar como app (en el celular: *Agregar a pantalla de inicio*).

### Al publicar una versión nueva

Cambiá `VERSION` en `sw.js` (por ejemplo `la-obra-v2`) para que los que ya la instalaron reciban la actualización.

## Estructura

```
index.html                  el juego completo (incluye los 3 modelos 3D y las banderas)
manifest.json               datos de la app instalable
sw.js                       service worker (modo sin conexión)
server.js                   servidor local sin dependencias
iniciar.sh / iniciar.bat    abren el servidor y el navegador
icons/                      íconos de la app
vendor/three/               three.js r160 (motor 3D) incluido para funcionar sin internet
.nojekyll                   para que GitHub Pages sirva los archivos tal cual
```

## Datos y créditos

- **Población:** Worldometers, estimación 2026 (basada en ONU, World Population Prospects 2024).
- **Orden de los países:** Paraguay primero; después los países de más de 2 millones de habitantes por PBI per cápita nominal (FMI, estimación 2026; ONU para Corea del Norte, Siria, Cuba y Eritrea); al final los más chicos, por población.
- **Banderas:** [flag-icons](https://github.com/lipis/flag-icons) (licencia MIT, ver `vendor/flag-icons/LICENSE`).
- **Motor 3D:** [three.js](https://threejs.org) r160 (licencia MIT, ver `vendor/three/LICENSE`).
- **Casas:** modelos propios hechos en SketchUp, con detalles y texturas generados por código.
