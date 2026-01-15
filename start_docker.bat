@echo off
echo ===========================================
echo    Stats Handball - INICIAR CON DOCKER
echo ===========================================
echo.

echo Verificando Docker...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no esta en ejecucion.
    echo.
    echo Por favor, abre "Docker Desktop" en Windows y espera a que arranque.
    echo Cuando el icono de la ballena deje de moverse, presiona cualquier tecla.
    pause
    goto :check
)

:check
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Aun no detecto Docker... reintentando en 5 segundos...
    timeout /t 5 >nul
    goto :check
)

echo [OK] Docker detectado. Construyendo e iniciando contenedores...
echo Esto puede tardar unos minutos la primera vez.

docker-compose up --build

echo.
echo Si ves este mensaje, es que se paro la ejecucion.
pause
