# Plataforma de Análisis de Balonmano con IA (TFG ASIR)

Este repositorio contiene el código fuente para una plataforma web distribuida diseñada para el análisis automático de partidos de balonmano mediante técnicas de Visión Artificial e Inteligencia Artificial. Este proyecto es el Trabajo de Fin de Grado (TFG) para el ciclo de Administración de Sistemas Informáticos en Red (ASIR).

## 📝 Descripción del Proyecto

El objetivo principal de este TFG es desarrollar una solución completa y escalable que permita a entrenadores, analistas y aficionados subir grabaciones de partidos de balonmano y obtener métricas detalladas y visualizaciones sobre el rendimiento de los jugadores y las tácticas del equipo.

### Funcionalidades Clave
- **Registro y Autenticación de Usuarios:** Sistema seguro para la gestión de cuentas.
- **Subida de Vídeos:** Permite subir archivos de vídeo directamente o enlazar desde plataformas como YouTube.
- **Procesamiento Asíncrono:** Las tareas de análisis de vídeo se ejecutan en segundo plano para no bloquear la interfaz de usuario.
- **Detección y Seguimiento:** Identificación de jugadores, porteros y el balón a lo largo del vídeo.
- **Generación de Métricas:** Cálculo de estadísticas como mapas de calor, velocidad de jugadores, efectividad de lanzamientos, etc.
- **Visualización de Resultados:** Un panel de control intuitivo para mostrar los datos analizados.

## 🏛️ Arquitectura

La plataforma está diseñada siguiendo una arquitectura de microservicios, donde cada componente es independiente, escalable y está contenedorizado con Docker. La orquestación se realiza a través de `docker-compose`.

```
+-----------------+      +-----------------+      +-----------------+
|   Usuario       |----->|      Nginx      |<---->|    Frontend     |
| (Navegador Web) |      | (Reverse Proxy) |      | (HTML/JS/React) |
+-----------------+      +-----------------+      +-----------------+
                             |
                             |
           +-----------------v-----------------+
           |                 Red               |
           |             (app-network)         |
           +-----------------^-----------------+
                             |
           +-----------------v-----------------+
           |                                   |
    +------v------+     +------v------+     +------v------+
    |   Backend   |---->|    Redis    |<----|    Worker   |
    | (Flask API) |     | (Cola de    |     |   (Celery)  |
    |             |     |   Tareas)   |     | (Análisis IA) |
    +------^------+     +-------------+     +-------------+
           |
           |
    +------v------+
    |  PostgreSQL |
    |   (Base de  |
    |    Datos)   |
    +-------------+

```

### Componentes
- **Nginx:** Actúa como proxy inverso, dirigiendo el tráfico a los servicios de frontend y backend.
- **Frontend:** La interfaz de usuario. Una aplicación web estática o de una sola página (SPA).
- **Backend (Flask):** Una API REST que gestiona la lógica de negocio, usuarios, vídeos y tareas.
- **Worker (Celery):** Un servicio desacoplado que consume tareas de una cola (Redis) para procesar los vídeos. Aquí reside la lógica de IA.
- **Redis:** Un broker de mensajes que funciona como cola para las tareas de Celery.
- **PostgreSQL:** La base de datos relacional para almacenar información de usuarios, vídeos, y resultados del análisis.

## 💻 Tecnologías Utilizadas

- **Contenerización:** Docker, Docker Compose
- **Backend:** Python, Flask, SQLAlchemy
- **Base de Datos:** PostgreSQL
- **Cola de Tareas:** Redis, Celery
- **Frontend:** HTML5, CSS3, JavaScript (potencialmente un framework como React o Vue)
- **Proxy Inverso:** Nginx
- **IA (placeholders):** OpenCV, PyTorch/TensorFlow (para modelos como YOLO)

## 🚀 Instalación y Arranque

Sigue estos pasos para levantar el entorno de desarrollo local.

### Prerrequisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Pasos
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/handball-ai-platform.git
   cd handball-ai-platform
   ```

2. **Configura las variables de entorno:**
   Copia el archivo de ejemplo `.env.example` y renómbralo a `.env`.
   ```bash
   cp .env.example .env
   ```
   *Puedes modificar las credenciales si lo deseas, pero la configuración por defecto está lista para desarrollo.*

3. **Construye y levanta los contenedores:**
   
   Ejecuta el script de inicio en la raíz del proyecto (Windows):
   ```cmd
   .\start.bat
   ```
   
   O si prefieres manual:
   ```bash
   docker-compose up -d --build
   ```

4. **Accede a la aplicación:**
   Una vez que todos los contenedores estén en funcionamiento, abre tu navegador y visita:
   `http://localhost`

### Detener la aplicación
Para detener todos los servicios, ejecuta:
```bash
docker compose down
```

## 📂 Estructura del Proyecto
```
handball-ai-platform/
├── docker-compose.yml        # Orquestación de servicios
├── .env.example              # Plantilla de variables de entorno
├── README.md                 # Este archivo
├── docs/                     # Documentación adicional
│   ├── architecture.md
│   └── deployment.md
├── nginx/                    # Configuración del proxy inverso
│   ├── Dockerfile
│   └── default.conf
├── backend/                  # Servicio de la API (Flask)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
├── worker/                   # Servicio de procesamiento (Celery)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ai/
├── frontend/                 # Interfaz de usuario
│   ├── Dockerfile
│   ├── index.html
│   └── app.js
└── scripts/                  # Scripts útiles
    └── init_db.sh
```

## 🛣️ Próximos Pasos

- [x] **Backend:** Implementar endpoints CRUD para usuarios y vídeos.
- [x] **Backend:** Desarrollar la lógica de subida de archivos (Vinculada a Usuarios).
- [x] **Backend:** Integrar Celery para la creación de tareas asíncronas.
- [x] **Worker:** Implementar el pipeline de procesamiento de vídeo (descarga, análisis, guardado).
- [x] **Worker:** Integrar un modelo de detección de objetos (YOLO).
- [x] **Frontend:** Dashboard interactivo, subida de archivos/YouTube y gestión de biblioteca (Implementado).
- [x] **Base de Datos:** Definir los modelos de datos con SQLAlchemy.
- [x] **Seguridad:** Autenticación estricta por Sesión/Cookies implementada.
- [x] **QA:** Suite de tests unitarios verificado para Backend y Worker.
- [ ] **CI/CD:** Configurar un pipeline de integración y despliegue continuo.
