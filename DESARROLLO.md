# Guía de Desarrollo - ProAgent

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local

# 3. Ejecutar en desarrollo
npm run dev
```

El proyecto estará disponible en http://localhost:3000

## 📁 Estructura del Proyecto

```
proagent/
├── public/                   # Archivos estáticos
│   └── logo.svg             # Logo de ProAgent
├── messages/                # Traducciones i18n
│   ├── es.json             # Español (default)
│   ├── en.json             # Inglés
│   └── pt-BR.json          # Portugués brasileño
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── [locale]/      # Rutas internacionalizadas
│   │   │   ├── landing/   # Landing page
│   │   │   └── (dashboard)/
│   │   │       ├── agent/ # Portal del agente
│   │   │       └── admin/ # Panel de administración
│   │   └── globals.css    # Estilos globales
│   ├── components/
│   │   ├── ui/           # Componentes Shadcn
│   │   ├── shared/       # Componentes globales Dumb
│   │   ├── layout/       # Layouts y navegación
│   │   ├── landing/      # Componentes de landing
│   │   ├── agent/        # Componentes del agente
│   │   └── admin/        # Componentes del admin
│   ├── lib/              # Utilidades y configuración
│   ├── stores/           # Zustand stores
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   ├── constants/        # Constantes
│   ├── config/           # Configuraciones
│   ├── i18n/             # Config i18n
│   └── styles/           # SASS variables y mixins
└── tailwind.config.ts    # Config de Tailwind
```

## 🎨 Patrón de Componentes

### Regla de Oro

```
Page → Smart Component (.module.tsx) → Dumb Component (.tsx)
```

### Componentes Dumb

- Solo renderizado de UI
- Estilos en archivo `.scss` separado
- No lógica de negocio

```typescript
// components/shared/Card/Card.tsx
import './Card.scss';

export function Card({ title, content }: CardProps) {
  return (
    <div className="card">
      <h3 className="card__title">{title}</h3>
      <p className="card__content">{content}</p>
    </div>
  );
}
```

### Componentes Smart

- Orquestan componentes dumb
- Contienen lógica de negocio
- Archivo `.module.tsx`
- Sin estilos propios

```typescript
// components/feature/FeatureList/FeatureList.module.tsx
'use client';

import { Card } from '@/components/shared/Card';

export function FeatureListModule() {
  const { data } = useQuery(...);
  
  return (
    <div>
      {data.map(item => <Card key={item.id} {...item} />)}
    </div>
  );
}
```

## 🌍 Internacionalización (i18n)

**NUNCA** escribir texto hardcodeado. Siempre usar traducciones:

```typescript
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('landing.hero');
  
  return <h1>{t('title')}</h1>;
}
```

### Agregar Nuevas Traducciones

1. Agregar en `messages/es.json`:
```json
{
  "miSeccion": {
    "titulo": "Mi Título"
  }
}
```

2. Replicar en `en.json` y `pt-BR.json`

3. Usar en componente:
```typescript
const t = useTranslations('miSeccion');
<h1>{t('titulo')}</h1>
```

## 🎨 Estilos

### Variables CSS

Usar variables del tema en `src/styles/theme.css`:

```scss
// Correcto
.component {
  color: hsl(var(--primary));
  padding: var(--spacing-md);
}
```

### SASS

Usar variables y mixins:

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.component {
  @include flex-center;
  padding: $spacing-lg;
  @include transition(all);
  
  &:hover {
    @include shadow-lg;
  }
}
```

### Colores de la Landing

```scss
// Brand
--brand-primary: #ffa300 (naranja)
--text-primary: #1b2340 (azul oscuro)
--background: #f1f5f9 (gris claro)
```

## 📦 Agregar Componentes de Shadcn

```bash
npx shadcn@latest add [component-name]
```

Ejemplos:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 🔍 Scripts Útiles

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 🗂️ Organización de Archivos

### Componente Dumb

```
ComponentName/
├── ComponentName.tsx      # Componente
├── ComponentName.scss     # Estilos (OBLIGATORIO)
└── index.ts              # Export
```

### Componente Smart

```
ModuleName/
├── ModuleName.module.tsx  # Componente smart
├── ModuleName.module.scss # Estilos del layout (opcional)
└── index.ts              # Export
```

## 🚦 Rutas

### Públicas

- `/landing` - Landing page
- `/login` - Inicio de sesión
- `/subscribe` - Proceso de suscripción

### Protegidas

- `/agent` - Dashboard del agente
- `/agent/bookings` - Reservas
- `/admin` - Dashboard del admin
- `/admin/agencies` - Gestión de agencias

## 🔐 Autenticación

Usar el hook `useAuth`:

```typescript
import { useAuth } from '@/hooks/auth/useAuth';

function Component() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) return <LoginPrompt />;
  
  return <div>Hola {user.name}</div>;
}
```

## 🎯 Estado Global

### Zustand Stores

```typescript
// Autenticación
import { useAuthStore } from '@/stores/auth/authStore';

// UI
import { useUiStore } from '@/stores/ui/uiStore';
```

### React Query

```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['key'],
  queryFn: fetchData,
});
```

## 🐛 Debugging

### Ver traducciones faltantes

Revisar consola del navegador - next-intl muestra warnings.

### Problemas de estilos SASS

Asegurarse de importar variables y mixins:

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
```

### Problemas de imports

Usar alias `@/`:

```typescript
import { Component } from '@/components/shared/Component';
```

## 📚 Recursos

- [CLAUDE.md](./CLAUDE.md) - Guías completas del equipo
- [LANDING.md](./LANDING.md) - Documentación de la landing page
- [README.md](./README.md) - Información general del proyecto
