# Zempi Product Specification

**Version:** 2.0
**Last Updated:** 2025-10-24
**Status:** Strategic Planning Phase

---

## Executive Summary

Zempi is Brazil's first WhatsApp-native GLP-1 companion that ensures weight loss results are **permanent** by protecting muscle mass and building lasting habits. This specification outlines the product vision aligned with our strategic roadmap and four core value propositions.

---

## Vision & Core Promise

**CORE PROMISE:**
"Zempi ensures GLP-1 weight loss is permanent - protecting muscle and building habits that last beyond medication."

**Portuguese:** "Zempi garante que sua perda de peso com GLP-1 seja permanente - protegendo seus músculos e criando hábitos que duram além da medicação."

---

## Four Value Propositions

### 1. PROTECT YOUR MUSCLE

**User Outcome:** Lose fat, not muscle. Avoid sagging skin, weakness, and "Ozempic face"

**The Problem:**
- 25-40% of GLP-1 weight loss is muscle mass
- No competitor quantifies this risk daily
- Users fear sagging skin, weakness, premature aging

**Zempi's Solution:**
- Daily Muscle Risk Score (Green/Amber/Red gauge)
- Protein Optimization (research-backed 1.6g/kg targets)
- Smart Protein Alerts via WhatsApp
- Body Composition Tracking
- Protein × Weight Correlation Charts

**Competitive Moat:** High (6-9 months) - Unique algorithm

---

### 2. BUILD LASTING HABITS

**User Outcome:** Keep weight off when medication ends (prevent 67% regain rate)

**The Problem:**
- GLP-1 is temporary (6-12 months), results must be permanent
- 67% regain 2/3 of weight within 1 year after stopping
- Current apps build tracking habits, not behavioral habits

**Zempi's Solution:**
- Habit Formation Framework (weekly reflections)
- Gamification Tools (protein streaks, achievement badges)
- Personal Habit Template (analyzes 30 days of data)
- Maintenance Mode (for users stopping medication)

**Competitive Moat:** Medium-High (6-9 months) - Behavioral psychology expertise required

---

### 3. UNDERSTAND YOUR PATTERNS

**User Outcome:** Make informed decisions, reduce anxiety, optimize treatment

**The Problem:**
- Users don't know WHY or WHEN side effects happen
- Doctor appointments are brief - forget details
- "Am I normal?" anxiety from comparing to outliers

**Zempi's Solution:**
- Side Effect Correlation Engine (pattern detection)
- Anonymous Benchmarking (privacy-first)
- Dosage Decision Support (data for doctor conversations)
- PDF Reports for Doctor Visits

**Competitive Moat:** Medium-High (6-9 months) - Pattern detection requires data science

---

### 4. FEEL SUPPORTED

**User Outcome:** Combat loneliness, reduce shame, stay motivated

**The Problem:**
- 53% feel "getting healthy is lonely"
- Many hide medication use from family/friends
- Brazil is collectivist culture - community matters

**Zempi's Solution:**
- Community Insights Panel (anonymous aggregated data)
- Warm, Brazilian Tone (encouraging, friendly)
- WhatsApp-Native Support (90% message read rate)
- Beta WhatsApp Group (direct line to founder)

**Competitive Moat:** Medium (3-6 months) - Requires user base

---

## Product Architecture

### Dual-Interface Design

**WhatsApp Bot (Primary Interface):**
- Conversational AI for effortless daily tracking
- Meal logging, weight tracking, symptom logging
- Proactive alerts and coaching
- Q&A with memory and context
- Voice note and photo support

**Dashboard (Visual Analytics Interface):**
- Charts, trends, and visualizations
- Muscle preservation score display
- Pattern insights and correlations
- Doctor reports and exports
- Gamification progress tracking

**Why This Works:**
- WhatsApp: Where Brazilians already spend 3+ hours/day (99% penetration)
- Dashboard: When users need visual analysis and deeper insights
- Both interfaces share the same intelligence layer and database

---

## 90-Day Execution Plan

### Phase 1: Foundation Enhancement (Weeks 1-2)

**WhatsApp Enhancements:**
- Weight logging (natural language parsing)
- Symptom logging (keyword detection)
- Save to Supabase with confirmations

**Dashboard Foundation:**
- Shell with tab navigation (Overview, Muscle, Progress, Treatment)
- Data sync layer (TanStack Query + Supabase real-time)
- Mobile-first responsive design

**Intelligence Layer:**
- Muscle Preservation Score Algorithm (Supabase function)
- Accessible via both WhatsApp and Dashboard

---

### Phase 2: Intelligence & Visualization (Weeks 3-4)

**WhatsApp Proactive Alerts:**
- Smart protein alerts (low streak, excellent streak)
- Streak tracking (consecutive days hitting goals)
- Daily cron job at 9 PM Brazil time

