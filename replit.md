# Ayoub Jiki Portfolio

## Overview

This is an immersive 3D portfolio website for Ayoub Jiki, a Full-Stack Web Developer. The project is built as a narrative, cinematic single-page application featuring scroll-driven animations, Three.js 3D backgrounds, and a contact form with database persistence. The design follows a dark, minimalist aesthetic with purple/violet accent colors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, bundled via Vite
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming, using shadcn/ui component library (New York style)
- **3D Graphics**: Three.js with React Three Fiber and Drei helpers for immersive background effects (particle fields, floating geometry)
- **Animations**: GSAP with ScrollTrigger for scroll-based reveals, Framer Motion for UI transitions
- **State Management**: TanStack React Query for server state, React Hook Form with Zod for form validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: REST endpoints defined in shared route definitions with Zod schemas for type-safe validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Email**: Simulated email service class (ready for production integration with SendGrid/Resend)

### Project Structure
- `client/` - React frontend application
  - `src/components/` - UI components including Three.js background, navigation, project cards
  - `src/pages/` - Page components (Home, 404)
  - `src/hooks/` - Custom hooks for contact form mutations, mobile detection, toasts
  - `src/components/ui/` - shadcn/ui component library
- `server/` - Express backend
  - `routes.ts` - API route handlers
  - `storage.ts` - Database access layer with interface pattern
  - `email.ts` - Email notification service
  - `db.ts` - Drizzle database connection
- `shared/` - Shared code between client and server
  - `schema.ts` - Drizzle table definitions and Zod schemas
  - `routes.ts` - API route definitions with type-safe schemas

### Design Decisions
- **Single-page scroll architecture**: The 3D canvas is fixed in background (z-index: -1) while GSAP ScrollTrigger controls camera movement and HTML reveals
- **Type-safe API contracts**: Route definitions in `shared/routes.ts` ensure client and server share the same validation schemas
- **Component abstraction**: Storage interface pattern allows swapping database implementations

## External Dependencies

### Database
- **PostgreSQL**: Primary data store accessed via Drizzle ORM
- **Connection**: Requires `DATABASE_URL` environment variable

### Third-Party Libraries
- **@react-three/fiber & drei**: React bindings for Three.js 3D rendering
- **GSAP**: Professional animation library for scroll-triggered effects
- **maath**: Math utilities for generating random 3D point distributions
- **Radix UI**: Accessible component primitives (used by shadcn/ui)
- **TanStack Query**: Server state management and caching

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `ADMIN_EMAIL`: Email address for contact form notifications (optional, defaults to hardcoded value)