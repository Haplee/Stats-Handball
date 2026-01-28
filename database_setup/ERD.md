# Diagrama Entidad-Relación (ERD) - Stats-Handball

## Diagrama (Mermaid)

```mermaid
erDiagram
    USUARIOS ||--o{ VIDEOS : "sube"
    EQUIPOS ||--o{ JUGADORES : "tiene"
    USUARIOS {
        int id PK
        string nombre_usuario UK
        string email UK
        string password_hash
        string nombre_completo
        string rol
        datetime creado_el
        datetime ultimo_login
    }
    EQUIPOS {
        int id PK
        string nombre
        string categoria
        string nombre_entrenador
        string ruta_logo
        jsonb estadisticas
        datetime creado_el
        datetime actualizado_el
    }
    JUGADORES {
        int id PK
        int equipo_id FK
        string nombre
        int numero
        string posicion
        float altura
        float peso
        date fecha_nacimiento
        string ruta_foto
        jsonb estadisticas
        datetime creado_el
    }
    VIDEOS {
        int id PK
        int usuario_id FK
        string nombre_fichero
        string ruta_fichero
        string url_youtube
        string estado
        int progreso
        jsonb resultados
        datetime creado_el
        datetime actualizado_el
    }
    TACTICAS {
        int id PK
        string nombre
        string text descripcion
        jsonb datos_canvas
        string ruta_imagen
        datetime creado_el
        datetime actualizado_el
    }
```

## Descripciones Detalladas de las Entidades

### 1. USUARIOS (`usuarios`)
Representa a los usuarios registrados de la aplicación.
*   **Clave Primaria:** `id`
*   **Restricciones:** `nombre_usuario` y `email` deben ser únicos. `rol` por defecto es 'user'.
*   **Normalización:** 3FN (Tercera Forma Normal). No hay dependencias transitivas.

### 2. EQUIPOS (`equipos`)
Representa los equipos de balonmano gestionados en el sistema.
*   **Clave Primaria:** `id`
*   **Relaciones:** Un Equipo tiene muchos Jugadores.
*   **Normalización:** 3FN. `estadisticas` es un campo JSONB que almacena datos agregados; aunque técnicamente esto viola la 1FN (atomicidad), es una decisión de diseño deliberada para flexibilidad (estilo NoSQL) dentro de Postgres.

### 3. JUGADORES (`jugadores`)
Representa a los jugadores individuales que pertenecen a un equipo.
*   **Clave Primaria:** `id`
*   **Claves Foráneas:** `equipo_id` referencia a `equipos(id)`.
*   **Relaciones:** Pertenece a un Equipo.
*   **Normalización:**
    *   3FN para campos escalares.
    *   **Control de Redundancia:** `equipo_id` es la única redundancia requerida para la relación. El uso de JSONB para `estadisticas` evita crear una tabla masiva separada para cada métrica posible, optimizando el rendimiento de lectura y la flexibilidad del esquema.

### 4. VIDEOS (`videos`)
Representa archivos de vídeo subidos o enlazados (YouTube) para análisis.
*   **Clave Primaria:** `id`
*   **Claves Foráneas:** `usuario_id` referencia a `usuarios(id)`.
*   **Relaciones:** Subido por un Usuario.
*   **Normalización:** 3FN. `resultados` (JSONB) almacena la salida compleja del análisis de IA.

### 5. TACTICAS (`tacticas`)
Representa jugadas tácticas distintas dibujadas o guardadas por usuarios.
*   **Clave Primaria:** `id`
*   **Relaciones:** Actualmente independiente (podría vincularse a Usuarios o Equipos en futuras iteraciones).
*   **Normalización:** 3FN.

## Análisis de Normalización y Redundancia
*   **1FN (Primera Forma Normal):** Todas las tablas obedecen la 1FN con respecto a sus columnas escalares. Las columnas de tipo `jsonb` (`estadisticas`, `resultados`, `datos_canvas`) son atómicas desde la perspectiva del motor SQL pero estructuralmente complejas. Esto es estándar en desarrollo moderno con PostgreSQL para datos semi-estructurados.
*   **2FN (Segunda Forma Normal):** Todas las tablas tienen una Clave Primaria de una sola columna, eliminando dependencias parciales.
*   **3FN (Tercera Forma Normal):** Los atributos no clave dependen solo de la clave candidata. No existen dependencias transitivas obvias.

## DBMS Utilizado
**PostgreSQL** (específicamente la versión 16 según `docker-compose.yml`).
