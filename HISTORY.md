# Historial de Cambios

## miércoles, 12 de noviembre de 2025

### Agregado favicon y configuración de iOS
- Se agregó favicon a la aplicación usando la imagen logo-nuamana.webp
- Se generaron archivos favicon en varios tamaños: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png
- Se configuró el color de fondo para dispositivos iOS usando el color clr6 (#e63946)
- Se creó un archivo manifest.json para funcionalidad PWA
- Se actualizó el layout.tsx para incluir referencias a los favicones y metadatos iOS
- Se evitó instalar dependencias con vulnerabilidades (como to-ico) optando por un enfoque más seguro
- Se documentó la funcionalidad en docs/configuracion-favicon.md

### Reemplazo de testimonios con integración Trustindex
- Se reemplazó la implementación de Google My Business con Trustindex para simplificar la integración
- Se eliminó la API route en `/api/testimonials` que se usaba con Google My Business
- Se actualizó el componente de testimonios para usar el widget de Trustindex
- Se agregó placeholder con instrucciones claras para implementar Trustindex
- Se eliminó la documentación relacionada con Google My Business
- Se actualizó la documentación existente para reflejar el cambio a Trustindex