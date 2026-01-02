# Roadmap del Proyecto - Handball AI

## 1. Visión General

Este documento describe la hoja de ruta para el desarrollo futuro de la plataforma **Handball AI**. El objetivo es evolucionar desde la prueba de concepto actual hasta una herramienta de análisis de vídeo completa y robusta.

## 2. Hitos a Corto Plazo (Próximos 3 meses)

-   [ ] **Mejorar la precisión del modelo de detección**
    -   Reentrenar el modelo YOLOv8 con un dataset más grande y diverso.
    -   Implementar técnicas de aumento de datos.
-   [ ] **Añadir reconocimiento de acciones básicas**
    -   Clasificación de lanzamientos (gol, parada, fuera).
    -   Detección de pases entre jugadores.
-   [ ] **Refactorizar el frontend con React**
    -   Migrar la interfaz de usuario a componentes de React.
    -   Implementar un dashboard de estadísticas interactivo.
-   [ ] **Optimizar el rendimiento del procesamiento de vídeo**
    -   Implementar el procesamiento en paralelo de frames.
    -   Utilizar colas de tareas (Celery, RQ) para gestionar el procesamiento.

## 3. Hitos a Mediano Plazo (3-6 meses)

-   [ ] **Implementar análisis de balonmano playa**
    -   Adaptar el modelo de detección a las condiciones del balonmano playa.
    -   Añadir reglas y estadísticas específicas de esta modalidad.
-   [ ] **Desarrollar un sistema de autenticación de usuarios**
    -   Permitir a los usuarios registrarse y gestionar sus propios vídeos.
-   [ ] **Crear un panel de administración**
    -   Gestionar usuarios, vídeos y estadísticas.
-   [ ] **Añadir soporte para múltiples cámaras**
    -   Sincronizar y analizar vídeos de diferentes ángulos.

## 4. Hitos a Largo Plazo (6+ meses)

-   [ ] **Implementar procesamiento en tiempo real**
    -   Analizar retransmisiones de vídeo en directo.
-   [ ] **Añadir reconocimiento de dorsales (OCR)**
    -   Identificar a los jugadores por el número de su camiseta.
-   [ ] **Generar informes y visualizaciones avanzadas**
    -   Mapas de calor, trayectorias de jugadores, análisis de jugadas.
-   [ ] **Integrar con plataformas de terceros**
    -   Exportar datos a otras herramientas de análisis deportivo.
-   [ ] **Desarrollar una aplicación móvil**
    -   Permitir a los usuarios acceder a las estadísticas desde sus dispositivos móviles.