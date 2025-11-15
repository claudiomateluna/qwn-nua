# Documentación de la Aplicación Nua Mana

## Índice

1. [Configuración de Favicon e Iconos para iOS](#configuración-de-favicon-e-iconos-para-ios)
2. [Integración de Testimonios con Trustindex](#integración-de-testimonios-con-trustindex)

---

## Configuración de Favicon e Iconos para iOS

### Descripción General

Se ha implementado la funcionalidad de favicon para la aplicación Nua Mana Guías y Scouts. Esta implementación incluye:

- Favicon estándar para navegadores web
- Iconos para dispositivos iOS (iPhone, iPad)
- Configuración de colores para dispositivos móviles
- Manifest para funcionalidad PWA (Progressive Web App)

### Archivos Generados

Se crearon los siguientes archivos favicon en el directorio `public/`:

- `favicon.ico`: Favicon estándar en formato ICO
- `favicon-16x16.png`: Favicon de 16x16 píxeles
- `favicon-32x32.png`: Favicon de 32x32 píxeles
- `apple-touch-icon.png`: Icono para dispositivos iOS
- `android-chrome-192x192.png`: Icono para Chrome en Android
- `android-chrome-512x512.png`: Icono grande para Chrome en Android
- `manifest.json`: Archivo de manifest para PWA

### Colores Configurados

- El color de tema para dispositivos iOS se ha configurado con el valor de clr6: `#e63946` (rojo)
- Este color se utiliza tanto para el background_color como para el theme_color en el manifest.json
- También se aplica en las meta etiquetas específicas para iOS

### Configuración en layout.tsx

Se actualizaron los siguientes elementos en `src/app/layout.tsx`:

- Se agregaron referencias a los favicones en el metadata
- Se incluyeron meta etiquetas específicas para iOS
- Se agregó la referencia al manifest.json
- Se incluyó CSS específico para dispositivos móviles que aplica el color de fondo

### Consideraciones de Seguridad

- Se evitó instalar paquetes con vulnerabilidades conocidas
- La generación de favicon.ico se realizó copiando el archivo favicon-32x32.png
- Esto evita la necesidad de dependencias adicionales con posibles riesgos de seguridad

---

## Integración de Testimonios con Trustindex

### Descripción General

Se ha implementado una funcionalidad para mostrar testimonios usando Trustindex, una solución sencilla y eficaz para recopilar y mostrar reseñas de clientes. Esta implementación incluye:

- Componente React actualizado para integrar el widget de Trustindex
- Instrucciones claras para configurar la cuenta de Trustindex
- Diseño responsive que se adapta al layout existente
- Placeholder informativo para facilitar la implementación final

### Componente Actualizado

El componente `Testimonials` en `src/components/testimonials.tsx` ahora:

- Muestra un placeholder con instrucciones claras para implementar Trustindex
- Mantiene el diseño visual existente y coherente con el resto de la aplicación
- Proporciona un contenedor específico para el widget de Trustindex
- Incluye instrucciones paso a paso para completar la integración

### Configuración Requerida

Para que la funcionalidad funcione completamente, se requiere:

1. Crear una cuenta gratuita en [Trustindex](https://trustindex.io)
2. Configurar el método de recolección de reseñas (email, QR code, etc.)
3. Seleccionar el estilo de widget deseado
4. Copiar el código de embed generado por Trustindex
5. Pegar el código en el componente `src/components/testimonials.tsx` en el lugar indicado

### Consideraciones de Seguridad

- No se almacenan credenciales de terceros en el repositorio
- El widget se carga directamente desde los servidores de Trustindex
- Se sigue la arquitectura de componentes de Next.js para mantener la seguridad

### Implementación

La implementación es compatible con el App Router de Next.js y permite una integración sencilla del widget de Trustindex sin complejidad técnica adicional.