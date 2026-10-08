// Servidor local sin dependencias para jugar La Obra en tu computadora.
// Uso: node server.js  (o los scripts iniciar.sh / iniciar.bat). Puerto: 8080, o PORT=xxxx node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const RAIZ = __dirname;
const PUERTO = Number(process.env.PORT) || 8080;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json', '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (ruta.endsWith('/')) ruta += 'index.html';
  const archivo = path.normalize(path.join(RAIZ, ruta));
  if (!archivo.startsWith(RAIZ)) { res.writeHead(403); return res.end('Prohibido'); }
  fs.readFile(archivo, (err, datos) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('No encontrado'); }
    const tipo = TIPOS[path.extname(archivo).toLowerCase()] || 'application/octet-stream';
    const cabeceras = { 'Content-Type': tipo };
    if (path.basename(archivo) === 'sw.js') cabeceras['Cache-Control'] = 'no-cache';
    res.writeHead(200, cabeceras);
    res.end(datos);
  });
}).listen(PUERTO, () => {
  console.log(`La Obra está corriendo en http://localhost:${PUERTO}`);
  console.log('Para cerrarla, presioná Ctrl + C.');
});
