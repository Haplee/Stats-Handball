# Guía: Cómo usar Docker en Windows SIN Docker Desktop (Vía WSL2)

Sí, es posible y de hecho es la configuración preferida por muchos desarrolladores para evitar los problemas de rendimiento y estabilidad de Docker Desktop en Windows.

**Ventajas:**
* Mucho más ligero (no consume RAM en una interfaz gráfica).
* Evita errores de "conexión" entre Windows y la VM (como el `context canceled`).
* Es 100% gratuito (Docker Desktop requiere licencia para empresas grandes).

**Desventajas:**
* No tienes interfaz gráfica (todo es por comandos).
* Tienes que iniciar el servicio manualmente (o configurar `systemd`).

## Paso 1: Asegúrate de tener WSL2 (Subsistema Linux)
Abre PowerShell como administrador y ejecuta:
```powershell
wsl --update
```
 Si no tienes ninguna distribución de Linux instalada, instala Ubuntu:
```powershell
wsl --install -d Ubuntu
```
*(Reinicia el ordenador si te lo pide).*

## Paso 2: Eliminar Docker Desktop
Si vas a usar este método, se recomienda desinstalar "Docker Desktop" desde "Agregar o quitar programas" para evitar conflictos.

## Paso 3: Instalar el Motor de Docker DENTRO de WSL (Ubuntu)
1. Abre tu terminal de **Ubuntu** (búscala en el menú inicio).
2. Copia y pega estos comandos uno a uno para instalar el motor nativo de Linux:

```bash
# 1. Eliminar versiones viejas
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. Actualizar e instalar dependencias
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 3. Añadir la llave GPG oficial de Docker
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 4. Configurar el repositorio
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Instalar Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

## Paso 4: Configurar permisos (Para no usar 'sudo')
Para poder ejecutar comandos docker sin escribir contraseña cada vez:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

## Paso 5: Iniciar Docker
En este método, Docker no arranca solo al encender el PC (a menos que lo configures). Para iniciarlo cuando vas a trabajar:
```bash
sudo service docker start
```
Verifica que funciona:
```bash
docker ps
```

## ¿Cómo ejecuto mi proyecto ahora?
En lugar de abrir una CMD de Windows, **debes trabajar siempre desde la terminal de Ubuntu**.
1. Abre Ubuntu.
2. Navega a tu proyecto. Como tus archivos están en Windows, están montados en `/mnt/c/`.
```bash
cd /mnt/c/Users/franc/proyecto/Stats-Handball
```
3. Ejecuta tus comandos normalmente:
```bash
docker compose up --build
```

**Nota importante:** El rendimiento es MUCHO mejor si mueves tu código dentro del sistema de archivos de Linux (ej: `~/proyectos/Stats-Handball`) en lugar de leerlo desde `/mnt/c/`, pero funcionará de ambas formas.
