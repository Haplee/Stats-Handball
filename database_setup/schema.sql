-- Stats-Handball Esquema de Base de Datos
-- DBMS: PostgreSQL 16
-- Generado: 2026-01-28
-- Mejorado con restricciones robustas, validaciones e índices de rendimiento.

BEGIN;

-- ========================================================
-- 0. Utilidades Compartidas
-- ========================================================

-- Función para actualizar automáticamente la columna 'actualizado_el'
CREATE OR REPLACE FUNCTION actualizar_timestamp_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_el = (NOW() AT TIME ZONE 'utc');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ========================================================
-- 1. Tabla Usuarios (users)
-- ========================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(120),
    rol VARCHAR(20) DEFAULT 'user',
    creado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    ultimo_login TIMESTAMP WITHOUT TIME ZONE,

    -- Restricciones
    CONSTRAINT uq_usuarios_nombre_usuario UNIQUE (nombre_usuario),
    CONSTRAINT uq_usuarios_email UNIQUE (email),
    CONSTRAINT chk_usuarios_nombre_len CHECK (LENGTH(TRIM(nombre_usuario)) >= 3),
    CONSTRAINT chk_usuarios_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT chk_usuarios_rol CHECK (rol IN ('user', 'coach', 'admin', 'superadmin'))
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_rol ON usuarios(rol);

-- ========================================================
-- 2. Tabla Equipos (teams)
-- ========================================================
CREATE TABLE IF NOT EXISTS equipos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    nombre_entrenador VARCHAR(100),
    ruta_logo VARCHAR(255),
    estadisticas JSONB DEFAULT '{}', -- Estructura: {"victorias": int, "derrotas": int, ...}
    creado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    actualizado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

    -- Restricciones
    CONSTRAINT chk_equipos_nombre_len CHECK (LENGTH(TRIM(nombre)) > 0),
    CONSTRAINT chk_equipos_stats_valid CHECK (jsonb_typeof(estadisticas) = 'object')
);

-- Trigger para actualizar actualizado_el
CREATE TRIGGER update_equipos_modtime
    BEFORE UPDATE ON equipos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp_modificacion();

-- Índices
CREATE INDEX IF NOT EXISTS idx_equipos_nombre ON equipos(nombre);

-- ========================================================
-- 3. Tabla Jugadores (players)
-- ========================================================
CREATE TABLE IF NOT EXISTS jugadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    numero INTEGER,
    posicion VARCHAR(50),
    altura FLOAT,
    peso FLOAT,
    fecha_nacimiento DATE,
    ruta_foto VARCHAR(255),
    equipo_id INTEGER,
    estadisticas JSONB DEFAULT '{"goles": 0, "asistencias": 0, "lanzamientos": 0, "minutos_jugados": 0}',
    creado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

    -- Relaciones
    CONSTRAINT fk_equipo
        FOREIGN KEY(equipo_id) 
        REFERENCES equipos(id)
        ON DELETE SET NULL,

    -- Restricciones
    CONSTRAINT chk_jugadores_nombre_len CHECK (LENGTH(TRIM(nombre)) > 0),
    CONSTRAINT chk_jugadores_numero_range CHECK (numero >= 0 AND numero <= 99),
    CONSTRAINT chk_jugadores_posicion CHECK (posicion IN ('Portero', 'Extremo Izquierdo', 'Lateral Izquierdo', 'Central', 'Lateral Derecho', 'Extremo Derecho', 'Pivote', 'Defensor')),
    CONSTRAINT chk_jugadores_altura_positive CHECK (altura > 0 AND altura < 300), -- validación cordura cm
    CONSTRAINT chk_jugadores_peso_positive CHECK (peso > 0 AND peso < 300), -- validación cordura kg
    CONSTRAINT chk_jugadores_dob_past CHECK (fecha_nacimiento < CURRENT_DATE)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_jugadores_equipo_id ON jugadores(equipo_id);
CREATE INDEX IF NOT EXISTS idx_jugadores_nombre ON jugadores(nombre);

-- ========================================================
-- 4. Tabla Videos
-- ========================================================
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    nombre_fichero VARCHAR(255),
    ruta_fichero VARCHAR(255),
    usuario_id INTEGER NOT NULL,
    url_youtube VARCHAR(500),
    estado VARCHAR(50) DEFAULT 'pendiente' NOT NULL,
    progreso INTEGER DEFAULT 0,
    resultados JSONB, -- Datos de análisis IA
    creado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    actualizado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

    -- Relaciones
    CONSTRAINT fk_usuario
        FOREIGN KEY(usuario_id) 
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    -- Restricciones
    -- 'pending' incluido para compatibilidad con backend default
    CONSTRAINT chk_videos_estado CHECK (estado IN ('pendiente', 'subiendo', 'procesando', 'completado', 'error', 'pending', 'uploading', 'failed')),
    CONSTRAINT chk_videos_progreso_range CHECK (progreso >= 0 AND progreso <= 100),
    CONSTRAINT chk_videos_fuente_existe CHECK (ruta_fichero IS NOT NULL OR url_youtube IS NOT NULL)
);

-- Trigger para actualizar actualizado_el
CREATE TRIGGER update_videos_modtime
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp_modificacion();

-- Índices
CREATE INDEX IF NOT EXISTS idx_videos_usuario_id ON videos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_videos_estado ON videos(estado);
CREATE INDEX IF NOT EXISTS idx_videos_creado_el ON videos(creado_el DESC);

-- ========================================================
-- 5. Tabla Tácticas (tactics)
-- ========================================================
CREATE TABLE IF NOT EXISTS tacticas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    datos_canvas JSONB, -- Datos raw de fabric.js
    ruta_imagen VARCHAR(255), -- Preview generada
    creado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    actualizado_el TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),

    -- Restricciones
    CONSTRAINT chk_tacticas_nombre_len CHECK (LENGTH(TRIM(nombre)) > 0)
);

-- Trigger para actualizar actualizado_el
CREATE TRIGGER update_tacticas_modtime
    BEFORE UPDATE ON tacticas
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_timestamp_modificacion();

COMMIT;
