@echo off
echo ==========================================
echo    DIAGNOSTICO Y LANZADOR UNIFICADO
echo ==========================================

REM Comprobar Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python no encontrado en el PATH.
    echo Por favor instala Python 3.9+ y añadelo al PATH.
    pause
    exit /b
) else (
    echo [OK] Python detectado.
)

REM Comprobar Node
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no encontrado en el PATH.
    echo Por favor instala Node.js LTS.
    pause
    exit /b
) else (
    echo [OK] Node.js detectado.
)

echo.
echo === 1. PREPARANDO BACKEND ===
cd backend
if not exist venv (
    echo Creando entorno virtual...
    python -m venv venv
)
call venv\Scripts\activate
echo Instalando dependencias (esto puede tardar)...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al instalar dependencias de Python.
    pause
    exit /b
)

echo.
echo === 2. PREPARANDO FRONTEND ===
cd ..\progress-web
if not exist node_modules (
    echo Instalando dependencias de Node...
    npm install
) else (
    echo Actualizando dependencias...
    npm install
)

if %errorlevel% neq 0 (
    echo [ERROR] Fallo al instalar dependencias de Node.
    pause
    exit /b
)

echo.
echo ==========================================
echo    TODO LISTO - INICIANDO SERVIDORES
echo ==========================================
echo.

start "API SERVER" cmd /k "cd ..\backend && venv\Scripts\activate && set FLASK_APP=app.main:crear_app && set FLASK_DEBUG=1 && flask run --port 5000"
start "WEB FRONTEND" cmd /k "npm run dev"

echo Servidores lanzados.
echo Web: http://localhost:5173
echo API: http://localhost:5000
echo.
pause