**Dashboard Visualizations:**
- Weight Progress Chart (90 days, 7-day moving average, healthy zone)
- Muscle Score Gauge (circular gauge, color-coded)
- Side Effect Calendar (heatmap with patterns)

**Pattern Detection:**
- Basic pattern algorithm (dose timing correlations)
- Insights delivered to both interfaces

---

### Phase 3: Advanced Features & Polish (Weeks 5-6)

**WhatsApp Advanced Logging:**
- Photo meal logging (Clarifai API)
- Voice note support (Whisper API)
- Symptom-aware meal suggestions

**Dashboard Polish:**
- Weekly summary card (metrics + insights)
- Achievement badges (unlock triggers)
- Protein timeline view (30-day bar chart)

**Advanced Intelligence:**
- Symptom-aware meal suggestions
- Basic dosage insights (plateau detection)

---

### Phase 4: Integration, Beta & Launch (Weeks 7-12)

**Integration (Weeks 7-8):**
- Two-way sync (WhatsApp ↔ Dashboard)
- PDF report generator for doctors
- Analytics instrumentation (Mixpanel)

**Beta Testing (Weeks 9-10):**
- Recruit 30-50 users (WhatsApp groups, referrals)
- Beta WhatsApp group for feedback
- Monitor D7 retention and engagement metrics

**Iteration & Launch (Weeks 11-12):**
- Fix P0 bugs from beta
- Address top UX issues
- Soft launch in Brazilian GLP-1 communities

---

## Success Metrics (90 Days)

### Value Proposition Alignment

**VP1: PROTECT YOUR MUSCLE**
- 60%+ users hit protein goals 4+ days/week
- 70%+ achieve 7-day protein streak at least once
- Muscle score viewed 3+/week by 80%+ users

**VP2: BUILD LASTING HABITS**
- 50%+ create personal habit template (Week 5-6)
- 60%+ complete weekly reflection prompts 2+ times
- 70%+ maintain logging consistency (4+ days/week)

**VP3: UNDERSTAND YOUR PATTERNS**
- 30%+ view community insights panel weekly
- 30%+ generate PDF report for doctor visit
- Pattern insights surfaced for 80%+ users

**VP4: FEEL SUPPORTED**
- NPS score >35
- "Feel supported" survey score >4/5
- 30% viral coefficient (share bot with friends)

**Overall Business Metrics:**
- 500+ active users conversing with WhatsApp bot daily
- 50%+ D7 retention rate
- Dashboard accessed 1-2x/week
- R$2,500 MRR (85 paid users at R$29.90/month)

---

## Technical Architecture

### Frontend Stack
- Framework: React 18 + TypeScript
- State: TanStack Query (server state) + Zustand (UI state)
- Styling: TailwindCSS + shadcn/ui
- Charts: Recharts
- Animations: Framer Motion

### Backend Stack
- Database: PostgreSQL via Supabase
- ORM: Drizzle (type-safe queries)
- Auth: Supabase Auth (linked to WhatsApp users)
- Storage: Supabase Storage (photos, PDFs)
- Real-time: Supabase subscriptions

### WhatsApp Bot
- Automation: N8N workflows (MVP)
- NLP: OpenAI/Anthropic LLM
- Migration Path: Node.js at 200+ DAU

### APIs & Integrations
- Nutrition Data: Edamam API
- Photo Recognition: Clarifai Food API
- Speech-to-Text: OpenAI Whisper API
- AI/LLM: OpenAI GPT-4 or Anthropic Claude

---

## Intelligence Layer (Shared)

### Supabase Functions

**calculate_muscle_score(user_id)**
- Returns: JSON with score (0-100), status (safe/caution/high-risk), factors
- Algorithm: 70% weight on protein g/kg, 30% on weight loss rate
- Access: WhatsApp (conversational) + Dashboard (visual gauge)

**detect_symptom_patterns(user_id)**
- Returns: JSON with patterns found, frequency, recommendations
- Patterns: Dose timing, food triggers, time of day
- Access: WhatsApp (proactive message) + Dashboard (insights card)

**generate_weekly_summary(user_id)**
- Returns: JSON with metrics, score (0-100), auto-generated message
- Metrics: Weight change, protein performance, consistency, wellness
- Access: WhatsApp (Monday morning) + Dashboard (summary card)

---

## Data Models (Key Tables)

