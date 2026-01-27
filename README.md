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
- **Gestión Integral:** Administración de Equipos, Base de Datos de Jugadores y Pizarra Táctica interactiva.

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
   Una vez que todos los contenedores estén en funcionamiento, abre tu navegador:
   
   - **Landing & Documentación:** `http://localhost`
   - **Aplicación (Panel de Control):** `http://localhost/app`

### Detener la aplicación
Para detener todos los servicios, ejecuta:
```bash
docker compose down
```

## 📂 Estructura del Proyecto
```
handball-ai-platform/
├── client-app/               # Aplicación del Cliente (Dashboard, Equipos, Táctica)
│   ├── src/pages/            # Dashboard, Teams, Players, Tactics, Settings...
│   └── tests/                # Tests E2E y unitarios locales
├── frontend/                 # Web Pública (Landing, Roadmap, Docs)
├── backend/                  # API REST (Flask)
├── worker/                   # Motor IA (Celery + YOLO)
├── tests/                    # Infraestructura centralizada de Tests
│   ├── run_tests.bat         # Script de ejecución automática
│   ├── test_api.py           # Verificación de salud del Backend
│   └── results/              # Logs de ejecuciones
└── docker-compose.yml        # Orquestación global
```

## 🧪 Tests Unitarios y de Integración

El proyecto cuenta con una suite de pruebas automatizada para validar tanto la compilación del frontend como la disponibilidad del backend.

Para ejecutar la suite completa:

1. Asegúrate de que los contenedores Docker estén corriendo.
2. Ejecuta el script `tests/run_tests.bat` (Windows).
3. Revisa los resultados en la carpeta `tests/results/`.

```cmd
.\tests\run_tests.bat
```

## 🛣️ Próximos Pasos (Hoja de Ruta)

- [x] **Backend:** API REST segura con autenticación y gestión de archivos.
- [x] **Worker:** Pipeline de IA asíncrono (YOLO + Celery) para procesamiento de vídeo.
- [x] **Frontend:** Web pública de progreso separada de la aplicación principal.
- [x] **Client App:** Suite de aplicaciones completa:
    - [x] **Dashboard:** Subida de vídeos (Local/YouTube) y gestión de librería.
    - [x] **Teams:** Gestión de plantillas y equipos.
    - [x] **Players:** Base de datos de jugadores con estadísticas.
    - [x] **Tactics:** Pizarra táctica interactiva.
    - [x] **Settings:** Configuración de usuario.
- [x] **QA:** Infraestructura de pruebas automatizada (`tests/run_tests.bat`).
- [ ] **IA Avanzada:** Reconocimiento de acciones complejas (pases, fintas).
- [ ] **CI/CD:** Pipeline de despliegue automatizado.
