# Configuración de Favicon e Iconos para iOS

## Descripción General

Se ha implementado la funcionalidad de favicon para la aplicación Nua Mana Guías y Scouts. Esta implementación incluye:

- Favicon estándar para navegadores web
- Iconos para dispositivos iOS (iPhone, iPad)
- Configuración de colores para dispositivos móviles
- Manifest para funcionalidad PWA (Progressive Web App)

## Archivos Generados

Se crearon los siguientes archivos favicon en el directorio `public/`:

- `favicon.ico`: Favicon estándar en formato ICO
- `favicon-16x16.png`: Favicon de 16x16 píxeles
- `favicon-32x32.png`: Favicon de 32x32 píxeles
- `apple-touch-icon.png`: Icono para dispositivos iOS
- `android-chrome-192x192.png`: Icono para Chrome en Android
- `android-chrome-512x512.png`: Icono grande para Chrome en Android
- `manifest.json`: Archivo de manifest para PWA

## Colores Configurados

- El color de tema para dispositivos iOS se ha configurado con el valor de clr6: `#e63946` (rojo)
- Este color se utiliza tanto para el background_color como para el theme_color en el manifest.json
- También se aplica en las meta etiquetas específicas para iOS

## Configuración en layout.tsx

Se actualizaron los siguientes elementos en `src/app/layout.tsx`:

- Se agregaron referencias a los favicones en el metadata
- Se incluyeron meta etiquetas específicas para iOS
- Se agregó la referencia al manifest.json
- Se incluyó CSS específico para dispositivos móviles que aplica el color de fondo

## Consideraciones de Seguridad

- Se evitó instalar paquetes con vulnerabilidades conocidas
- La generación de favicon.ico se realizó copiando el archivo favicon-32x32.png
- Esto evita la necesidad de dependencias adicionales con posibles riesgos de seguridad

## Implementación

La implementación es completamente compatible con la arquitectura App Router de Next.js y no requiere dependencias de tiempo de ejecución adicionales.