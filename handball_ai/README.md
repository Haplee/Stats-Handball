# Handball AI Analytics Platform

## 1. Descripción del Proyecto

**Handball AI** es una plataforma de análisis de vídeo avanzada, diseñada para extraer automáticamente estadísticas detalladas de partidos de balonmano (pista y playa). Utilizando tecnologías de última generación en Visión por Computador e Inteligencia Artificial, el sistema procesa grabaciones de partidos para identificar jugadores, seguir sus movimientos y reconocer acciones clave como lanzamientos, goles, paradas y pases.

El objetivo es proporcionar a entrenadores, jugadores y analistas herramientas poderosas para evaluar el rendimiento, tomar decisiones tácticas informadas y mejorar el entrenamiento, todo ello a través de una interfaz web intuitiva.

## 2. Pila Tecnológica (Tech Stack)

- **Lenguaje Principal**: Python 3.9+
- **Backend**: Flask
- **Base de Datos**: SQLite (para desarrollo), preparada para PostgreSQL (en producción).
- **Procesamiento de IA/Visión**:
    - **Framework de Deep Learning**: PyTorch
    - **Detección de Objetos**: YOLOv8 (Ultralytics)
    - **Procesamiento de Vídeo**: OpenCV
    - **Tracking**: ByteTrack
- **Frontend**: HTML5, CSS3, JavaScript (preparado para migrar a React).

## 3. Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu_usuario/handball_ai.git
    cd handball_ai
    ```

2.  **Crear y activar un entorno virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows: venv\Scripts\activate
    ```

3.  **Instalar las dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Iniciar el servidor:**
    Desde el directorio raíz del proyecto (el que contiene la carpeta `handball_ai`), ejecuta:
    ```bash
    python -m handball_ai.backend.app
    ```

## 4. Uso

Accede a `http://127.0.0.1:5000` en tu navegador y sube un vídeo para analizar.

## 5. Roadmap Futuro

-   [ ] **Procesamiento en Tiempo Real**
-   [ ] **OCR para Dorsales**
-   [ ] **Reconocimiento de Acciones Avanzado**
-   [ ] **Análisis de Balonmano Playa**
-   [ ] **Dashboard Interactivo Avanzado (React)**
