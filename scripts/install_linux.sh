#!/bin/bash

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================================${NC}"
echo -e "${GREEN}   AUTO-INSTALADOR Y LANZADOR - STATS HANDBALL (LINUX)   ${NC}"
echo -e "${GREEN}=========================================================${NC}"
echo ""

# 1. Comprobar si Docker está instalado
if command -v docker &> /dev/null; then
    echo -e "${GREEN}[OK] Docker ya está instalado.${NC}"
else
    echo -e "${RED}[!] Docker no encontrado. Iniciando instalación...${NC}"
    
    # Actualizar e instalar dependencias básicas
    if [ -x "$(command -v apt-get)" ]; then
        echo "[*] Detectado sistema basado en Debian/Ubuntu..."
        sudo apt-get update
        sudo apt-get install -y ca-certificates curl gnupg
    fi

    # Usar el script oficial de conveniencia de Docker
    echo "[*] Descargando e instalando Docker Engine..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    rm get-docker.sh

    echo "[*] Añadiendo usuario actual al grupo docker (para evitar sudo)..."
    sudo usermod -aG docker $USER
    
    echo -e "${GREEN}[OK] Instalación completada.${NC}"
    echo -e "${RED}[IMPORTANTE] Necesitas CERRAR SESIÓN y volver a entrar para que los cambios de grupo surtan efecto.${NC}"
    echo "O puedes ejecutar 'newgrp docker' ahora si sabes lo que haces."
    echo "Por favor, reinicia o cierra sesión y vuelve a ejecutar este script."
    exit 0
fi

# 2. Comprobar si Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}[!] Docker no está corriendo.${NC}"
    echo "[*] Intentando iniciar el servicio..."
    sudo service docker start || sudo systemctl start docker
    
    sleep 3
    if ! docker info > /dev/null 2>&1; then
        echo "[ERROR] No se pudo iniciar Docker. Revisa los logs o inícialo manualmente."
        exit 1
    fi
fi

# 3. Lanzar la aplicación
echo ""
echo -e "${GREEN}=========================================================${NC}"
echo -e "${GREEN}   LANZANDO LA APLICACIÓN (SERVER + CLIENT)              ${NC}"
echo -e "${GREEN}=========================================================${NC}"

# Ir al directorio raíz del proyecto (padre de este script)
cd "$(dirname "$0")/.."

echo "[*] Construyendo y levantando contenedores..."
# Intentar usar el plugin 'docker compose' (v2), si falla usar 'docker-compose' (v1)
if docker compose version > /dev/null 2>&1; then
    docker compose up -d --build
else
    docker-compose up -d --build
fi

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}[EXITO] Aplicación desplegada correctamente.${NC}"
    echo "Frontend: http://localhost:3000"
    echo "Backend:  http://localhost:5000"
else
    echo -e "${RED}[ERROR] Algo falló al levantar los contenedores.${NC}"
fi
