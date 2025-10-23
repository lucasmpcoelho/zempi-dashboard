# Zempi Dashboard

> Brazil's first WhatsApp-native GLP-1 companion with muscle preservation intelligence.

**Tagline:** "Seu coach de GLP-1 no WhatsApp - Perca peso, preserve músculo."

---

## 🎯 What is Zempi?

Zempi is a dual-interface GLP-1 companion app designed specifically for the Brazilian market:

- **WhatsApp Bot** (Primary Interface): Conversational AI for effortless daily tracking - meal logging, weight tracking, symptom logging, and Q&A - all via WhatsApp where Brazilians already spend 3+ hours/day.

- **Dashboard** (This Repo): Visual analytics interface for charts, trends, muscle preservation score, and doctor reports.

**Unique Value Propositions:**
1. **WhatsApp-Native** - ZERO global competitors, 99% penetration in Brazil, 90% message read rate
2. **Muscle Preservation Intelligence** - Quantified daily risk score (no competitor does this)
3. **Conversational + Visual Harmony** - Log anywhere, analyze everywhere

---

## 🏗️ Architecture

### Current Stack

**Frontend:**
- React 18 + TypeScript
- TailwindCSS + shadcn/ui components
- TanStack Query (React Query) for state management
- Recharts for data visualization
- Wouter for routing

**Backend:**
- PostgreSQL via Supabase
- Drizzle ORM for type-safe queries
- Supabase Auth (linked to WhatsApp users)
- Supabase Functions for intelligence layer (muscle score, pattern detection)

**WhatsApp Bot:**
- N8N workflows (MVP - rapid iteration)
- OpenAI/Anthropic LLM for Portuguese NLP
- Migration path to Node.js for scale (200+ DAU trigger)

**Hosting:**
- Dashboard: Vercel (auto-deploy from main branch)
- Database: Supabase (managed PostgreSQL)
- WhatsApp Bot: N8N Cloud → Node.js on Railway/Fly.io (future)

---

## 📚 Documentation

- **[Strategic Roadmap](./strategic-roadmap.md)** - 90-day execution plan (WhatsApp-first, parallel development)
- **[Product Spec](./spec.md)** - Detailed feature specifications and user stories
- **[Competitive Research](./competitive-research.md)** - US market analysis (benchmark, not competitors)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for database)

### Installation

```bash
# Clone the repo
git clone https://github.com/lucasmpcoelho/zempi-dashboard.git
cd zempi-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials to .env

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

The app will run at `http://localhost:5000`.

---

## 🗂️ Project Structure

```
zempi-dashboard/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/        # Weight chart, protein timeline
│   │   │   ├── dashboards/    # Muscle preservation, side effects
│   │   │   ├── panels/        # Overview, protein, treatment, wellness
│   │   │   ├── cards/         # Weekly summary, meal suggestions
│   │   │   ├── alerts/        # Smart alert system
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── pages/             # Dashboard, Onboarding
│   │   ├── lib/               # Utils, query client, meal database
│   │   └── hooks/             # Custom React hooks
├── server/                    # Backend Node.js
│   ├── index.ts               # Express server
│   ├── routes.ts              # API routes
│   ├── db.ts                  # Database connection
│   ├── migrations/            # Database migrations
│   └── seed.ts                # Database seeding
├── shared/                    # Shared types
│   └── schema.ts              # Drizzle schema
├── strategic-roadmap.md       # 90-day execution plan
├── spec.md                    # Product specification
├── competitive-research.md    # Market analysis
└── README.md                  # This file
```

---

## 🎨 Key Features

### Phase 1 (Weeks 1-2) - Foundation
- ✅ WhatsApp bot with meal logging (LIVE via N8N)
- ⏳ Weight & symptom logging via WhatsApp
- ⏳ Muscle Preservation Score algorithm (Supabase function)
- ⏳ Dashboard foundation with navigation
- ⏳ Weight progress chart with healthy zone

