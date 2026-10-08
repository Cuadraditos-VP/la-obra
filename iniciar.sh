#!/usr/bin/env bash
# Inicia La Obra en http://localhost:8080 y abre el navegador.
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Necesitás Node.js instalado (https://nodejs.org)."; exit 1
fi
PUERTO="${PORT:-8080}"
( sleep 1; URL="http://localhost:$PUERTO"; (command -v xdg-open >/dev/null && xdg-open "$URL") || (command -v open >/dev/null && open "$URL") ) >/dev/null 2>&1 &
PORT="$PUERTO" node server.js
