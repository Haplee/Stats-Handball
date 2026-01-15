@echo off
echo ==========================================
echo    LANZADOR AUTOMATICO - STATS HANDBALL
echo ==========================================

echo Lanzando el Backend en una nueva ventana...
start "BACKEND API (Port 5000)" cmd /k "cd backend && echo [BACKEND] Instalando dependencias... && pip install -r requirements.txt && echo [BACKEND] Iniciando Flask... && set FLASK_APP=app.main:crear_app && flask run --debug --port 5000"

echo Lanzando el Frontend en una nueva ventana...
start "FRONTEND WEB (Port 5173)" cmd /k "cd progress-web && echo [FRONTEND] Instalando dependencias... && npm install && echo [FRONTEND] Iniciando Vite... && npm run dev"

echo.
echo He abierto dos ventanas para los servidores.
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:5173
echo.
echo Si alguna ventana se cierra o muestra error, revisa que tengas Python y Node.js instalados.
pause
