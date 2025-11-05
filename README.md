# Plataforma Nua Mana - Guías y Scouts

## Descripción General

Esta plataforma es una aplicación web progresiva (PWA) desarrollada para la organización Guías y Scouts Nua Mana. La solución proporciona un sistema integral para gestionar usuarios, artículos, inventario, tesorería, actas de reuniones y el progreso de los scouts.

## Características Principales

- **Gestión de Usuarios**: Registro y administración de perfiles de scouts, guías, apoderados y administradores
- **Publicación de Contenido**: Sistema completo para crear y gestionar artículos con categorías jerárquicas
- **Inventario**: Control de equipo y recursos scouts
- **Tesorería**: Gestión de ingresos y gastos de la organización
- **Actas de Reuniones**: Documentación de reuniones con asistentes y actas pendientes
- **Progreso Scout**: Seguimiento del avance de Scouts en sus diferentes etapas

## Tecnologías Utilizadas

- **Frontend**: Next.js 14+, React, TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: Radix UI y componente personalizados
- **Backend**: Supabase (PostgreSQL, autenticación, edge functions)
- **Almacenamiento**: Oracle Cloud Infrastructure (gratuito)
- **Despliegue**: Vercel
- **PWA**: Funcionalidades completas de aplicación web progresiva

## Arquitectura del Sistema

```
Cliente (Next.js)
│
├── Autenticación con Supabase
├── Estado global con Zustand
├── Componentes UI reutilizables
└── Servicios de API
    │
    └── Supabase
        ├── Base de datos PostgreSQL
        ├── Autenticación
        ├── Edge Functions (opcional)
        └── Storage
```

## Estructura del Proyecto

```
nuamana-pwa/
├── src/
│   ├── app/                 # Rutas de la aplicación (App Router)
│   ├── components/          # Componentes reutilizables
│   ├── hooks/               # Hooks personalizados
│   ├── lib/                 # Utilidades y funciones auxiliares
│   ├── services/            # Lógica de servicios (API, autenticación)
│   ├── types/               # Definiciones de tipos TypeScript
│   ├── utils/               # Funciones utilitarias
│   └── providers/           # Providers de contexto
├── public/                  # Archivos estáticos
├── docs/                    # Documentación
├── ddbb/                    # Esquema de base de datos
└── ...
```

## Base de Datos

El sistema utiliza PostgreSQL a través de Supabase con las siguientes tablas principales:

- `users` - Perfiles de usuarios (scouts, apoderados, administradores)
- `articles` - Contenido publicado con categorías y campos condicionales
- `inventory_items` - Control de equipo e inventario
- `transactions` - Registro de ingresos y gastos
- `actas` - Actas de reuniones con participantes y acciones
- `progress_goals` y `user_progress` - Sistema de seguimiento de avance scout

## Seguridad

- Autenticación segura con Supabase
- Autorización basada en roles con políticas RLS
- Validación de entrada en cliente y servidor
- Protección contra ataques XSS y CSRF

## Implementación

El sistema está desplegado en Vercel con Supabase como backend, lo que permite una arquitectura sin servidor eficiente y escalable.

## Configuración del Entorno

Para ejecutar localmente:

```bash
npm install
cp .env.local.example .env.local
# Configurar variables de entorno para Supabase
npm run dev
```

## Contribuciones

Las contribuciones son bienvenidas. Si encuentra errores o tiene sugerencias de mejora, por favor cree un "issue" o envíe un "pull request".

---

*Desarrollado para Guías y Scouts Nua Mana - Una nueva aventura*
