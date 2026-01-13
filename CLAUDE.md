# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

B2B platform for travel agencies with two interfaces (Agent and Admin) in a single NextJS application. Integrates with external systems via IFRAME (TravelCompositor for bookings) and APIs (Stripe for subscriptions).

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## Tech Stack

- **NextJS 16** with App Router and TypeScript
- **TailwindCSS v4** for styling
- **SASS** for component-specific styles
- **Shadcn/ui** for UI components (in `src/components/ui/`)
- **Zustand** for global state management
- **TanStack Query** for server state and caching
- **NextAuth.js v5** (beta) for authentication with Credentials provider
- **React Hook Form + Zod** for form handling and validation
- **next-intl** for i18n
- **@mdi/react + @mdi/js** for Material Design Icons
- **@stripe/stripe-js** for Stripe integration
- **OpenAPI Generator** for API client generation

## Development Guidelines

### 1. Internationalization (i18n) - MANDATORY

**NEVER hardcode text in the UI.** All user-facing text must use translations.

```typescript
// WRONG - Never do this
<Button>Save</Button>
<p>Welcome to the dashboard</p>

// CORRECT - Always use translations
import { useTranslations } from 'next-intl';

const t = useTranslations('common');
<Button>{t('save')}</Button>

const t = useTranslations('dashboard');
<p>{t('welcome', { name: user.name })}</p>
```

**Supported locales:** `en`, `es`, `pt-BR`

**Translation files:** `messages/[locale].json`

**Structure:**
- `common` - Shared UI elements (save, cancel, delete, etc.)
- `auth` - Authentication related
- `navigation` - Menu items
- `dashboard` - Dashboard specific
- `bookings` - Booking related
- `agencies` - Agency management
- `subscriptions` - Subscription/billing
- `validation` - Form validation messages

### 2. Styling

**Global theme:** `src/styles/theme.css` - CSS custom properties
**SASS utilities:** `src/styles/_variables.scss`, `src/styles/_mixins.scss`

Use CSS custom properties for theming:
```css
var(--brand-primary)
var(--spacing-md)
var(--shadow-lg)
var(--transition-normal)
```

### 3. Component Architecture

The project uses the **Container/Presentational** pattern with two types of components:

#### Dumb Components (Presentational)
- **Purpose**: Only responsible for rendering UI based on props
- **Contains**: TSX (HTML), SCSS (always separate file), minimal React code
- **No**: Business logic, API calls, state management
- **Naming**: `ComponentName.tsx`
- **Styles**: Always in separate file `ComponentName.scss` (NEVER inline or in same file)

#### Smart Components (Modules)
- **Purpose**: Business logic, orchestrate dumb components, call services
- **Contains**: Only TSX to render dumb components, logic, hooks
- **No**: SCSS files (styling is delegated to dumb components)
- **Naming**: `ComponentName.module.tsx` (`.module` suffix indicates smart component)

#### Component Organization Rules
1. **Every component in its own folder** with `index.ts` for exports
2. **Styles always in separate file** within the component folder
3. **Smart components orchestrate dumb components**, never have their own styles
4. **Pages NEVER import dumb components directly** - always through smart components

#### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Features (functionalities) | lowercase | `bookings/`, `subscribe/`, `agencies/` |
| Auxiliary folders | lowercase | `shared/` |
| Components (Dumb & Smart) | PascalCase | `WelcomeCard/`, `BookingList/` |
| Dumb component file | PascalCase | `WelcomeCard.tsx` |
| Smart component file | PascalCase + .module | `BookingList.module.tsx` |
| Style file | PascalCase + .scss | `WelcomeCard.scss` |
| Export file | lowercase | `index.ts` |

#### Component Flow (MANDATORY)
```
Page → Smart Component (.module.tsx) → Dumb Component (.tsx)
```

**NEVER do this:**
```typescript
// ❌ WRONG - Page importing dumb component directly
// app/subscribe/page.tsx
import { WelcomeCard } from '@/components/agent/subscribe/shared/WelcomeCard';

export default function SubscribePage() {
  return <WelcomeCard ... />;
}
```

**ALWAYS do this:**
```typescript
// ✅ CORRECT - Page imports smart component
// app/subscribe/page.tsx
import { SubscribeWelcomeModule } from '@/components/agent/subscribe/SubscribeWelcome';

export default function SubscribePage() {
  return <SubscribeWelcomeModule />;
}

// components/agent/subscribe/SubscribeWelcome/SubscribeWelcome.module.tsx
import { WelcomeCard } from '../shared/WelcomeCard';

export function SubscribeWelcomeModule() {
  // Business logic here
  return <WelcomeCard ... />;
}
```

