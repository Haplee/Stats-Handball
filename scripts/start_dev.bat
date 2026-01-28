@echo off
setlocal enabledelayedexpansion

:: ---------------------------------------------------------
:: 0. PREPARACION BASICA
:: ---------------------------------------------------------
set "SYS32=%SystemRoot%\System32"
set "PATH=%SYS32%;%SystemRoot%;%SystemRoot%\System32\Wbem;%PATH%"
:: Ir a la raiz del proyecto
cd /d "%~dp0.."

:: Limpiar pantalla
cls

:: ---------------------------------------------------------
:: 1. VERIFICACION DE "DOCKER DESKTOP" VS "WSL NATIVO"
:: ---------------------------------------------------------
echo [*] Analizando entorno...

set MODO_USO=DESCONOCIDO

:: Buscamos si Docker Desktop esta ejecutandose en Windows
"%SYS32%\tasklist.exe" /FI "IMAGENAME eq Docker Desktop.exe" | "%SYS32%\find.exe" /I "Docker Desktop.exe" >nul
if %errorlevel% equ 0 (
    set MODO_USO=DESKTOP
    echo     - Detectado: Docker Desktop (Windows)
) else (
    :: Si no esta en Windows, comprobamos WSL
    "%SYS32%\wsl.exe" docker info >nul 2>&1
    if !errorlevel! equ 0 (
        set MODO_USO=WSL
        echo     - Detectado: Motor Nativo (WSL/Linux)
    )
)

if "%MODO_USO%"=="DESCONOCIDO" (
    echo.
    echo [ERROR CRITICO] No se detecto Docker arrancado.
    echo 1. Abre "Docker Desktop" y espera a que este listo.
    echo 2. Si el problema persiste, ejecuta: scripts\repair.bat
    echo 3. Vuelve a ejecutar este archivo.
    echo.
    pause
    exit /b
)

:: ---------------------------------------------------------
:: 2. VERIFICACION DE PERMISOS DE ADMINISTRADOR
:: ---------------------------------------------------------
"%SYS32%\net.exe" session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo [!] IMPORTANTE: RECUPERAR ACCESO DE RED
    echo     Para que tu movil pueda conectarse, necesitamos configurar Windows.
    echo.
    echo     Por favor, acepta la ventana de Administrador que saldra ahora.
    echo.
    
    :: Truco para elevar sin bucle infinito: usamos un archivo temporal vbs
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~f0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /b
)

:: ---------------------------------------------------------
:: 3. CONFIGURACION DE RED (SEGUN EL MODO)
:: ---------------------------------------------------------
echo [*] Configurando red...

:: A. Firewall (Siempre necesario)
"%SYS32%\netsh.exe" advfirewall firewall delete rule name="Stats Handball Web" >nul 2>&1
"%SYS32%\netsh.exe" advfirewall firewall add rule name="Stats Handball Web" dir=in action=allow protocol=TCP localport=80 profile=any >nul 2>&1

:: B. Puente (SOLO para WSL nativo. Si usas Desktop, ESTO ROMPE LA RED, asi que lo borramos)
if "%MODO_USO%"=="DESKTOP" (
    :: Aseguramos que NO haya puente molestando a Docker Desktop
    "%SYS32%\netsh.exe" interface portproxy delete v4tov4 listenport=80 listenaddress=0.0.0.0 >nul 2>&1
)

if "%MODO_USO%"=="WSL" (
    :: En modo WSL nativo, SI necesitamos el puente
    for /f "usebackq tokens=*" %%a in (`powershell -Command "wsl -e hostname -I" 2^>nul`) do (
        for /f "tokens=1" %%b in ("%%a") do set WSL_IP=%%b
    )
    if not "!WSL_IP!"=="" (
        "%SYS32%\netsh.exe" interface portproxy delete v4tov4 listenport=80 listenaddress=0.0.0.0 >nul 2>&1
        "%SYS32%\netsh.exe" interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=!WSL_IP! >nul 2>&1
    )
)

:: ---------------------------------------------------------
:: 4. ARRANQUE FINAL
:: ---------------------------------------------------------
cls
echo =======================================================
echo   SERVIDOR LISTO PARA ACCEDER
echo =======================================================
echo   PC Local: http://localhost
echo.
echo   MOVIL / TABLET (Cualquiera de estas IP):
"%SYS32%\ipconfig.exe" | "%SYS32%\findstr.exe" /i "IPv4"
echo =======================================================
echo   Iniciando aplicacion... (Modo: %MODO_USO%)
echo.

if "%MODO_USO%"=="WSL" (
    for /f "usebackq tokens=*" %%a in (`"%SYS32%\wsl.exe" wslpath -u "%CD%"`) do set WSL_PATH=%%a
    "%SYS32%\wsl.exe" -e bash -c "cd '!WSL_PATH!' && (docker compose up --build || docker-compose up --build)"
)

if "%MODO_USO%"=="DESKTOP" (
    docker-compose up --build
)

pause
