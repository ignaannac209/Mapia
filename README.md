Levantar proyecto en Dev

1. Clonar repositorio
2. Instalar dependencias
3. Generar el .env basado en el .env.template
4. Ejecutar el comando `npm run set-envs`

## Despliegue en GitHub Pages

1. En GitHub, agrega `MAPBOX_KEY` en **Settings > Secrets and variables > Actions**.
2. En **Settings > Pages**, selecciona **GitHub Actions** como fuente de despliegue.
3. Haz push a la rama `main`; el workflow compilará y publicará la app en GitHub Pages.

El token de Mapbox se incluye en el JavaScript del navegador. Restríngelo por URL desde Mapbox; no lo trates como una clave secreta.
