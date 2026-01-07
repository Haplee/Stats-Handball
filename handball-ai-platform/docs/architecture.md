# Arquitectura de la Plataforma

Este documento detalla la arquitectura de la plataforma de análisis de balonmano, los componentes que la conforman y las decisiones de diseño tomadas.

## 1. Visión General

La arquitectura se basa en un enfoque de **microservicios**, donde las responsabilidades se dividen en servicios independientes y desacoplados. Esto facilita la escalabilidad, el mantenimiento y el desarrollo paralelo. La contenerización con **Docker** asegura la portabilidad y la consistencia entre los entornos de desarrollo, pruebas y producción.

![Diagrama de Arquitectura](https://i.imgur.com/3Z6Bq2c.png)
*Diagrama de flujo de datos y comunicación entre servicios.*

## 2. Componentes Principales

### 2.1. Nginx (Reverse Proxy)
- **Responsabilidad:** Es el punto de entrada único para todas las solicitudes HTTP. Enruta el tráfico hacia el frontend o el backend según la URL solicitada.
- **Justificación:** Centraliza la gestión del tráfico, simplifica la configuración de SSL/TLS y puede actuar como balanceador de carga si el backend se escala horizontalmente.

### 2.2. Frontend
- **Responsabilidad:** Proporcionar la interfaz gráfica con la que interactúan los usuarios.
- **Tecnología:** Puede ser una aplicación de una sola página (SPA) construida con un framework moderno (como React, Vue o Svelte) o una web simple con HTML, CSS y JavaScript. Inicialmente, se implementa una versión mínima.
- **Comunicación:** Se comunica exclusivamente con el backend a través de su API REST.

### 2.3. Backend (API Flask)
- **Responsabilidad:** Gestionar la lógica de negocio de la aplicación.
  - Autenticación y gestión de usuarios.
  - Gestión de metadatos de vídeos (subida, consulta, estado).
  - Creación y envío de tareas de procesamiento al worker a través de la cola de Redis.
  - Exposición de los resultados del análisis a través de endpoints.
- **Tecnología:** Flask es un micro-framework de Python ligero y flexible, ideal para APIs.
- **Comunicación:** Se comunica con la base de datos PostgreSQL para persistencia, con Redis para encolar tareas y responde a las solicitudes del frontend.

### 2.4. Worker (Celery)
- **Responsabilidad:** Ejecutar las tareas de procesamiento de vídeo que son computacionalmente intensivas.
  - Descargar el vídeo.
  - Aplicar modelos de IA para detección y seguimiento.
  - Generar y calcular métricas.
  - Actualizar la base de datos con los resultados.
- **Tecnología:** Celery es un sistema de colas de tareas distribuidas y asíncronas. Es ideal para ejecutar trabajos en segundo plano sin bloquear la API principal.
- **Comunicación:** Escucha nuevas tareas en la cola de Redis y, una vez finalizado el procesamiento, escribe los resultados en la base de datos PostgreSQL.

### 2.5. PostgreSQL (Base de Datos)
- **Responsabilidad:** Almacenar de forma persistente todos los datos relacionales de la aplicación.
  - Tabla de usuarios.
  - Tabla de vídeos (metadatos, URL, estado del procesamiento).
  - Tablas para los resultados del análisis (métricas, coordenadas, etc.).
- **Justificación:** Es una base de datos de código abierto potente, fiable y con un amplio soporte en el ecosistema de Python.

### 2.6. Redis (Cola de Tareas)
- **Responsabilidad:** Actuar como un intermediario (broker) entre el backend y el worker.
- **Justificación:** Redis es una base de datos en memoria extremadamente rápida, perfecta para ser utilizada como cola de mensajes. Garantiza que las tareas se entreguen al worker de manera fiable.

## 3. Flujo de Trabajo (Subida y Procesamiento de un Vídeo)

1.  **Subida:** El usuario sube un archivo de vídeo a través del **frontend**.
2.  **Recepción:** El **frontend** envía el vídeo al endpoint de subida del **backend**.
3.  **Almacenamiento Inicial:** El **backend** guarda el vídeo en un volumen compartido (`videos`) y crea una nueva entrada en la tabla de vídeos de **PostgreSQL** con el estado "pendiente".
4.  **Encolado de Tarea:** El **backend** crea una tarea de Celery (por ejemplo, `process_video(video_id)`) y la envía a **Redis**.
5.  **Respuesta al Usuario:** El **backend** responde inmediatamente al **frontend**, confirmando que el vídeo ha sido recibido y está en cola para ser procesado.
6.  **Consumo de Tarea:** Un **worker** de Celery que está escuchando en la cola de **Redis** recoge la tarea.
7.  **Procesamiento IA:** El **worker** accede al vídeo desde el volumen compartido y ejecuta el pipeline de IA (detección, tracking, análisis). Durante este proceso, puede actualizar el estado del vídeo en la base de datos (por ejemplo, a "procesando").
8.  **Guardado de Resultados:** Una vez completado, el **worker** guarda los resultados (métricas, datos JSON, etc.) en las tablas correspondientes de **PostgreSQL**.
9.  **Actualización de Estado Final:** El **worker** actualiza el estado del vídeo en la base de datos a "completado".
10. **Visualización:** El usuario, a través del **frontend**, puede consultar el estado del vídeo. Cuando está "completado", el **frontend** solicita los resultados al **backend** para visualizarlos.
