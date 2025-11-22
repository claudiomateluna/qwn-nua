# Nua Mana Application - Comprehensive Analysis & Reference

## 1. Project Overview

**Name:** Nua Mana - Guías y Scouts Platform
**Type:** Progressive Web Application (PWA)
**Framework:** Next.js 16.0.1 with App Router
**Language:** TypeScript
**Styling:** Tailwind CSS with custom color variables
**Database:** Supabase (PostgreSQL)
**Deployment:** Vercel

## 2. Architecture & Tech Stack

### Frontend
- **Framework:** Next.js 16.0.1 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom configuration and CSS variables
- **UI Components:** Radix UI primitives + custom components
- **State Management:** React hooks + Zustand
- **Icons:** Lucide React
- **Forms:** React Hook Form with Zod validation

### Backend & Services
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **File Storage:** Oracle Cloud Infrastructure (OCI)
- **API Layer:** Supabase client with RLS policies

### Styling & Design System
- **Primary Fonts:** Roboto Slab (body), Inika (headings)
- **Color Palette:**
  - clr1: #FFFFFF (White - backgrounds)
  - clr2: #95a5a6 (Gray)
  - clr3: #333333 (Dark Gray - tertiary text)
  - clr4: #1d1d1d (Black - text, borders)
  - clr5: #2c3e50 (Navy - primary brand color)
  - clr6: #3eb34b (Green - success)
  - clr7: #cb3327 (Red - accent)
  - clr8: #ffc41d (Yellow - emphasis)

## 3. Project Structure

