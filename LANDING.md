# Landing Page - ProAgent

Landing page creada basándose en el diseño de Figma proporcionado.

## 🎨 Diseño

La landing page sigue el diseño del header de Figma y se ha expandido con secciones completas incluyendo:

- **Navbar**: Navegación con logo y menú (basado en el diseño de Figma)
- **Hero**: Sección principal con título y CTAs
- **Features**: Tarjetas de características con iconos
- **Pricing**: Planes de precios con 3 tiers
- **FAQ**: Preguntas frecuentes con acordeones
- **CTA**: Llamada a la acción final
- **Footer**: Footer completo con links

## 🏗️ Arquitectura

La landing page sigue el patrón Container/Presentational del equipo:

### Componentes Dumb (Presentacionales)

Cada componente tiene su propio archivo `.scss` separado:

```
src/components/
├── layout/
│   ├── LandingNavbar/
│   │   ├── LandingNavbar.tsx
│   │   ├── LandingNavbar.scss
│   │   └── index.ts
│   └── LandingFooter/
│       ├── LandingFooter.tsx
│       ├── LandingFooter.scss
│       └── index.ts
└── shared/
    ├── HeroSection/
    │   ├── HeroSection.tsx
    │   ├── HeroSection.scss
    │   └── index.ts
    ├── FeatureCard/
    ├── PricingCard/
    └── FAQItem/
```

### Componente Smart (Módulo)

```
src/components/landing/
└── LandingPage/
    ├── LandingPage.module.tsx    # Orquesta todos los componentes dumb
    ├── LandingPage.module.scss
    └── index.ts
```

### Página

```
src/app/[locale]/landing/page.tsx   # Solo importa el módulo smart
```

## 🎨 Colores del Diseño

Basado en el diseño de Figma:

- **Background**: `#f1f5f9` (slate/100)
- **Header**: `#ffffff` (white)
- **Texto principal**: `#1b2340` (dark blue)
- **Accent**: `#ffa300` (naranja del logo)
- **Texto nav**: `12px` fuente Inter

## 🌍 Internacionalización

Todos los textos están internacionalizados en 3 idiomas:

- Español (`es`)
- Inglés (`en`)
- Portugués brasileño (`pt-BR`)

Los textos se encuentran en:

```
messages/
├── es.json
├── en.json
└── pt-BR.json
```

## 🚀 Acceder a la Landing Page

Una vez ejecutado el proyecto con `npm run dev`, puedes acceder a:

- **Español**: http://localhost:3000/landing
- **Inglés**: http://localhost:3000/en/landing
- **Portugués**: http://localhost:3000/pt-BR/landing

## 📱 Responsive

La landing page es completamente responsive con breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Características

### Logo

El logo SVG proporcionado está en `/public/logo.svg` y se usa en:
- Navbar
- Footer

### Navegación

Los links del navbar son:
- ¿Cómo funciona? → `#how-it-works`
- Planes → `#pricing`
- Preguntas Frecuentes → `#faq`
- Únete Ahora → `/subscribe`
- Iniciar Sesión → `/login`

### Estilos

- Usa SASS con variables y mixins del proyecto
- Todos los componentes tienen estilos separados
- Sigue las convenciones del equipo
- Transiciones suaves
- Efectos hover en cards y botones

## 🔧 Personalización

Para modificar contenido:

1. **Textos**: Editar archivos en `messages/`
2. **Estilos**: Editar archivos `.scss` de cada componente
3. **Lógica**: Editar `LandingPage.module.tsx`

## 📚 Referencias

- [Diseño en Figma](https://www.figma.com/design/twKWrutYCmAiWfRTOdqHYJ/Proagent-2?node-id=250-495)
- Patrón Smart/Dumb: Ver `CLAUDE.md`
- Guías de estilo: Ver `src/styles/`