### Phase 2 (Weeks 3-4) - Intelligence
- ⏳ Proactive protein alerts via WhatsApp
- ⏳ Side effect pattern detection
- ⏳ Side effect calendar (heatmap)
- ⏳ Protein timeline visualization
- ⏳ Weekly summary card

### Phase 3 (Weeks 5-6) - Advanced Features
- ⏳ Photo meal logging (Clarifai API)
- ⏳ Voice note support (Whisper API)
- ⏳ Gamification (badges, streaks)
- ⏳ Symptom-aware meal suggestions

### Phase 4 (Weeks 7-12) - Launch
- ⏳ Two-way sync (WhatsApp ↔ Dashboard)
- ⏳ PDF export for doctor visits
- ⏳ Beta testing (30-50 users)
- ⏳ Soft launch in Brazilian GLP-1 communities

---

## 🧪 Development Workflow

### Branch Strategy
- `main` - Production (protected, auto-deploys to Vercel)
- `develop` - Staging (preview deployments)
- `feature/*` - Individual features

### Commit Convention
```
feat: new feature
fix: bug fix
docs: documentation changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

Example: `feat(dashboard): add muscle score gauge`

### Creating a Feature
```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/muscle-score-gauge

# Make changes, commit
git add .
git commit -m "feat(dashboard): add muscle score gauge component"

# Push and create PR
git push origin feature/muscle-score-gauge
```

---

## 📊 Intelligence Layer

The core intelligence (muscle score, pattern detection) lives in **Supabase Functions** (PostgreSQL):

- `calculate_muscle_score(user_id)` → Returns JSON with score, status, factors
- `detect_symptom_patterns(user_id)` → Returns JSON with patterns found
- `generate_weekly_summary(user_id)` → Returns JSON with metrics & insights

These functions are called by:
- **WhatsApp Bot** (N8N) → Formats response conversationally
- **Dashboard** (React) → Renders as charts/gauges

**Why Supabase Functions?**
- Logic in one place (no duplication)
- Type-safe with Drizzle schema
- Fast (runs in database, no round trips)

---

## 🌐 Deployment

### Vercel (Dashboard)
Connected to GitHub - automatic deployments:
- Push to `main` → Production deploy
- Push to `develop` → Preview deploy
- Pull requests → Preview deploy

**Environment Variables (Vercel):**
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

### Supabase (Database)
Managed PostgreSQL with:
- Auto-backups (daily)
- Real-time subscriptions
- Edge functions for intelligence layer

---

## 🎯 Success Metrics (90 Days)

- 500+ WhatsApp bot users (daily conversations)
- 50% D7 retention (WhatsApp-enabled)
- 60% users hitting protein goals 4+ days/week
- Dashboard accessed 2x/week for visualizations
- 30% viral coefficient (share bot with friends)
- R$2,500 MRR (85 paid users at R$29.90/month)

---

## 🚧 Roadmap

See **[strategic-roadmap.md](./strategic-roadmap.md)** for detailed 90-day execution plan.

**High-level milestones:**
- **Week 2:** WhatsApp logging complete + Dashboard foundation + Muscle score live
- **Week 4:** Proactive alerts + Pattern detection + Core visualizations
- **Week 6:** Photo/voice logging + Polish + Advanced insights
- **Week 12:** Beta tested + Soft launched + First 50+ users

---

## 🤝 Contributing

This is currently a solo project, but contributions may be welcome in the future. For now, refer to **[strategic-roadmap.md](./strategic-roadmap.md)** for development priorities.

---

## 📝 License

Proprietary - All rights reserved

---

## 🔗 Related Repositories

- **[zempi](https://github.com/lucasmpcoelho/zempi)** - Landing page (marketing site)
- **N8N Workflows** - WhatsApp bot logic (hosted on N8N Cloud, exported as JSON backup)

---

## 📧 Contact

**Lucas M P Coelho**
- GitHub: [@lucasmpcoelho](https://github.com/lucasmpcoelho)
- Email: [your-email]

---

**Built with ❤️ in Brazil for the Brazilian GLP-1 community**

*Last updated: October 2025*

