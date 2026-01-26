@echo off
echo [*] Verificando Docker Desktop...

docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker NO esta corriendo o no se detecta.
    echo.
    echo Por favor:
    echo 1. Abre la aplicacion "Docker Desktop" en Windows.
    echo 2. Espera a que el icono de la ballena se ponga verde.
    echo 3. Vuelve a ejecutar este script.
    echo.
    pause
    exit /b 1
)

echo [OK] Docker detectado. Iniciando entorno...
echo.
docker-compose up --build
pause
