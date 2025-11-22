# Qwen Agent - Project Permissions & Documentation

## Project: Nua Mana - Guías y Scouts Platform

### Permissions Granted
- Full read/write access to all project files
- Ability to modify code, configuration, and documentation files
- Execute shell commands for development tasks
- Install/remove packages as needed
- Run tests, builds, and development servers

### Project Context
- Date: miércoles, 12 de noviembre de 2025
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

### Reference Documents Created
- `application-analysis-reference.md` - Comprehensive analysis of the application

### Preferred Workflow
- Use todo_write for tracking multi-step tasks
- Maintain existing code conventions and style
- Update QWEN.md as needed when new permissions or information is provided
- Refer to README.md and documentation files for project context
- Follow TypeScript best practices and component patterns used in the project

## Qwen Added Memories
- Se ha implementado un componente de footer para el sitio web Nua Mana que aparece en todas las páginas públicas excepto en las de autenticación. Se ha reorganizado la estructura de la aplicación Next.js usando Route Groups para separar páginas públicas y de autenticación, y se ha creado un layout específico para la página de inicio. El footer incluye información de contacto, redes sociales, unidades scouts y sistema de rating, todo basado en el sitio nuamana.cl. También se han corregido problemas de estilo en el navbar para que tenga un fondo apropiado en lugar de transparente.

- Se ha verificado que el archivo `src/components/app-layout.tsx` no contiene referencias a roles de almacén ("Warehouse Operator", "Store Supervisor", "Warehouse Supervisor") como se había mencionado previamente. El archivo actualmente solo contiene código relacionado con el layout de la aplicación para la plataforma Guías y Scouts Nua Mana. La estructura de roles actual se encuentra en el archivo `src/utils/role-utils.ts` y está alineada con el propósito de la organización scouts.

- Se ha creado el componente VisitSection para la página principal con una estructura de dos columnas (30%-70%) que incluye: contador animado de años de experiencia desde la fundación (23 de septiembre de 2005), icono de correo con efecto hover, imagen con texto "VEN A VISITARNOS", reloj analógico animado y icono de mapa con animación. El componente utiliza los colores del sistema de diseño de Nua Mana y se integra en la página principal entre las secciones de testimonios y FAQ.
