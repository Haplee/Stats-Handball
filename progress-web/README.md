# Web de Seguimiento y Documentación del TFG

Esta es la web de seguimiento y documentación para el TFG de ASIR sobre el análisis de partidos de balonmano con IA. Ha sido desarrollada con Next.js y Tailwind CSS, y está optimizada para su despliegue en Vercel.

## 🎯 Objetivo de la Web

- **Escaparate Público:** Mostrar el proyecto, sus objetivos y su alcance.
- **Seguimiento del Progreso:** Documentar los hitos, el avance de las fases y el roadmap del proyecto.
- **Documentación Técnica:** Explicar la arquitectura del sistema, los servicios y las tecnologías utilizadas.
- **Central de Enlaces:** Proporcionar acceso a la memoria del TFG y al repositorio de código.

## 🚀 Cómo Empezar

Para trabajar con el proyecto en un entorno de desarrollo local, sigue estos pasos:

1.  **Clona el repositorio** (si aún no lo has hecho):
    ```bash
    git clone <URL-del-repositorio>
    cd progress-web
    ```

2.  **Instala las dependencias**:
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la web.

## ✏️ Cómo Editar el Contenido

La web está diseñada para ser fácilmente personalizable. A continuación se detalla cómo editar cada sección.

### 📄 **Páginas Principales**

El contenido de las páginas se encuentra en la carpeta `src/app/`. Cada subcarpeta corresponde a una sección de la web:

- **Home:** `src/app/page.tsx`
- **Progreso:** `src/app/progress/page.tsx`
- **Sistema:** `src/app/system/page.tsx`
- **Resultados:** `src/app/results/page.tsx`
- **Blog:** `src/app/blog/page.tsx`
- **TFG:** `src/app/tfg/page.tsx`

Para cambiar el texto o las imágenes, edita el archivo `.tsx` correspondiente.

### ✍️ **Añadir Entradas al Blog (Diario de Desarrollo)**

Actualmente, las entradas del blog están hardcodeadas en `src/app/blog/page.tsx`. Para añadir una nueva entrada:

1.  Abre `src/app/blog/page.tsx`.
2.  Busca el array `posts`.
3.  Añade un nuevo objeto al array con la siguiente estructura:

    ```javascript
    {
      title: 'Título de tu nueva entrada',
      date: 'YYYY-MM-DD', // Fecha de publicación
      content: `
        <p>Tu contenido aquí, puedes usar etiquetas HTML.</p>
        <h3 class="font-bold mt-4">Subtítulo</h3>
        <ul class="list-disc list-inside ml-4">
          <li>Punto de lista 1.</li>
          <li>Punto de lista 2.</li>
        </ul>
      `
    }
    ```

### ⚙️ **Editar Componentes Reutilizables**

Los componentes como el Header, Footer, Cards, etc., se encuentran en `src/components/`.

- **Header:** `src/components/Header.tsx` (para cambiar los enlaces de navegación).
- **Footer:** `src/components/Footer.tsx` (para actualizar tu nombre, email o enlace a GitHub).
- **ProgressBar:** `src/app/progress/page.tsx` (edita el array `projectPhases` para cambiar el progreso).
- **Timeline:** `src/app/progress/page.tsx` (edita el array `timelineEvents` para añadir nuevos hitos).

## 部署 en Vercel

El proyecto está listo para ser desplegado en Vercel con cero configuración.

1.  **Crea un repositorio en GitHub** y sube el contenido de la carpeta `progress-web`.
2.  **Importa el proyecto en Vercel**:
    - Conecta tu cuenta de GitHub a Vercel.
    - Selecciona el repositorio que acabas de crear.
3.  **Configuración del Proyecto**:
    - **Framework Preset:** Vercel debería detectar automáticamente que es un proyecto **Next.js**.
    - **Root Directory:** Asegúrate de que el directorio raíz es `progress-web`. Vercel te permitirá configurarlo durante la importación.
4.  **Haz clic en "Deploy"**.

Cada vez que hagas `git push` a la rama principal de tu repositorio en GitHub, Vercel desplegará automáticamente los cambios.
