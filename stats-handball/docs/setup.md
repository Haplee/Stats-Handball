# Configuración del Entorno de Desarrollo - Handball AI

## 1. Requisitos Previos

-   **Python 3.9+**
-   **Node.js y npm** (para futuras mejoras del frontend)
-   **Git**

## 2. Instalación del Backend

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu_usuario/handball_ai.git
    cd handball_ai/stats-handball
    ```

2.  **Crear y activar un entorno virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows: venv\Scripts\activate
    ```

3.  **Instalar las dependencias de Python:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Iniciar el servidor del backend:**
    ```bash
    python backend/app.py
    ```
    El servidor estará disponible en `http://127.0.0.1:5000`.

## 3. Instalación del Frontend

Actualmente, el frontend se sirve directamente desde el backend, por lo que no requiere un paso de instalación por separado. Simplemente abre tu navegador y ve a `http://127.0.0.1:5000`.

## 4. Ejecución de Pruebas

Para asegurarte de que todo funciona correctamente, puedes ejecutar las pruebas automatizadas:

```bash
python -m pytest backend/tests/
```

## 5. Contribución

Si deseas contribuir al proyecto, por favor, sigue las siguientes pautas:

1.  Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
2.  Realiza tus cambios y haz commit (`git commit -m "feat: añadir nueva funcionalidad"`).
3.  Abre un Pull Request a la rama `main`.
4.  Asegúrate de que todas las pruebas pasen.