```sql
-- Core tracking
users (id, username, email, createdAt)
user_profiles (userId, name, medication, dose, startWeight, currentWeight, goalWeight)
meals (id, userId, date, time, protein, calories, carbs, fats, photoUrl)
weight_entries (id, userId, date, weight, source: 'manual' | 'healthkit' | 'whatsapp')
mood_entries (id, userId, date, mood, symptoms[], notes)
medication_doses (id, userId, scheduledDate, completed, completedAt)

-- Intelligence layer
alerts (id, userId, type, title, message, dismissed, createdAt)
insights (id, userId, category, content, metadata, createdAt)
achievements (id, userId, badgeId, unlockedAt)
streaks (id, userId, type, currentStreak, longestStreak, lastUpdated)

-- Meal database
meal_templates (id, name, protein, calories, portionSize, blandnessScore)

-- Premium
subscriptions (id, userId, tier, status, startDate, endDate, platform)
```

---

## UX Principles

### Design System
- Colors: Teal (trust), Green (success), Amber (warning), Red (alert)
- Typography: Inter (UI), JetBrains Mono (numbers)
- Spacing: 8px grid system
- Mobile-first responsive design

### WhatsApp Tone (Brazilian Portuguese)
- Warm, encouraging, friendly
- Celebrations with emoji
- "Você não está sozinha" messaging
- Não seja fria/clínica demais

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader optimized
- High contrast mode support

---

## Competitive Advantages

### WhatsApp-Native (12+ month moat)
- ZERO global competitors with WhatsApp-first GLP-1 tracking
- Cultural fit: 99% penetration in Brazil
- 10x lower friction than traditional apps
- Viral potential (share bot link, no download barrier)

### Muscle Preservation Intelligence (6-9 month moat)
- No competitor quantifies muscle loss risk daily
- Research-backed algorithm
- Addresses #1 user fear

### Habit Formation Focus (6-9 month moat)
- Personal habit template (unique)
- Maintenance mode for post-medication
- Behavioral psychology expertise

### User Autonomy (12+ month moat)
- Data ownership and transparency
- Doctor reports (empower, not prescribe)
- Privacy-first community insights

---

## Go-to-Market Strategy

### Positioning Statement

For GLP-1 users in Brazil who fear losing muscle mass, dread regaining weight after stopping medication, and feel alone in their health journey, Zempi is a WhatsApp-native AI coach that ensures your weight loss is permanent by protecting your muscle with daily risk scoring, building lasting habits through behavioral coaching, helping you understand your body's unique patterns, and providing supportive community insights—all delivered in WhatsApp where you already spend 3+ hours/day.

### Primary Tagline
**"Perca gordura, não músculo. Resultados que duram para sempre."**
(Lose fat, not muscle. Results that last forever.)

### Acquisition Channels
1. WhatsApp Groups (organic seeding)
2. Doctor Referrals (endocrinologists)
3. Beta Testers as Ambassadors (30% viral coefficient target)
4. GLP-1 Facebook Groups (Brazil)

---

## Risks & Mitigation

### Technical Risks
- **N8N Scalability:** Monitor performance, migrate to Node.js at 200+ DAU
- **WhatsApp API Compliance:** Follow guidelines strictly, have SMS backup

### Product Risks
- **Portuguese NLP Accuracy:** Use GPT-4/Claude, maintain keyword database, always confirm
- **Low User Adoption:** WhatsApp-first removes barriers, generous free tier

### Market Risks
- **Competitor Copies WhatsApp:** Move fast, build loyalty, 12+ month moat
- **Regulatory Issues:** Clear disclaimers, comply with ANVISA and LGPD

---

## Future Vision (Beyond 90 Days)

### 6 Months
- 2,000+ daily active users
- Node.js migration completed
- Advanced intelligence (predictive insights)
- R$15-20K MRR

### 12 Months
- 5,000+ daily active users
- Proven retention (>40% D30, >25% D90)
- Expand to LATAM (Argentina, Mexico)
- R$50K+ MRR
- Decision: Bootstrap profitable or raise seed

---

## Implementation Priorities

### This Month (P0 - Must Have)
1. Weight & symptom logging via WhatsApp
2. Muscle Preservation Score algorithm
3. Dashboard foundation with navigation
4. Weight Progress Chart

### Next Month (P1 - Should Have)
5. Proactive protein alerts
6. Side effect pattern detection
7. Photo & voice meal logging
8. Weekly summary cards

### Month 3 (P2 - Nice to Have)
9. Gamification (badges, streaks)
10. Advanced visualizations
11. PDF reports for doctors

---

## References

### Strategic Documents
- [Strategic Roadmap](./strategic-roadmap.md) - 90-day execution plan
- [Competitive Research](./competitive-research.md) - US market analysis

### Research Foundation
- Protein requirements during weight loss (1.6g/kg)
- GLP-1 side effect patterns and management
- Weight loss velocity and muscle preservation
- Behavioral psychology for habit formation

---

**End of Product Specification v2.0**

*This specification aligns with Strategic Roadmap v2.1 and embraces the four value propositions as our competitive foundation. Updated October 2025 to reflect WhatsApp-first approach and permanent results focus.*