```
nuamana-pwa/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (home)/          # Home page route group
│   │   ├── (public)/        # Public pages route group (acerca-de, lo-que-hacemos)
│   │   ├── api/             # API routes
│   │   ├── auth/            # Authentication pages
│   │   ├── dashboard/       # Dashboard pages (users, articles, inventory, etc.)
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── main-layout.tsx  # Main application layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   ├── layouts/         # Specialized layout components
│   │   ├── providers/       # Context providers
│   │   ├── ui/              # UI primitives (buttons, cards, etc.)
│   │   ├── app-layout.tsx   # Application layout for protected routes
│   │   ├── faq.tsx          # FAQ component
│   │   ├── footer.tsx       # Footer component
│   │   ├── hero.tsx         # Hero section component
│   │   ├── markdown-renderer.tsx # Markdown content renderer
│   │   ├── md-navbar.tsx    # Markdown navigation component
│   │   ├── navbar.tsx       # Main navigation for protected routes
│   │   ├── public-navbar.tsx # Navigation for public pages
│   │   ├── testimonials.tsx # Testimonials component
│   │   ├── unit-slideshow.tsx # Unit slideshow component
│   │   └── visit-section.tsx # Visit section component
│   ├── hooks/               # Custom React hooks
│   │   └── use-auth.tsx     # Authentication hook
│   ├── lib/                 # Utilities and helper functions
│   ├── services/            # Service layer (Supabase, etc.)
│   │   └── supabase.ts      # Supabase client configuration
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── ddbb/                    # Database schema and migrations
├── docs/                    # Documentation
├── .env.local              # Environment variables
├── middleware.ts           # Next.js middleware (auth protection)
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 4. Authentication & Authorization System

### Authentication Flow
- **Provider:** Supabase Auth
- **Method:** Email/password with session management
- **Hook:** `useAuth` custom hook provides login, signup, logout, and profile access
- **State management:** Context API with AuthProvider
- **Route protection:** Middleware protects routes like `/dashboard/*`, `/api/*`, and `/auth/*`

### Authorization & Roles
- **Role-based access control:** Different UI modules accessible based on user role
- **Available roles:** 'lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante', 'apoderado', 'presidente', 'tesorera', 'secretario', 'representante', 'dirigente', 'guiadora', 'admin'
- **Role hierarchy:** Admin (5) > Dirigente (4) > Directiva (3) > Apoderado (2) > NNJ (1)
  - NNJ roles: 'lobato (a)', 'guia', 'scout', 'pionera (o)', 'caminante'
  - Directiva roles: 'presidente', 'tesorera', 'secretario', 'representante'
- **Module access permissions:**
  - Users, Articles, Inventory, Treasury, Actas, Progress: Requires 'admin', 'dirigente'
  - Treasury: Also accessible to 'tesorera'
- **Middleware protection:** Routes like `/dashboard/*`, `/api/*` are protected
- **RLS (Row Level Security):** Enforced at Supabase level
- **Authorization functions:** Located in `src/utils/role-utils.ts`

## 5. Key Features & Modules

### Dashboard Modules:
- **Users Management:** User profiles, permissions, roles
- **Articles Management:** Content creation with categories and metadata
- **Inventory Management:** Equipment tracking and management
- **Treasury Management:** Financial transactions (income/expense)
- **Meeting Minutes (Actas):** Meeting documentation with participants and action items
- **Progress Tracking:** Scout advancement system

### Core Components:
- **Navigation:** Desktop navbar and mobile drawer navigation
- **UI Components:** Custom buttons, cards, forms with gradient styling
- **PWA Features:** Service worker, manifest, offline capabilities
- **Responsive Design:** Mobile-first approach with adaptive layouts

## 6. Database Schema

### Key Tables:
- `users`: User profiles with personal information and roles
- `articles`: Content management with categories and publication status
- `inventory_items`: Equipment and resource tracking
- `transactions`: Financial records for treasury
- `actas`: Meeting minutes with participants and action items
- `progress_goals` & `user_progress`: Scout advancement tracking

### Security:
- **RLS Policies:** Row Level Security implemented at the database level
- **Policies:** Different access levels based on user roles
- **Column-level security:** Sensitive information properly restricted

## 7. Environment Configuration

### Required Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

### Middleware Protection:
- Protected paths: `/dashboard/*`, `/auth/*`, `/api/*`
- Session verification and redirect logic
- Automatic redirect from auth pages when already logged in

## 8. Development Workflow

### Available Scripts:
- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run start`: Production start
- `npm run lint`: Code linting

### Key Dependencies:
- Next.js, React, TypeScript
- Tailwind CSS for styling
- Supabase for backend services
- Radix UI for accessible components
- Lucide React for icons
- date-fns for date manipulation
- zustand for state management

## 9. Custom UI Components

### Button Variants:
- `default`: Primary gradient (clr5 to clr8)
- `destructive`: Red gradient
- `outline`: clr5 border
- `secondary`: clr8 to orange gradient
- `gradient-*`: Multiple gradient variations

### Component Library:
- Card components with gradient headers
- Form elements (input, textarea, select)
- Dialog and modal components
- Responsive sidebar drawer
- Custom styling with CSS variables

## 10. API & Data Layer

### Supabase Integration:
- Client initialization in `/services/supabase.ts`
- Type-safe queries with TypeScript interfaces
- RLS policy enforcement
- Real-time subscriptions supported

### Authentication API:
- Sign up with profile information
- Sign in with session management
- Sign out functionality
- Password reset capability

## 11. Routing & Page Structure

### Route Groups:
- `(home)`: Home page with special layout
- `(public)`: Public pages including `/acerca-de` and `/lo-que-hacemos`

### Public Routes:
- `/`: Home page with hero, features, testimonials
- `/acerca-de/*`: About section with markdown content
- `/lo-que-hacemos/*`: What we do section with markdown content
- `/auth/signin`: Login page
- `/auth/signup`: Registration page

### Protected Routes:
- `/dashboard`: Main dashboard with role-based access
- `/dashboard/users`: User management
- `/dashboard/articles`: Content management
- `/dashboard/inventory`: Equipment management
- `/dashboard/treasury`: Financial management
- `/dashboard/actas`: Meeting minutes
- `/dashboard/progress`: Progress tracking

### Layout structure:
- Root layout (`/src/app/layout.tsx`): Global styles, PWA configuration
- Main layout (`/src/app/main-layout.tsx`): Public navigation and footer for public routes
- Home layout (`/src/app/(home)/layout.tsx`): Specific layout for homepage
- Public layout (`/src/app/(public)/layout.tsx`): Wrapper for public route group
- Auth layout (`/src/app/auth/layout.tsx`): Special layout for auth pages without nav/footer
- App layout (`/src/components/app-layout.tsx`): Layout for protected routes with sidebar and navbar

## 12. Performance & Optimization

### PWA Features:
- Offline functionality
- Service worker for caching
- App manifest for installability
- Responsive design for all devices

### Optimizations:
- Component lazy loading
- Image optimization (using WebP format)
- CSS variable usage for dynamic theming
- Efficient state management

## 13. Testing & Quality Assurance

### Code Quality:
- TypeScript for type safety
- ESLint and Prettier for code consistency
- Component-based architecture for maintainability
- Accessibility considerations with ARIA attributes

### Security:
- Supabase Auth for secure authentication
- RLS policies for data access control
- Input validation and sanitization
- Environment variable management

## 14. Deployment & Hosting

### Production:
- Deployed on Vercel
- Supabase as backend-as-a-service
- Oracle Cloud Infrastructure for file storage
- Git-based deployment

### Environment Management:
- Different environments supported through .env files
- Secure handling of API keys and credentials
- Build-time environment variable injection

## 15. Future Enhancement Opportunities

### Potential Improvements:
- Enhanced accessibility features
- Performance monitoring
- Advanced analytics integration
- Push notification system
- Advanced search functionality
- Reporting and analytics dashboard
- Mobile app development
- Advanced permissions system
- Integration with external platforms

This comprehensive analysis provides a complete understanding of the Nua Mana application architecture, functionality, and implementation details for future development and maintenance.