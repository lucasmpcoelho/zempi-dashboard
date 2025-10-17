# Design Guidelines: Zempi GLP-1 Companion

## Design Approach

**Hybrid Strategy:**
- **Onboarding:** Lemonade-inspired playful professionalism - quick, delightful, trust-building interactions
- **Dashboard:** Health-focused utility interface inspired by modern health apps (MyFitnessPal, Noom) with clinical credibility

**Core Principle:** Balance approachability with medical authority. Users need to feel supported, not intimidated.

## Color Palette

**Primary Colors:**
- Medical Teal: 180 65% 45% (trust, clinical precision)
- Deep Navy: 220 40% 15% (authority, stability)
- Soft White: 0 0% 98% (clean background)

**Accent Colors:**
- Success Green: 145 60% 50% (progress, positive outcomes)
- Warm Coral: 15 75% 60% (encouragement, human touch)
- Alert Amber: 35 85% 55% (warnings, attention)

**Neutral Palette:**
- Text Primary: 220 30% 20%
- Text Secondary: 220 15% 50%
- Borders: 220 10% 90%
- Background Alt: 220 5% 96%

**Dark Mode:**
- Background: 220 25% 10%
- Surface: 220 20% 15%
- Text: 0 0% 95%

## Typography

**Font Stack:**
- **Headlines & UI:** Inter (via Google Fonts) - clean, medical-grade readability
- **Body Text:** Inter - consistent throughout
- **Data/Numbers:** JetBrains Mono (for precise medical values)

**Scale:**
- Hero/H1: text-4xl md:text-5xl font-bold
- H2: text-3xl md:text-4xl font-semibold
- H3: text-2xl font-semibold
- Body: text-base leading-relaxed
- Small/Meta: text-sm
- Numbers/Data: text-lg md:text-xl font-mono

## Layout System

**Spacing Primitives:** Use Tailwind units 2, 4, 6, 8, 12, 16, 20, 24, 32
- Micro spacing: p-2, gap-4
- Component spacing: p-6, p-8, gap-8
- Section spacing: py-12 md:py-20, gap-12
- Container: max-w-7xl mx-auto px-4 md:px-8

**Grid System:**
- Onboarding: Single column, max-w-md mx-auto (focused, distraction-free)
- Dashboard: Grid system - grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for cards

## Component Library

### Onboarding Components

**Question Cards:**
- Large, centered cards (max-w-md) with generous padding (p-8)
- Soft shadows (shadow-lg) with rounded-2xl borders
- Single question per screen with playful micro-animations (slide in from right)
- Progress bar at top (h-1, gradient from teal to coral)

**Input Styles:**
- Large touch targets (h-14 min-h-[56px])
- Rounded-xl borders with focus:ring-2 ring-teal
- Placeholder text in secondary color
- Icons on left side for context (Heroicons)

**Button Selections:**
- Pill-shaped option buttons (rounded-full px-6 py-3)
- Hover: scale-105 transform
- Selected state: bg-teal text-white
- Unselected: bg-background-alt border-2 border-borders

**Navigation:**
- Back button (top-left, ghost style)
- Continue button (bottom, full-width on mobile, fixed position)
- Skip option for optional questions (text-sm, secondary color)

### Dashboard Components

**Metric Cards:**
- Grid layout with 3-4 cards per row (desktop)
- White background (dark mode: surface color) with subtle border
- Icon in colored circle (bg-teal/10, text-teal)
- Large number display (text-3xl font-mono)
- Label below (text-sm text-secondary)

**Charts & Graphs:**
- Weight progress: Line chart with gradient fill (teal to transparent)
- Medication timeline: Horizontal timeline with milestones
- Side effects tracker: Simple bar chart or dot indicators

**Information Panels:**
- Collapsible sections with chevron icons
- Educational content in max-w-prose containers
- Tip cards with light coral background for encouragement

**Navigation:**
- Sidebar (desktop): Fixed left, w-64, icons + labels
- Mobile: Bottom tab bar with 4-5 main sections
- Icons: Heroicons outline for inactive, solid for active

## Animations & Interactions

**Onboarding:**
- Question transitions: Slide in from right (200ms ease-out)
- Progress bar: Smooth width transition (300ms)
- Button hover: Subtle scale (scale-105)
- Success checkmark animation on question completion

**Dashboard:**
- Card hover: Subtle lift (shadow-md → shadow-lg)
- Chart animations: Gradual reveal on mount (1s ease)
- No distracting continuous animations
- Loading states: Subtle pulse on skeleton loaders

## Content Strategy

**Onboarding Flow:**
1. Welcome screen with Zempi branding and reassuring message
2. Name (warm, personal greeting)
3. Age/DOB (with helpful calendar picker)
4. Medication selection (visual pills with names)
5. Physical metrics (height/weight with clear cm/kg labels)
6. Dose (with common dosages as quick-select)
7. Body type (illustrated options, inclusive language)
8. Food restrictions (multi-select chips)
9. Comorbidities (checkboxes with medical icons)
10. Privacy consent (clear, LGPD-compliant language)
11. Success screen → redirect to WhatsApp or Dashboard

**Dashboard Sections:**
1. Overview/Home: Key metrics at a glance
2. Minha Jornada: Timeline of progress and milestones
3. Dados Pessoais: Editable profile information
4. Educação: Personalized tips and GLP-1 information
5. Configurações: Preferences and account settings

## Images

**Onboarding:**
- Welcome screen: Abstract medical illustration (not stock photo) - subtle, trustworthy
- Success/completion screen: Celebration illustration (simple, friendly)

**Dashboard:**
- Empty states: Friendly illustrations encouraging first data entry
- Educational sections: Diagrams explaining GLP-1 mechanisms (simple, medical-grade)

**Style:** Prefer illustrations over photos. Use muted colors aligned with brand palette. Avoid generic stock photography.

## Accessibility & Best Practices

- All form inputs with clear labels and aria-labels
- Color contrast ratio minimum 4.5:1 for text
- Keyboard navigation fully supported
- Focus indicators clearly visible (ring-2 ring-teal)
- Error messages in Portuguese, actionable and friendly
- Loading states for all async operations
- Success feedback for all form submissions
- Dark mode respects user's system preference

## Portuguese (PT-BR) Language Considerations

- Use "você" (informal but respectful)
- Medical terms: Maintain professional accuracy while being accessible
- Button labels: Action-oriented ("Continuar", "Salvar", "Começar")
- Error messages: Helpful and non-technical ("Por favor, insira sua altura em centímetros")
- Encouragement: Warm and supportive tone throughout