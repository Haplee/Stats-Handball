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
   Este comando construirá las imágenes de Docker para cada servicio y los iniciará en segundo plano.
   ```bash
   docker compose up --build -d
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
   ├── 📁 .github
   │   └── 📁 workflows
   │       └── ⚙️ python-app.yml
   ├── 📁 backend
   │   ├── 📁 app
   │   │   ├── 📁 models
   │   │   │   ├── 🐍 user.py
   │   │   │   └── 🐍 video.py
   │   │   ├── 📁 routes
   │   │   │   ├── 🐍 api.py
   │   │   │   └── 🐍 auth.py
   │   │   ├── 🐍 celery_utils.py
   │   │   ├── 🐍 config.py
   │   │   ├── 🐍 excel_manager.py
   │   │   ├── 🐍 extensions.py
   │   │   ├── 🐍 main.py
   │   │   └── 🐍 utils.py
   │   ├── 📁 uploads
   │   ├── 🐳 Dockerfile
   │   └── 📄 requirements.txt
   ├── 📁 docs
   │   ├── 📝 architecture.md
   │   └── 📝 deployment.md
   ├── 📁 frontend
   │   ├── 🐳 Dockerfile
   │   ├── 📄 app.js
   │   ├── 🎨 auth.css
   │   ├── 🌐 index.html
   │   ├── 🌐 login.html
   │   └── 🎨 style.css
   ├── 📁 nginx
   │   ├── 🐳 Dockerfile
   │   └── ⚙️ default.conf
   ├── 📁 progress-web
   │   ├── 📁 src
   │   │   ├── 📁 components
   │   │   │   ├── 📄 Features.tsx
   │   │   │   ├── 📄 Footer.tsx
   │   │   │   ├── 📄 Hero.tsx
   │   │   │   ├── 📄 Navbar.tsx
   │   │   │   ├── 📄 Roadmap.tsx
   │   │   │   ├── 📄 StatusGrid.tsx
   │   │   │   └── 📄 TechStack.tsx
   │   │   ├── 📁 data
   │   │   │   └── ⚙️ webs.json
   │   │   ├── 📁 pages
   │   │   │   ├── 📄 FeaturesPage.tsx
   │   │   │   ├── 📄 Home.tsx
   │   │   │   ├── 📄 RoadmapPage.tsx
   │   │   │   ├── 📄 TechPage.tsx
   │   │   │   └── 📄 WebsPage.tsx
   │   │   ├── 📄 App.tsx
   │   │   ├── 🎨 index.css
   │   │   └── 📄 main.tsx
   │   ├── 📝 VERCEL_FIX.md
   │   ├── 🌐 index.html
   │   ├── ⚙️ package.json
   │   ├── ⚙️ tsconfig.app.json
   │   ├── ⚙️ tsconfig.json
   │   ├── ⚙️ tsconfig.node.json
   │   ├── ⚙️ vercel.json
   │   └── 📄 vite.config.ts
   ├── 📁 scripts
   │   └── 📄 init_db.sh
   ├── 📁 worker
   │   ├── 📁 ai
   │   │   ├── 🐍 database.py
   │   │   ├── 🐍 detector.py
   │   │   ├── 🐍 tasks.py
   │   │   ├── 🐍 tracker.py
   │   │   └── 🐍 video.py
   │   ├── 📁 videos
   │   ├── 🐳 Dockerfile
   │   ├── 📄 requirements.txt
   │   └── 📄 yolov8n.pt
   ├── ⚙️ .env.example
   ├── ⚙️ .gitignore
   ├── 📝 README.md
   ├── ⚙️ docker-compose.yml
   ├── ⚙️ vercel.json
   └── 🐍 verifier.py
```

## 🛣️ Próximos Pasos

- [ ] **Backend:** Implementar endpoints CRUD para usuarios y vídeos.
- [ ] **Backend:** Desarrollar la lógica de subida de archivos.
- [ ] **Backend:** Integrar Celery para la creación de tareas asíncronas.
- [ ] **Worker:** Implementar el pipeline de procesamiento de vídeo (descarga, análisis, guardado).
- [ ] **Worker:** Integrar un modelo de detección de objetos (YOLO).
- [ ] **Frontend:** Desarrollar la interfaz para subir vídeos y ver resultados.
- [ ] **Base de Datos:** Definir los modelos de datos con SQLAlchemy.
- [ ] **Seguridad:** Añadir autenticación JWT.
- [ ] **CI/CD:** Configurar un pipeline de integración y despliegue continuo.
