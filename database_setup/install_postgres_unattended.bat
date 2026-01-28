@echo off
setlocal

:: ============================================================================
:: SCRIPT DE INSTALACION AUTOMATIZADA DE POSTGRESQL (DESATENDIDA)
:: Para Windows
:: ============================================================================

:: 1. Variables de Configuracion
set PG_VERSION=16
set PG_PASSWORD=supersecretpassword
set PG_PORT=5432
set INSTALL_DIR="C:\Program Files\PostgreSQL\%PG_VERSION%"
set DATA_DIR="C:\Program Files\PostgreSQL\%PG_VERSION%\data"

:: NOTA: Idealmente, descarga el instalador del sitio oficial.
:: Como no podemos navegar/descargar archivos directamente en este script de manera fiable sin dependencias,
:: asumimos que el instalador esta presente o usamos 'winget' (Gestor de Paquetes de Windows).

echo [*] Comprobando instalacion existente de PostgreSQL...
sc query postgresql-x64-%PG_VERSION% >nul 2>&1
if %errorlevel% equ 0 (
    echo [!] El servicio PostgreSQL %PG_VERSION% ya esta instalado y corriendo.
    echo     Saltando instalacion.
    goto :END
)

echo [*] Intentando instalar PostgreSQL %PG_VERSION% usando WinGet...
echo     (Esto requiere conexion a internet y WinGet instalado en Windows 10/11)

:: Intentar instalar usando WinGet silenciosamente
winget install --id PostgreSQL.PostgreSQL --version 16 --silent --scope machine --accept-package-agreements --accept-source-agreements --override "--unattendedmodeui minimal --mode unattended --superpassword %PG_PASSWORD% --serverport %PG_PORT%"

if %errorlevel% neq 0 (
    echo [!] La instalacion con WinGet fallo o WinGet no esta disponible.
    echo.
    echo [*] METODO ALTERNATIVO:
    echo     1. Descarga el instalador manualmente de: https://get.enterprisedb.com/postgresql/postgresql-16.1-1-windows-x64.exe
    echo     2. Colocalo en esta carpeta.
    echo     3. Renombralo a 'postgresql-installer.exe'
    echo     4. Ejecuta este script de nuevo.
    
    if exist postgresql-installer.exe (
        echo [*] Instalador local encontrado. Instalando...
        postgresql-installer.exe --mode unattended --unattendedmodeui minimal --superpassword %PG_PASSWORD% --serverport %PG_PORT%
    ) else (
        echo [ERROR] No se encontro instalador. Por favor instala WinGet o descarga el instalador manualmente.
        goto :FAIL
    )
)

echo.
echo [OK] Proceso de instalacion completado.
echo     Usuario: postgres
echo     Contraseña: %PG_PASSWORD%
echo     Puerto: %PG_PORT%

:END
echo Presiona cualquier tecla para salir...
pause
exit /b 0

:FAIL
echo La instalacion fallo.
pause
exit /b 1
