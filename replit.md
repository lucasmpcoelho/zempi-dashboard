# Zempi GLP-1 Companion

## Overview

Zempi is a GLP-1 medication companion app designed to provide continuous clinical monitoring and support for users undergoing weight loss treatment with medications like Ozempic, Mounjaro, Saxenda, and Wegovy. The application combines a playful, Lemonade-inspired onboarding experience with a health-focused dashboard for tracking progress, nutrition, medication doses, mood, and weight.

The app features a conversational onboarding flow that collects user health data through an interactive chat interface, followed by a comprehensive dashboard for daily tracking and personalized health insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Framer Motion for animations and transitions

**UI Component System:**
- shadcn/ui components with Radix UI primitives for accessibility
- Tailwind CSS for styling with custom design system
- Custom CSS variables for theming (light/dark mode support)
- Component-based architecture with reusable UI elements

**State Management:**
- TanStack Query (React Query) for server state management and caching
- Local component state with React hooks
- Form state managed through react-hook-form with zod validation

**Design System:**
- HSL-based color palette with medical teal primary color
- Inter font for UI/body text, JetBrains Mono for numeric data
- Responsive design with mobile-first approach
- Hybrid design approach: playful onboarding, clinical dashboard

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- RESTful API architecture
- Middleware for logging, JSON parsing, and error handling
- Session-based architecture (prepared for authentication)

**API Design:**
- Resource-based endpoints (`/api/profile`, `/api/meals`, etc.)
- JSON request/response format
- Zod schema validation for request payloads
- Error handling with appropriate HTTP status codes

**Development Environment:**
- Vite dev server integration in development mode
- Hot module replacement (HMR) support
- Custom logging middleware for API request tracking

### Data Storage

**Database:**
- PostgreSQL as the primary database
- Neon serverless PostgreSQL for cloud deployment
- Connection pooling for efficient resource usage
- WebSocket support for serverless connections

**ORM & Schema:**
- Drizzle ORM for type-safe database queries
- Schema-first approach with TypeScript types generated from database schema
- Migration support through drizzle-kit
- Zod integration for runtime validation via drizzle-zod

**Data Models:**
- Users: Authentication and basic user information
- User Profiles: Comprehensive health data from onboarding (medication, body metrics, preferences)
- Meals: Daily nutrition tracking with macronutrient data
- Medication Doses: Treatment schedule and completion tracking
- Mood Entries: Daily mood and symptom logging
- Weight Entries: Weight progression over time

**Storage Layer Pattern:**
- Repository pattern implementation in `server/storage.ts`
- Interface-based design for testability and flexibility
- Type-safe CRUD operations using Drizzle ORM
- Centralized data access logic

### Authentication & Authorization

**Current State:**
- Demo user system for development/testing
- User ID hardcoded to "demo-user-id"
- Password field exists but not actively used
- Session infrastructure prepared (connect-pg-simple installed)

**Prepared for Future:**
- Session storage ready for implementation
- User creation endpoints available
- Authentication middleware hooks ready for integration

### External Dependencies

**UI Libraries:**
- @radix-ui/* family: Accessible component primitives (accordion, dialog, dropdown, popover, etc.)
- lucide-react: Icon system
- recharts: Data visualization and charts
- embla-carousel-react: Carousel functionality
- date-fns: Date manipulation and formatting with Portuguese localization
- cmdk: Command palette interface

**Development Tools:**
- tsx: TypeScript execution for development
- esbuild: Production bundling for server code
- @replit/* plugins: Replit-specific development enhancements

**Backend Services:**
- @neondatabase/serverless: Serverless PostgreSQL client
- ws: WebSocket support for database connections
- drizzle-orm & drizzle-kit: ORM and migration tools

**Validation & Forms:**
- zod: Runtime type validation
- @hookform/resolvers: Form validation integration
- react-hook-form: Form state management

**Utilities:**
- class-variance-authority: Component variant management
- clsx & tailwind-merge: Conditional className utilities
- nanoid: Unique ID generation

### Build & Deployment

**Development:**
- `npm run dev`: Starts Express server with tsx in watch mode
- Vite middleware integration for HMR
- Separate client and server TypeScript compilation

**Production:**
- `npm run build`: Vite builds client, esbuild bundles server
- Client outputs to `dist/public`
- Server bundles to `dist/index.js`
- `npm start`: Runs production server

**Database Management:**
- `npm run db:push`: Pushes schema changes to database
- Migrations stored in `./migrations` directory
- Schema source in `./shared/schema.ts`

### Project Structure

**Monorepo Organization:**
- `/client`: Frontend React application
- `/server`: Backend Express API
- `/shared`: Shared TypeScript types and schemas
- Path aliases: `@/` for client, `@shared/` for shared code

**Key Architectural Decisions:**
- Colocation of related code (components, pages, hooks)
- Shared schema definitions between frontend and backend
- Type safety across the full stack through TypeScript
- Separation of concerns: UI components, business logic, data access
- Progressive enhancement approach to features