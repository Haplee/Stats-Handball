@echo off
setlocal enabledelayedexpansion

echo =========================================================
echo    AUTO-INSTALADOR Y LANZADOR - STATS HANDBALL (WINDOWS)
echo =========================================================
echo.

:: 1. Comprobacion de Permisos de Administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] Este script requiere permisos de Administrador para instalar Docker.
    echo Por favor, haz clic derecho en el archivo y selecciona "Ejecutar como administrador".
    pause
    exit /b
)

:: 2. Comprobacion de Docker
echo [*] Verificando instalacion de Docker...
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Docker ya esta instalado.
    goto LAUNCH_APP
)

echo.
echo [!] Docker no detectado. Iniciando instalacion automatica...
echo Esto descargara e instalara Docker Desktop. Puede tardar unos minutos.
echo.

:: 3. Instalacion via Winget
winget install -e --id Docker.DockerDesktop --accept-package-agreements --accept-source-agreements
if %errorlevel% neq 0 (
    echo [ERROR] Fallo la instalacion con Winget.
    echo Por favor instala Docker Desktop manualmente desde: https://www.docker.com/products/docker-desktop/
    pause
    exit /b
)

echo.
echo =========================================================
echo [IMPORTANTE] INSTALACION FINALIZADA
echo =========================================================
echo 1. Es muy probable que necesites REINICIAR tu ordenador ahora.
echo 2. Despues de reiniciar, abre "Docker Desktop" y acepta los terminos.
echo 3. Una vez Docker este corriendo (ballena verde), vuelve a ejecutar este script para iniciar la app.
echo =========================================================
pause
exit /b

:LAUNCH_APP
echo.
echo [*] Verificando que el servicio Docker esta activo...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ESPERANDO] Docker esta instalado pero no parece estar corriendo.
    echo Por favor, abre la aplicacion "Docker Desktop" y espera a que arranque.
    pause
    goto LAUNCH_APP
)

echo.
echo [OK] Docker esta listo.
echo.
echo =========================================================
echo    LANZANDO LA APLICACION (SERVER + CLIENT)
echo =========================================================
cd /d "%~dp0\.."
docker-compose up -d --build

if %errorlevel% neq 0 (
    echo [ERROR] Algo fallo al levantar los contenedores.
    pause
    exit /b
)

echo.
echo [EXITO] Aplicacion desplegada correctamente.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
pause
