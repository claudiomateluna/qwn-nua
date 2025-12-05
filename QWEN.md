# Qwen Agent - Project Permissions & Documentation

## Project: Nua Mana - Guías y Scouts Platform

### Permissions Granted
- Full read/write access to all project files
- Ability to modify code, configuration, and documentation files
- Execute shell commands for development tasks
- Install/remove packages as needed
- Run tests, builds, and development servers

### Project Context
- Date: martes, 25 de noviembre de 2025
- OS: Windows 32-bit
- Project: Next.js PWA application for Guías y Scouts Nua Mana
- Framework: Next.js 16.0.1, TypeScript, Tailwind CSS
- Backend: Supabase (PostgreSQL, Auth, Storage)

### Key Directories & Files
- `/src/app` - Next.js App Router pages
- `/src/components` - Reusable UI components
- `/src/hooks` - Custom React hooks (use-auth.tsx)
- `/src/services` - Service layer (supabase.ts)
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions
- `package.json` - Dependencies and scripts
- `middleware.ts` - Authentication protection
- `tailwind.config.js` - Styling configuration
- `.env.local` - Environment variables

### Authentication System
- Supabase Auth for user management
- Role-based access control (admin, scout, guia, etc.)
- Protected routes using middleware
- RLS (Row Level Security) at database level

### Key Features
- Dashboard with multiple modules (users, articles, inventory, treasury, actas, progress)
- PWA functionality with offline support
- Responsive design with mobile drawer navigation
- Custom UI components with gradient styling
- Form management with validation
- File storage with OCI

### Multi-Step Registration Process
- Completed a 5-step registration process:
  1. Authorization Password (with password "2005")
  2. Role Selection
  3. Name and Surname
  4. RUT (with validation for both 7 and 8 digit formats)
  5. Email and Password
- Implemented responsive design for all steps
- Added RUT validation and formatting functions
- Added progress indicator and progress bar with gradient
- Ensured consistent styling across all steps

### Preferred Workflow
- Use todo_write for tracking multi-step tasks
- Maintain existing code conventions and style
- Update QWEN.md as needed when new permissions or information is provided
- Refer to README.md and documentation files for project context
- Follow TypeScript best practices and component patterns used in the project

## Qwen Added Memories
- Trabajamos ayer en múltiples mejoras y correcciones para la aplicación de gestión de usuarios para un sistema de escaneo de paquetes, incluyendo jerarquía de roles, seguridad, interfaces, autenticación, políticas de Supabase, verificaciones de permisos, herramientas de diagnóstico, APIs de prueba, detección de dispositivos móviles, cambios estéticos, permisos de roles, login, problemas visuales, sistema completo de detección de dispositivos, cuadro resumen en pantalla de escaneo, favicon, estilos, botón de escáner, documentación, cache, compatibilidad Safari/iOS, jsQR fallback, feedback visual, overlay de enfoque, línea de escaneo animada, carga de locales y experiencia de usuario mejorada. La aplicación ahora funciona correctamente en desktop y dispositivos móviles con soluciones robustas para escaneo de códigos de barras en todos los navegadores.