#### Directory Structure
```
src/components/
├── ui/                              # Shadcn (do not edit, use CLI)
├── shared/                          # Global dumb components (both roles)
│   ├── StatusBadge/
│   │   ├── StatusBadge.tsx
│   │   ├── StatusBadge.scss
│   │   └── index.ts
│   └── DataTable/
│
├── layout/                          # Layout components (dumb)
│   ├── OnboardingHeader/
│   │   ├── OnboardingHeader.tsx
│   │   ├── OnboardingHeader.scss
│   │   └── index.ts
│   └── OnboardingLayout/
│
├── agent/                           # Agent portal components
│   ├── shared/                      # Dumb components specific to agent role
│   ├── subscribe/                   # Feature: subscription process (lowercase)
│   │   ├── shared/                  # Dumb components for this feature
│   │   │   └── WelcomeCard/
│   │   │       ├── WelcomeCard.tsx      # Dumb component
│   │   │       ├── WelcomeCard.scss
│   │   │       └── index.ts
│   │   └── SubscribeWelcome/            # Smart component folder (PascalCase)
│   │       ├── SubscribeWelcome.module.tsx
│   │       └── index.ts
│   ├── bookings/                    # Feature: bookings
│   │   ├── shared/
│   │   │   └── BookingCard/
│   │   └── BookingList/
│   │       ├── BookingList.module.tsx
│   │       └── index.ts
│   └── expedientes/
│
├── admin/                           # Admin backoffice components
│   ├── shared/                      # Dumb components specific to admin role
│   ├── agencies/
│   ├── billing/
│   └── reports/
```

#### Shared Components Hierarchy (Promotion Rule)
| Level | Location | Scope |
|-------|----------|-------|
| Global | `components/shared/` | Both roles (agent & admin) |
| Role | `agent/shared/`, `admin/shared/` | Only that role |
| Feature | `agent/bookings/shared/` | Only that feature |

**Promotion**: If a dumb component is needed in multiple features → promote to role `shared/`. If needed in both roles → promote to global `shared/`.

#### Dumb Component Example
```typescript
// components/shared/StatusBadge/StatusBadge.tsx
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import './StatusBadge.scss';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled';
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const t = useTranslations('bookings');
  return <Badge className={`status-badge status-badge--${size}`} variant={status}>{t(status)}</Badge>;
}
```

#### Smart Component Example
```typescript
// components/agent/bookings/BookingList/BookingList.module.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { BookingCard } from '../shared/BookingCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { getBookings } from '@/lib/api/bookings';

export function BookingListModule() {
  const t = useTranslations('bookings');
  const [filter, setFilter] = useState<string>('all');

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings(filter),
  });

  if (isLoading) return <BookingListSkeleton />;
  if (!bookings?.length) return <EmptyState message={t('noBookings')} />;

  return (
    <div>
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
```

## Architecture

### Route Groups
- `src/app/(auth)/` - Public routes: login, register, forgot-password
- `src/app/(onboarding)/` - Public routes for subscription/registration process
- `src/app/(dashboard)/agent/` - Agent portal (bookings, clients, commissions)
- `src/app/(dashboard)/admin/` - Admin backoffice (agencies, agents, billing, reports)
- `src/app/api/` - API routes including NextAuth and Stripe webhooks

### Key Directories
- `src/components/ui/` - Shadcn components (do not edit directly, use CLI to add)
- `src/components/shared/` - Global dumb components (used by both agent and admin)
- `src/components/layout/` - Layout components (Sidebar, Header, Navigation)
- `src/components/agent/` - Agent portal: features with smart (.module) and dumb components
- `src/components/admin/` - Admin backoffice: features with smart (.module) and dumb components
- `src/lib/` - Utilities, API client, auth config, Stripe helpers
- `src/stores/` - Zustand stores
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `src/constants/` - Route constants, permissions, status enums
- `src/config/` - Navigation config, typed env variables
- `src/i18n/` - Internationalization config
- `src/styles/` - Global SASS variables and mixins
- `messages/` - Translation files (en.json, es.json, pt-BR.json)

### Role-Based Access
Three roles: `SUPER_ADMIN`, `ADMIN`, `AGENT`
- `/admin/*` routes require ADMIN or SUPER_ADMIN
- `/agent/*` routes require AGENT, ADMIN, or SUPER_ADMIN

### Subscription Plans
Three tiers: FREE, PRO, ENTERPRISE (managed via Stripe)

## Import Alias

Use `@/*` for imports from `src/`:
```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
```

## Adding Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

## Adding Translations

1. Add key to all translation files (`messages/en.json`, `messages/es.json`, `messages/pt-BR.json`)
2. Use appropriate namespace (common, auth, dashboard, etc.)
3. Support interpolation for dynamic values: `"welcome": "Welcome, {name}"`

## OpenAPI Client Generation

When backend provides OpenAPI spec, place it at `openapi.yaml` and run:
```bash
./scripts/generate-api.sh
```
Generated client goes to `src/lib/api/generated/`
