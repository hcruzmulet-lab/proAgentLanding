# ProAgent - B2B Travel Platform

Plataforma B2B para agencias de viaje con interfaces de Agente y Administrador en una sola aplicación Next.js.

## 🚀 Stack Tecnológico

- **Next.js 16** con App Router y TypeScript
- **TailwindCSS v4** para estilos
- **SASS** para estilos específicos de componentes
- **Shadcn/ui** para componentes de UI
- **Zustand** para manejo de estado global
- **TanStack Query** para estado del servidor y caché
- **next-intl** para internacionalización (i18n)
- **@mdi/react + @mdi/js** para Material Design Icons
- **React Hook Form + Zod** para formularios y validación

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Rutas públicas de autenticación
│   ├── (onboarding)/        # Proceso de suscripción
│   ├── (dashboard)/         # Dashboards protegidos
│   │   ├── agent/          # Portal del agente
│   │   └── admin/          # Backoffice admin
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Shadcn components (no editar)
│   ├── shared/             # Componentes globales Dumb
│   ├── layout/             # Componentes de layout
│   ├── agent/              # Componentes del agente
│   │   ├── shared/        # Dumb components específicos
│   │   └── Dashboard/     # Smart component (*.module.tsx)
│   └── admin/              # Componentes del admin
├── lib/                    # Utilidades y configuración
│   ├── api/               # Cliente API
│   ├── auth/              # Configuración de auth
│   └── utils.ts           # Utilidades
├── stores/                # Zustand stores
│   ├── auth/             # Store de autenticación
│   └── ui/               # Store de UI
├── hooks/                # Custom React hooks
├── types/                # Definiciones TypeScript
├── constants/            # Constantes (rutas, permisos)
├── config/               # Configuración (navegación)
├── i18n/                 # Configuración i18n
├── styles/               # Estilos globales y SASS
│   ├── theme.css         # Variables CSS
│   ├── _variables.scss   # Variables SASS
│   └── _mixins.scss      # Mixins SASS
└── messages/             # Archivos de traducción
    ├── es.json
    ├── en.json
    └── pt-BR.json
```

## 🎨 Patrón de Componentes

### Componentes Dumb (Presentacionales)

- **Propósito**: Solo renderizar UI basado en props
- **Contiene**: TSX + SCSS (archivo separado)
- **No contiene**: Lógica de negocio, llamadas a API, estado global
- **Archivo**: `ComponentName.tsx` + `ComponentName.scss`

```typescript
// Ejemplo: StatusBadge.tsx
import './StatusBadge.scss';

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  return <Badge className={`status-badge status-badge--${size}`}>{status}</Badge>;
}
```

### Componentes Smart (Módulos)

- **Propósito**: Lógica de negocio, orquestar componentes dumb
- **Contiene**: TSX + lógica + hooks
- **No contiene**: Estilos (delegados a componentes dumb)
- **Archivo**: `ComponentName.module.tsx`

```typescript
// Ejemplo: Dashboard.module.tsx
'use client';

export function DashboardModule() {
  const { data } = useQuery({ ... });
  return <WelcomeCard data={data} />;
}
```

### Flujo de Componentes (OBLIGATORIO)

```
Page → Smart Component (.module.tsx) → Dumb Component (.tsx)
```

**❌ NUNCA**: `Page → Dumb Component`  
**✅ SIEMPRE**: `Page → Smart Component → Dumb Component`

## 🌍 Internacionalización (i18n)

**NUNCA hardcodear texto en la UI**. Siempre usar traducciones:

```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('common');
<Button>{t('save')}</Button>
```

**Idiomas soportados**: `es`, `en`, `pt-BR`

## 🎨 Estilos

### Variables CSS (Tema)

Usar variables CSS del tema en `src/styles/theme.css`:

```css
var(--brand-primary)
var(--spacing-md)
var(--shadow-lg)
var(--transition-normal)
```

### SASS

Usar variables y mixins de SASS:

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.component {
  @include flex-center;
  padding: $spacing-md;
  @include transition(all);
}
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## 🔐 Roles y Permisos

- **SUPER_ADMIN**: Acceso completo
- **ADMIN**: Gestión de agencias, agentes, facturación
- **AGENT**: Reservas, clientes, comisiones

## 🛠️ Agregar Componentes de Shadcn

```bash
npx shadcn@latest add [component-name]
```

## 📖 Más Información

Revisa `CLAUDE.md` para guías detalladas de desarrollo y mejores prácticas del equipo.
