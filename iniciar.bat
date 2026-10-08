@echo off
REM Inicia La Obra en http://localhost:8080 y abre el navegador.
cd /d "%~dp0"
where node >nul 2>nul || (echo Necesitas Node.js instalado: https://nodejs.org & pause & exit /b 1)
start "" http://localhost:8080
node server.js
pause
