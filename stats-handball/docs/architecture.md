# Arquitectura del Proyecto - Handball AI

## 1. Visión General

Este documento describe la arquitectura de la plataforma **Handball AI**, diseñada para ser escalable, modular y mantenible. La aplicación se divide en dos componentes principales: un **backend** encargado del procesamiento de vídeo y la lógica de negocio, y un **frontend** que proporciona la interfaz de usuario.

## 2. Arquitectura del Backend

El backend está construido con **Flask**, un micro-framework de Python que ofrece flexibilidad y simplicidad.

### Componentes Clave:

-   **`app.py`**: Punto de entrada de la aplicación Flask.
-   **`/routes`**: Define los endpoints de la API (ej. `/upload`, `/stats`).
-   **`/services`**: Contiene la lógica de negocio (procesamiento de vídeo, IA).
-   **`/models`**: Define los modelos de datos para la base de datos.
-   **`/database`**: Gestiona la conexión y las sesiones de la base de datos.
-   **`/tests`**: Pruebas unitarias y de integración.

## 3. Arquitectura del Frontend

El frontend es una aplicación de una sola página (SPA) construida con HTML, CSS y JavaScript.

### Componentes Clave:

-   **`/views`**: Contiene los archivos HTML de las diferentes pantallas.
-   **`/assets`**: Almacena los archivos estáticos (CSS, imágenes).
-   **`/services`**: Gestiona la comunicación con la API del backend.
-   **`/components`**: (Futuro) Contendrá componentes reutilizables de la interfaz.

## 4. Flujo de Datos

1.  **Carga de Vídeo**: El usuario sube un vídeo a través del frontend.
2.  **Procesamiento**: El backend recibe el vídeo y lo procesa utilizando un modelo de IA.
3.  **Resultados**: Las estadísticas se almacenan en la base de datos.
4.  **Visualización**: El frontend solicita y muestra los resultados de la API.

## 5. Pila Tecnológica

-   **Backend**: Python, Flask, SQLAlchemy
-   **Frontend**: HTML, CSS, JavaScript
-   **Base de Datos**: SQLite (desarrollo), PostgreSQL (producción)
-   **IA**: PyTorch, YOLOv8, OpenCV