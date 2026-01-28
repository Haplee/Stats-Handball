@echo off
setlocal enabledelayedexpansion
title Herramienta de Reparacion Avanzada - Stats Handball

:: Cambiar al directorio raiz del proyecto (padre de reparar-docker)
pushd "%~dp0\.."

:MENU
cls
echo =========================================================
echo   HERRAMIENTA DE REPARACION DOCKER - STATS HANDBALL
echo =========================================================
echo Directorio actual: %CD%
echo.
echo Selecciona el nivel de reparacion que necesitas:
echo.
echo [1] Reparacion Estandar (Recomendado)
echo     - Reinicia contenedores, borra volumenes y reconstruye.
echo     - Soluciona la mayoria de errores (DB, codigo, dependencias).
echo.
echo [2] Reinicio de Entorno Docker/WSL (Error "Context Canceled")
echo     - Reinicia el subsistema WSL (Linux).
echo     - Util si Docker se queda colgado, no conecta o da timeout.
echo     - Requiere reiniciar Docker Desktop manualmente despues.
echo.
echo [3] Limpieza Profunda (Purga Total - ELIMINA TODO)
echo     - Borra TODAS las imagenes, volumenes y cache del sistema.
echo     - Usar si la reparacion estandar falla repetidamente.
echo     - La reconstruccion tardara mas tiempo.
echo.
echo [4] Diagnostico de Puertos
echo     - Verifica si los puertos 5432, 5000 o 3000 estan ocupados.
echo.
echo [5] Salir
echo.
echo =========================================================
set /p op="Selecciona una opcion (1-5): "

if "%op%"=="1" goto STANDARD
if "%op%"=="2" goto WSL_RESET
if "%op%"=="3" goto DEEP_CLEAN
if "%op%"=="4" goto CHECK_PORTS
if "%op%"=="5" goto EXIT
goto MENU

:STANDARD
cls
echo.
echo ===================================================
echo   INICIANDO REPARACION ESTANDAR
echo ===================================================
echo.
echo [1/4] Verificando Docker...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no esta corriendo.
    echo Por favor inicia Docker Desktop y espera a que arranque.
    pause
    goto MENU
)

echo.
echo [2/4] Deteniendo contenedores y eliminando volumenes...
docker-compose down --volumes --remove-orphans
if %errorlevel% neq 0 (
    echo [WARN] Alerta al detener contenedores. Intentando continuar...
)

echo.
echo [3/4] Limpieza de redes...
docker network prune -f >nul 2>&1

echo.
echo [4/4] Levantando entorno (Build)...
docker-compose up -d --build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Fallo al levantar los servicios.
    echo Revisa los logs de error arriba.
    pause
    goto MENU
)

goto SUCCESS_CHECK

:WSL_RESET
cls
echo.
echo ===================================================
echo   REINICIO DE WSL (SUBSISTEMA LINUX)
echo ===================================================
echo.
echo Esto forzara el cierre de todas las distribuciones Linux (incluyendo Docker).
echo Docker Desktop se detendra.
echo.
echo Pasos que ocurriran:
echo 1. Se apagara WSL.
echo 2. Deberas abrir Docker Desktop manualmente.
echo.
pause
echo.
echo [*] Apagando WSL... (wsl --shutdown)
wsl --shutdown
echo.
echo [!!!] WSL APAGADO [!!!]
echo.
echo AHORA:
echo 1. Abre Docker Desktop desde tu menu Inicio.
echo 2. Espera a que termine de iniciar (icono verde/fijo).
echo 3. Vuelve a esta ventana.
echo.
pause
echo.
echo [*] Comprobando si Docker volvio...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker aun no responde.
    echo Intenta esperar un poco mas o reinicia este script.
    pause
    goto MENU
)
echo [OK] Docker detectado.
echo Quieres proceder con la Reparacion Estandar ahora? (S/N)
set /p resp="> "
if /i "%resp%"=="S" goto STANDARD
goto MENU

:DEEP_CLEAN
cls
echo.
echo ===================================================
echo   LIMPIEZA PROFUNDA (NUCLEAR)
echo ===================================================
echo.
echo ESTAS SEGURO? Se borrara TODO (Imagenes, Cache, Volumenes).
echo Tendra que descargar todo de nuevo.
echo.
set /p confirm="Escribe 'BORRAR' para confirmar: "
if /i not "%confirm%"=="BORRAR" goto MENU

echo.
echo [*] Ejecutando purga del sistema Docker...
docker system prune -a --volumes -f
echo.
echo [*] Limpieza completada.
echo.
echo Iniciando reconstruccion...
goto STANDARD

:CHECK_PORTS
cls
echo.
echo ===================================================
echo   DIAGNOSTICO DE PUERTOS
echo ===================================================
echo.
echo Buscando procesos en puertos clave...
echo.
echo [Puerto 5432 - Base de Datos]
netstat -ano | findstr :5432
if %errorlevel% neq 0 echo [LIBRE] Ningun proceso detectado en 5432.

echo.
echo [Puerto 5000 - Backend]
netstat -ano | findstr :5000
if %errorlevel% neq 0 echo [LIBRE] Ningun proceso detectado en 5000.

echo.
echo [Puerto 3000 - Frontend]
netstat -ano | findstr :3000
if %errorlevel% neq 0 echo [LIBRE] Ningun proceso detectado en 3000.

echo.
echo NOTA: Si ves lineas con "LISTENING", el puerto esta ocupado.
echo Si Docker no esta corriendo, identifica el PID (numero a la derecha)
echo y cierralo desde el Administrador de Tareas si es un proceso fantasma.
echo.
pause
goto MENU

:SUCCESS_CHECK
echo.
echo ===================================================
echo   ESTADO FINAL
echo ===================================================
timeout /t 5 >nul
docker ps
echo.
echo Si ves tus servicios (db, backend, frontend...) "Up", todo esta correcto.
echo Puedes cerrar esta ventana.
pause
exit /b

:EXIT
popd
exit /b
