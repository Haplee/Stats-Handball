# Solución al Error de Despliegue en Vercel

El error `Error: No Next.js version detected` ocurre porque la configuración del proyecto en Vercel está establecida como **Next.js**, pero el proyecto ahora es **Vite (React)**.

## Pasos para arreglarlo:

1.  Ve a tu panel de **Vercel** > **Settings** > **General**.
2.  En **Framework Preset**, cámbialo de "Next.js" a **"Vite"**.
3.  En **Root Directory**, asegúrate de que ponga `progress-web` (si pregunta).
4.  Si te pide **Output Directory**, escribe `dist`.
5.  Guarda los cambios y ve a **Deployments** > **Redeploy**.

Esto solucionará el error inmediatamente.
