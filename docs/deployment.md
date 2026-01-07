# Guía de Despliegue

Este documento proporciona una guía sobre cómo desplegar la plataforma de análisis de balonmano en un entorno de producción.

## 1. Requisitos Previos

- Un servidor o una máquina virtual (por ejemplo, en AWS, Google Cloud, Azure, DigitalOcean) con una distribución de Linux (se recomienda Ubuntu 20.04 LTS o superior).
- Docker y Docker Compose instalados en el servidor.
- Un nombre de dominio (opcional, pero recomendado para producción).
- Git instalado en el servidor.

## 2. Configuración del Entorno de Producción

A diferencia del entorno de desarrollo, en producción se deben tomar consideraciones adicionales de seguridad, rendimiento y gestión.

### 2.1. Variables de Entorno

Nunca se debe hacer commit del archivo `.env` con credenciales de producción a un repositorio de Git. En su lugar, el archivo `.env` debe ser creado y gestionado directamente en el servidor de producción.

1.  **Clona el repositorio en el servidor:**
    ```bash
    git clone https://github.com/tu-usuario/handball-ai-platform.git
    cd handball-ai-platform
    ```

2.  **Crea el archivo `.env`:**
    Copia la plantilla y edítala con valores seguros para producción.
    ```bash
    cp .env.example .env
    nano .env
    ```

3.  **Valores a cambiar para producción:**
    - `POSTGRES_PASSWORD`: Cambia `password` por una contraseña fuerte y segura.
    - `SECRET_KEY`: Genera una clave secreta aleatoria y larga. Puedes usar `openssl rand -hex 32` para generar una.
    - `FLASK_ENV`: Cambia `development` por `production`.

### 2.2. Base de Datos

Para un entorno de producción, se recomienda encarecidamente utilizar un servicio de base de datos gestionado (como Amazon RDS, Google Cloud SQL) en lugar de ejecutar PostgreSQL en un contenedor. Esto mejora la fiabilidad, la escalabilidad y simplifica las copias de seguridad.

Si decides usar un servicio gestionado:
1.  Crea la instancia de la base de datos en tu proveedor de la nube.
2.  Obtén la URL de conexión.
3.  Actualiza la variable `DATABASE_URL` en tu archivo `.env` con la nueva URL.
4.  Puedes eliminar el servicio `postgres` de tu archivo `docker-compose.yml` para producción.

### 2.3. Almacenamiento de Vídeos

El uso de volúmenes de Docker es adecuado para empezar, pero en un sistema distribuido o escalado, no es una solución robusta. Los archivos de vídeo subidos se perderían si el contenedor se elimina o si se ejecutan múltiples instancias del backend.

La solución recomendada es usar un servicio de almacenamiento de objetos en la nube como **Amazon S3**, **Google Cloud Storage** o similar.
- La lógica de subida en el backend de Flask debería modificarse para enviar los archivos a un bucket de S3.
- El worker debería ser configurado para descargar los vídeos desde el mismo bucket para su procesamiento.

## 3. Despliegue con Docker Compose

Una vez que el entorno está configurado, el proceso de despliegue es similar al de desarrollo.

1.  **Construye las imágenes:**
    Es una buena práctica reconstruir las imágenes para asegurarse de que se incluyen los últimos cambios del código.
    ```bash
    docker compose -f docker-compose.yml build
    ```

2.  **Inicia los servicios:**
    Usa el flag `-d` para ejecutar los contenedores en segundo plano (detached mode).
    ```bash
    docker compose -f docker-compose.yml up -d
    ```

## 4. Configuración de Nginx y HTTPS

Para un sitio en producción, es esencial habilitar HTTPS para cifrar el tráfico.

1.  **Configura tu DNS:**
    Apunta el registro A de tu dominio a la dirección IP pública de tu servidor.

2.  **Usa Certbot con Nginx para obtener un certificado SSL gratuito:**
    Puedes modificar el servicio de Nginx para que gestione automáticamente los certificados SSL/TLS con Let's Encrypt. Esto se puede hacer añadiendo Certbot al contenedor de Nginx o ejecutándolo en el host.

    Una estrategia común es usar una imagen de Nginx que ya incluya Certbot o añadir un servicio de Certbot al `docker-compose.yml`.

    Ejemplo de `default.conf` para producción (escuchando en el puerto 443):
    ```nginx
    server {
        listen 80;
        server_name tu-dominio.com;

        # Redirigir HTTP a HTTPS
        location / {
            return 301 https://$host$request_uri;
        }

        # Ubicación para la renovación de Certbot
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
    }

    server {
        listen 443 ssl;
        server_name tu-dominio.com;

        ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;

        # ... resto de la configuración del proxy ...
    }
    ```

## 5. Monitorización y Mantenimiento

- **Logs:** Revisa regularmente los logs de los contenedores para detectar errores.
  ```bash
  docker compose logs -f <nombre_del_servicio>
  ```
- **Actualizaciones:** Para actualizar la aplicación, haz `git pull` para obtener los últimos cambios, reconstruye las imágenes y reinicia los servicios.
  ```bash
  git pull
  docker compose up --build -d
  ```
- **Copias de Seguridad:** Asegúrate de tener una estrategia de copias de seguridad para la base de datos PostgreSQL y para los archivos de vídeo si no utilizas un servicio de almacenamiento en la nube.
