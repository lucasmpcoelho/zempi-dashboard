# Strategic Roadmap: Zempi
## 90-Day Execution Plan for Brazil's First WhatsApp-Native GLP-1 Coach

**Version:** 2.1
**Date:** October 2025 (Strategic Update)
**Status:** In Execution (WhatsApp MVP Live)
**Market:** Brazil
**Current Stage:** Enhancing MVP + Building Dashboard

---

## Executive Summary

This roadmap outlines a 90-day plan to scale and enhance **Zempi** - Brazil's first WhatsApp-native GLP-1 companion that protects muscle mass during weight loss.

**Current Reality:** 
- ✅ WhatsApp MVP is **LIVE** via N8N with: onboarding, meal logging, nutrition analysis, conversational Q&A with memory
- ⏳ Dashboard exists but needs almost complete overhaul for visualization needs
- 🎯 Both products connect via Supabase, developed in parallel

**Core Thesis:**
Users taking GLP-1 medications (Ozempic, Wegovy, Mounjaro) in Brazil need:
1. **Frictionless daily tracking** → WhatsApp (where they already spend 3+ hours/day)
2. **Muscle preservation intelligence** → No competitor quantifies muscle loss risk
3. **Proactive coaching & motivation** → Smart insights, gamification, lasting habit formation
4. **Control over their health journey** → Data-driven decisions, doctor reports, autonomy

**Competitive Positioning:**
"Brazil's only WhatsApp-native GLP-1 coach that protects your muscle, builds lasting habits, and empowers you with data - no app download needed."

**Unique Advantages:**
- **ZERO global competitors** with WhatsApp-first GLP-1 tracking
- **Cultural fit:** WhatsApp has 99% penetration in Brazil, used for everything
- **10x lower friction:** Text to log vs. opening app, navigating UI
- **90% engagement:** WhatsApp message read rate vs. 15% push notification open rate

**Success Metrics (90 Days):**
- 500+ active users conversing with WhatsApp bot daily
- 40%+ D7 retention rate (WhatsApp conversation retention)
- 60%+ users achieving protein goals 4+ days/week
- 70%+ users maintain 7-day protein streak at least once (gamification engagement)
- 50%+ users unlock 3+ achievement badges (habit formation)
- 30%+ users generate PDF report for doctor visit (autonomy/empowerment)
- Dashboard accessed 1-2x/week for visual analysis
- 30% viral coefficient (users share bot with friends)
- R$2,500 MRR (50 paid users at R$29.90/month)

---

## PART 1: Product Vision & Value Proposition

### Vision Statement

Transform GLP-1 weight loss from "just lose weight" to "lose fat, preserve muscle, build lasting habits" through **conversational AI in WhatsApp** (where Brazilians already live) that proactively coaches, celebrates progress, and empowers users with data—creating sustainable health beyond medication.

**The Paradigm Shift:**
- **Traditional apps:** Download → onboard → open daily → navigate UI → log → close → forget → regain weight
- **Zempi:** Message your WhatsApp coach → instant response → smart insights → celebrate wins → build habits that last

### Core Value Propositions

#### 1. WhatsApp-Native Experience (Primary Differentiator)
**User Benefit:** "Track everything where you already are - no app downloads, no friction"

**Features:**
- Conversational meal logging ("almocei frango 200g e arroz")
- Weight & symptom tracking via simple messages
- Smart AI that remembers your context and preferences
- Proactive alerts delivered as WhatsApp messages
- Voice note support (Brazilian cultural preference)
- Photo meal logging (send image, get instant analysis)

**Why This Wins:**
- **ZERO global competitors** do WhatsApp-native GLP-1 tracking
- **99% penetration** in Brazil (vs. fragmented messaging in US)
- **90% read rate** for WhatsApp vs. 15% for push notifications
- **Cultural fit:** "Me manda no WhatsApp" is the default Brazilian communication
- **Viral potential:** Share bot link in groups → entire group can try (no download barrier)

---

#### 2. Muscle Preservation Intelligence (Secondary Differentiator)
**User Benefit:** "Know if you're losing fat or muscle, with daily risk scoring"

**Features:**
- Muscle Risk Score (calculated in DB, accessible via WhatsApp Q&A and dashboard gauge)
- Body composition estimator (algorithm-based)
- Protein × weight correlation charts (dashboard)
- Smart protein alerts (delivered via WhatsApp)
- Research-backed targets (1.6g/kg protein)

**Why It Matters:**
- #1 user fear: Muscle loss, sagging skin, weakness
- No competitor quantifies this risk
- Addresses the "Will I lose muscle?" anxiety

**Delivery:**
- WhatsApp: "Seu score muscular hoje é 78 (zona segura). Continue assim!"
- Dashboard: Visual gauge with breakdown and trends

---

#### 3. Proactive AI Coach with Gamification (Engagement Differentiator)
**User Benefit:** "Stay motivated with smart coaching that celebrates wins, detects patterns, and builds lasting habits"

**The Problem:**
- GLP-1 is temporary (6-12 months), but healthy habits must be permanent
- 60%+ of users regain weight post-treatment due to lack of habit formation
- Generic tracking apps require willpower; behavioral coaching creates automatic habits

**Features:**

**Proactive Intelligence:**
- Smart alerts delivered via WhatsApp (where you already are)
  - "⚠️ Proteína baixa 3 dias seguidos. Risco muscular aumentado!"
  - "💪 Você atingiu a meta de proteína 7 dias! Parabéns!"
- Pattern detection for side effects
  - "Você costuma sentir náusea 2 dias após a dose. Evite gordura hoje."
- Context-aware meal suggestions
  - Adapts to current symptoms, protein needs, and preferences
  - "Com náusea, recomendo: Iogurte grego (25g proteína, leve)"

**Gamification for Habit Formation:**
- 🔥 **Protein Streaks**: Consecutive days hitting 1.6g/kg target
  - Celebrations at 7, 14, 30 days with animations
  - Visual fire emoji grows with streak length
- 💪 **Achievement Badges**: Milestone unlocks
  - First Week Warrior (7 days tracking)
  - Muscle Defender (30 days optimal protein)
  - Goal Crusher (reach target weight)
- 📊 **Weekly Summaries**: Auto-generated progress cards
  - Score: 0-100 based on adherence, results, consistency
  - Shareable via WhatsApp groups

**Why This Wins:**
- **Behavioral psychology**: Gamification increases retention by 40-60% (industry research)
- **No competitor combines**: Proactive WhatsApp coaching + Brazilian cultural tone + GLP-1-specific gamification
- **Habit formation**: Users build sustainable behaviors that persist after medication stops
- **Cultural fit**: Warm, celebratory tone matches Brazilian communication style
- **WhatsApp delivery**: 90% message read rate vs. 15% push notification open rate

**Delivery:**
- WhatsApp: Proactive messages throughout the day based on your data
- Dashboard: Visual streak counters, achievement gallery, weekly summary cards

**Competitive Moat:** Medium-High (6-9 months) - Requires AI integration, behavioral psychology expertise, WhatsApp API

---

#### 4. User Autonomy & Data Ownership (Empowerment Differentiator)
**User Benefit:** "Take control of your GLP-1 journey with data-driven insights for confident decisions"

**The Problem:**
- Doctor appointments are brief (15-30 min), you forget details or can't articulate patterns
- "Should I increase my dose?" → You rely on feelings, not data
- Paternalistic healthcare leaves users feeling powerless
- Post-treatment: No understanding of what worked and why

**Features:**

**Data-Driven Insights:**
- **Dosage Decision Support Dashboard**
  - Analyzes: Weight loss rate, side effect severity, time on current dose, adherence
  - Recommendation: "Consider discussing dose increase with doctor" (with reasoning)
  - Clear disclaimers: Not medical advice, just organized data
- **PDF Reports for Doctor Visits**
  - Weight progress chart with healthy zone markers
  - Protein intake trends (vs. muscle risk score)
  - Side effect calendar with detected patterns
  - Medication adherence log
  - Professional medical aesthetic
- **Transparent Data Access**
  - Export all your data anytime (CSV, JSON)
  - No vendor lock-in
  - Privacy-first: Your data belongs to you

**Autonomy Philosophy:**
- **You own your health journey**: We provide tools, you make decisions
- **Data empowers conversations**: Walk into doctor appointments confident and informed
- **Learn what works for YOUR body**: Patterns are personalized, not generic advice
- **Build knowledge for life**: Understand your metabolic health beyond GLP-1

**Why This Wins:**
- **Philosophical differentiation**: Tier 1 platforms (Noom, Calibrate) are prescriptive/coaching-heavy
  - They tell you what to do
  - **Zempi gives you data to decide**
- **Target persona fit**: Maria (35-45, professional) wants to understand, not just obey
- **Brazil healthcare context**: Doctor-patient relationships are paternalistic
  - Bringing organized data elevates the conversation
  - You become an informed participant, not passive recipient
- **Post-treatment value**: Knowledge persists after medication ends
- **Trust building**: Transparency about data ownership builds user confidence

**Delivery:**
- Dashboard: Dosage insights panel, export buttons, report generator
- WhatsApp: "Quer que eu prepare um relatório para seu médico?" (contextual prompts)

**Competitive Moat:** High (12+ months) - Regulatory risk deters competitors, requires clinical validation, liability concerns

---

### Positioning Statement

**For** GLP-1 users in Brazil who fear losing muscle mass, want to build lasting healthy habits, and desire control over their health journey,

**Zempi** is a WhatsApp-native AI coach with intelligent dashboard

**That** tracks your progress effortlessly (where you already spend 3+ hours/day), protects your muscle with daily risk scoring, keeps you motivated with smart coaching and gamification, and empowers you with data to make confident decisions—all in Portuguese with the warm, supportive tone Brazilians expect,

**Unlike** US apps requiring downloads and daily effort (Shotsy, Gala, Noom, Calibrate) or expensive coaching platforms that tell you what to do,

**Zempi** meets you in WhatsApp, understands your unique patterns, celebrates your wins, and gives you the data to take control—building habits that last far beyond GLP-1.

**Tagline:** "Seu coach de GLP-1 no WhatsApp - Perca peso, preserve músculo, crie hábitos duradouros."

---

## PART 2: Target Market & User Personas

### Primary Persona: "Maria, the Concerned Professional"

**Demographics:**
- Age: 35-45
- Gender: Female (70% of GLP-1 users)
- Location: São Paulo, Rio de Janeiro (urban Brazil)
- Income: R$8,000-15,000/month (middle-to-high)
- Occupation: Professional (marketing, finance, tech)

**GLP-1 Journey:**
- Medication: Ozempic 0.5mg → 1.0mg (titrating)
- Cost: R$800-1,200/month (significant investment)
- Duration: 2-3 months in, planning 6-12 month course
- Weight Loss Goal: 15-20kg

**Psychographic:**
- Health-conscious: Already tracks calories or workouts sometimes
- Tech-savvy: Uses WhatsApp daily, comfortable with apps
- Time-constrained: Busy schedule, wants efficient tools
- Results-driven: Willing to invest if she sees value

**Top Fears:**
1. Losing muscle mass (sagging skin, weakness, aging appearance)
2. Unpredictable side effects ruining workday
3. Spending R$800-1,200/month without optimal results
4. Regaining weight after stopping treatment

**Critical Needs:**
1. Know if I'm eating enough protein (daily tracking + trend)
2. Understand what's normal (am I losing weight too fast/slow?)
3. Manage side effects (when do they happen? what triggers them?)
4. Feel confident in dose changes (data to discuss with doctor)
5. Stay motivated (see progress beyond the scale)

**Current Behavior:**
- **Lives in WhatsApp:** Uses it for everything - family, work, shopping, banking (3+ hours/day)
- **Voice notes > typing:** Prefers audio messages for quick communication
- **Low app tolerance:** Downloads apps reluctantly, abandons quickly if friction exists
- **Occasionally tracks meals** in notes app or MyFitnessPal (but forgets/stops)
- **Googles "Ozempic muscle loss"** and finds conflicting info
- **Asks doctor questions** but forgets details between visits
- **Shares everything in WhatsApp groups:** Health tips, recommendations, experiences

**Jobs to Be Done:**
- **Functional:** Track medication, weight, protein intake, side effects WITHOUT app friction
- **Emotional:** Feel in control, reduce anxiety about muscle loss, have a supportive coach
- **Social:** Share progress easily, understand if experience is normal
- **Convenience:** Log in 5 seconds while doing other things (via WhatsApp)

---

### Secondary Persona: "Ricardo, the Fitness Enthusiast"

**Demographics:**
- Age: 28-40
- Gender: Male
- Location: Urban Brazil
- Occupation: Varied (professional, entrepreneur)

**GLP-1 Journey:**
- Medication: Mounjaro or Zepbound (dual action)
- Goal: Accelerate fat loss while maintaining gym gains
- Already tracks macros religiously

**Top Fear:**
- Losing hard-earned muscle mass

**Critical Need:**
- Precise protein and body composition tracking
- Integration with fitness trackers

**Why He's Secondary:**
- Smaller market segment (30% of users)
- More self-sufficient (already knows nutrition)
- Lower willingness to pay (expects free tools)

---

### Market Sizing (Brazil)

**Total Addressable Market (TAM):**
- GLP-1 users in Brazil: ~500K-1M (estimate, growing rapidly)
- With smartphone + internet: ~400K-800K

**Serviceable Addressable Market (SAM):**
- Willing to use companion app: ~200K-400K (50%)
- Urban, middle-to-high income: ~100K-200K

**Serviceable Obtainable Market (SOM - Year 1):**
- Realistic capture: 0.5-1% = 500-2,000 users
- Aggressive: 1-2% = 1,000-4,000 users

**Revenue Potential (Year 1, 20% conversion to premium):**
- Conservative: 500 users × 20% × R$29.90/mo × 12 mo = R$35,880
- Moderate: 1,000 users × 20% × R$29.90/mo × 12 mo = R$71,760
- Aggressive: 2,000 users × 20% × R$29.90/mo × 12 mo = R$143,520

---

## PART 3: Product Roadmap - 90-Day Enhancement Plan

### Current State (What's Live)

**WhatsApp Bot (via N8N):**
- ✅ Onboarding flow
- ✅ Conversational meal logging with nutrition analysis
- ✅ Smart conversational AI with memory (understands context, answers questions)
- ✅ Database logging to Supabase
- ✅ Portuguese language support

**Dashboard (Needs Rebuild):**
- ⚠️ Exists but requires almost complete overhaul
- ⚠️ Current UI doesn't serve visualization needs well

**Missing (To Build):**
- ❌ Weight & symptom logging via WhatsApp
- ❌ Proactive alerts (protein warnings, streaks, insights)
- ❌ Pattern detection algorithms (side effects, muscle risk)
- ❌ Muscle Preservation Score calculation
- ❌ Dashboard visualizations (charts, gauges, calendar views)
- ❌ Photo & voice logging via WhatsApp
- ❌ PDF export for doctor visits

---

### Overview: 4 Phases (Parallel Development)

| Phase | Duration | WhatsApp Track | Dashboard Track | Intelligence Layer |
|-------|----------|----------------|-----------------|-------------------|
| **Phase 1** | Weeks 1-2 | Add Weight/Symptom Logging | Start Dashboard Rebuild | Muscle Score Algorithm |
| **Phase 2** | Weeks 3-4 | Proactive Alerts System | Core Visualizations | Pattern Detection Engine |
| **Phase 3** | Weeks 5-6 | Photo/Voice Logging | Polish & Gamification | Advanced Insights |
| **Phase 4** | Weeks 7-12 | Two-Way Sync | Integration & Export | Beta Testing & Launch |

---

### PHASE 1: Foundation Enhancement (Weeks 1-2)
**Goal:** Complete WhatsApp core logging + Start dashboard rebuild + Build muscle score algorithm

---

#### Track A: WhatsApp Enhancements (N8N Workflows)

**Feature 1A.1: Weight Logging**

**Priority:** P0 (Core Feature Missing)
**Effort:** 1 day
**Current State:** Not implemented

**User Story:**
> "As a user, I want to log my weight by just sending a number to WhatsApp, so I can track progress effortlessly."

**Implementation:**
- Detect weight messages: "82.5", "pesei 82.5kg", "82.5 hoje"
- Parse number and unit (kg)
- Save to `weight_entries` table in Supabase
- Respond with confirmation + trend: "✅ Peso registrado: 82.5kg. -0.5kg desde semana passada!"

**Edge Cases:**
- Invalid number → Ask for clarification
- Multiple numbers in message → Ask which is weight
- First weight entry → Mark as starting weight

---

**Feature 1A.2: Symptom Logging**

**Priority:** P0 (Core Feature Missing)
**Effort:** 1 day
**Current State:** Not implemented

**User Story:**
> "As a user, I want to log symptoms by describing how I feel, so the bot can track patterns."

**Implementation:**
- Detect symptom keywords: "nausea", "náusea", "enjoo", "fadiga", "cansaço", "constipação", "prisão de ventre"
- Parse severity from context (if mentioned)
- Save to `mood_entries` table with symptoms array
- Respond with empathy + tip: "😔 Registrei náusea. Dica: refeições leves ajudam."

**Keywords Database:**
```typescript
const symptomKeywords = {
  nausea: ['nausea', 'náusea', 'enjoo', 'enjoada'],
  fatigue: ['fadiga', 'cansaço', 'cansada', 'sem energia'],
  constipation: ['constipação', 'prisão de ventre', 'intestino preso'],
  headache: ['dor de cabeça', 'enxaqueca'],
  dizziness: ['tontura', 'tonta']
}
```

---

#### Track B: Dashboard Rebuild (React/TypeScript)

**Feature 1B.1: Dashboard Shell & Navigation**

**Priority:** P0 (Foundation)
**Effort:** 2 days
**Current State:** Needs complete overhaul

**Requirements:**
- Clean, modern UI using existing shadcn/ui components
- Tab-based navigation: Overview, Muscle, Progress, Treatment
- Mobile-first responsive design
- Dark/light mode support
- Supabase auth integration (sync with WhatsApp users)

**Navigation Structure:**
```
📊 Overview     💪 Muscle     📈 Progress     💊 Treatment
```

---

**Feature 1B.2: Data Sync Layer**

**Priority:** P0 (Critical Infrastructure)
**Effort:** 2 days

**Requirements:**
- TanStack Query setup for Supabase data fetching
- Real-time subscriptions to user data changes
- Optimistic updates for logged data
- Error handling and retry logic
- Cache strategy (5min stale time for most data)

**Key Queries:**
```typescript
useUserProfile()           // Basic user info, goals
useMealHistory(days: 30)   // Recent meals
useWeightHistory(days: 90) // Weight entries
useMoodHistory(days: 30)   // Symptoms logged
```

---

#### Track C: Intelligence Layer (Backend/DB)

**Feature 1C.1: Muscle Preservation Score Algorithm**

**Priority:** P0 (Core Differentiator)
**Effort:** 3 days
**Current State:** Not implemented

**User Story:**
> "As a user, I want to see a daily score showing if I'm at risk of losing muscle, accessible from WhatsApp Q&A and dashboard."

**Implementation:**

**Algorithm (Supabase Function):**
```sql
CREATE OR REPLACE FUNCTION calculate_muscle_score(user_id UUID)
RETURNS JSON AS $$
DECLARE
  score INTEGER := 0;
  protein_g_per_kg DECIMAL;
  weekly_loss_rate DECIMAL;
  status TEXT;
  color TEXT;
BEGIN
  -- Calculate protein g/kg (last 7 days average)
  SELECT AVG(daily_protein / current_weight)
  INTO protein_g_per_kg
  FROM user_daily_stats
  WHERE user_id = $1 AND date >= CURRENT_DATE - 7;
  
  -- Calculate weekly weight loss rate
  SELECT (weight_7_days_ago - current_weight) / 1.0
  INTO weekly_loss_rate
  FROM user_weight_trends
  WHERE user_id = $1;
  
  -- Score protein (70% weight)
  IF protein_g_per_kg >= 1.6 THEN score := score + 70;
  ELSIF protein_g_per_kg >= 1.4 THEN score := score + 45;
  ELSIF protein_g_per_kg >= 1.2 THEN score := score + 20;
  END IF;
  
  -- Score weight loss rate (30% weight)
  IF weekly_loss_rate BETWEEN 0.5 AND 1.0 THEN score := score + 30;
  ELSIF weekly_loss_rate > 1.0 THEN score := score + 15;
  ELSE score := score + 10;
  END IF;
  
  -- Determine status
  IF score >= 70 THEN 
    status := 'safe'; 
    color := 'green';
  ELSIF score >= 50 THEN 
    status := 'caution'; 
    color := 'amber';
  ELSE 
    status := 'high-risk'; 
    color := 'red';
  END IF;
  
  RETURN json_build_object(
    'score', score,
    'status', status,
    'color', color,
    'protein_g_per_kg', protein_g_per_kg,
    'weekly_loss_rate', weekly_loss_rate
  );
END;
$$ LANGUAGE plpgsql;
```

**Access Points:**
1. **WhatsApp:** User asks "qual meu score muscular?" → Bot calls function → Returns conversational response
2. **Dashboard:** Visual gauge component calls function → Displays score with breakdown

**Dashboard Visual (Build in Phase 1, Polish in Phase 2):**
```
┌─────────────────────────────────────┐
│  💪 Score de Preservação Muscular   │
├─────────────────────────────────────┤
│       Score: 75/100 (Zona Segura)   │
│       [████████░░] 🟢              │
│                                     │
│  Fatores:                           │
│  • Proteína: 1.7g/kg ✅             │
│  • Perda semanal: 0.7kg ✅          │
│                                     │
│  [Ver Detalhes]                     │
└─────────────────────────────────────┘
```

---

### Phase 1 Success Criteria

**WhatsApp Track:**
- ✅ Users can log weight with simple message
- ✅ Users can log symptoms with natural language
- ✅ Both save correctly to Supabase

**Dashboard Track:**
- ✅ Clean shell with navigation working
- ✅ Data syncing from Supabase in real-time
- ✅ Mobile responsive

**Intelligence Track:**
- ✅ Muscle score calculation working
- ✅ Accessible via API for both WhatsApp and Dashboard
- ✅ Returns accurate score based on user data

---

### PHASE 2: Intelligence & Visualization (Weeks 3-4)
**Goal:** Make bot proactive + Build core dashboard visualizations + Pattern detection

---

#### Track A: WhatsApp Proactive Alerts (N8N Workflows)

**Feature 2A.1: Smart Protein Alerts**

**Priority:** P0 (Core Engagement Driver)
**Effort:** 2 days
**Current State:** Not implemented

**User Story:**
> "As a user, I want WhatsApp alerts when my protein is low for multiple days, so I can course-correct before losing muscle."

**Implementation:**
- Daily cron job (runs at 9 PM Brazil time)
- Queries last 3 days of protein data from Supabase
- Sends WhatsApp message if conditions met

**Alert Types:**

**1. Low Protein Streak:**
```
⚠️ Alerta de Proteína

Você está há 3 dias abaixo de 1.4g/kg.

Seu score muscular caiu para ATENÇÃO (🟡).

💡 Recomendo aumentar proteína amanhã!
```

**2. Excellent Streak:**
```
🔥 7 Dias de Proteína Excelente!

Você bateu a meta de 1.6g/kg todos os dias.

💪 Seus músculos agradecem!
```

**3. Daily Shortfall (if evening & low):**
```
Proteína Baixa Hoje

Faltam 35g para atingir sua meta.

🥩 Sugestão rápida: Iogurte grego (25g)
```

---

**Feature 2A.2: Streak Tracking**

**Priority:** P1 (Gamification)
**Effort:** 1 day

**Implementation:**
- Track consecutive days hitting protein goal (≥1.6g/kg)
- Send celebration messages at milestones (7, 14, 30 days)
- Visual fire emoji with number: "🔥 12 dias"

---

#### Track B: Dashboard Core Visualizations

**Feature 2B.1: Weight Progress Chart**

**Priority:** P0 (Core Dashboard Feature)
**Effort:** 2 days

**Requirements:**
- Line chart showing last 90 days of weight
- 7-day moving average (smoothed trend line)
- Healthy zone shading (0.5-1kg/week loss rate)
- Goal line with prediction
- Recharts implementation

**Visual:**
```
Weight Loss Progress
─────────────────────
  90kg ┤
       │    ●─────●
  85kg ┤  ╱ ░░░░░░ (Healthy Zone)
       │╱  ░░░░░░
  80kg ●───────────● Goal: 75kg
       │
       └──────────────────────>
       Week 1   Week 5   Week 9
```

---

**Feature 2B.2: Muscle Score Gauge**

**Priority:** P0 (Hero Feature)
**Effort:** 1 day

**Requirements:**
- Circular or semi-circular gauge showing 0-100 score
- Color coded: Green (70+), Amber (50-69), Red (0-49)
- Breakdown of factors (protein, weight loss rate)
- Calls muscle score function from Phase 1

---

**Feature 2B.3: Side Effect Calendar**

**Priority:** P1 (Pattern Visualization)
**Effort:** 2 days

**Requirements:**
- Calendar heatmap (month view)
- Color dots for symptom days
- Click day → see logged symptoms
- Visual pattern detection (e.g., days 1-2 post-dose highlighted)

---

#### Track C: Pattern Detection Engine

**Feature 2C.1: Basic Pattern Algorithm**

**Priority:** P1 (Intelligence Layer)
**Effort:** 3 days

**User Story:**
> "As a user, I want to understand what triggers my side effects, so I can avoid them."

**Implementation (Supabase Function):**

```sql
CREATE OR REPLACE FUNCTION detect_symptom_patterns(user_id UUID)
RETURNS JSON AS $$
DECLARE
  pattern_found BOOLEAN := FALSE;
  most_common_day INTEGER;
  frequency DECIMAL;
BEGIN
  -- Find most common day post-dose for nausea
  SELECT 
    days_since_dose,
    COUNT(*) * 1.0 / (SELECT COUNT(*) FROM mood_entries WHERE user_id = $1 AND 'nausea' = ANY(symptoms)) as freq
  INTO most_common_day, frequency
  FROM (
    SELECT 
      DATE_PART('day', me.date - md.scheduled_date) as days_since_dose
    FROM mood_entries me
    JOIN medication_doses md ON md.user_id = me.user_id
    WHERE me.user_id = $1 
    AND 'nausea' = ANY(me.symptoms)
    AND me.date >= md.scheduled_date
    AND me.date <= md.scheduled_date + 7
  ) subq
  GROUP BY days_since_dose
  ORDER BY COUNT(*) DESC
  LIMIT 1;
  
  -- If pattern strong enough (>60% frequency)
  IF frequency > 0.6 THEN
    pattern_found := TRUE;
  END IF;
  
  RETURN json_build_object(
    'pattern_found', pattern_found,
    'pattern_type', 'dose_timing',
    'most_common_day', most_common_day,
    'frequency', frequency,
    'message', format('Você geralmente sente náusea %s dias após a dose (%s%% das vezes)', 
                      most_common_day, ROUND(frequency * 100))
  );
END;
$$ LANGUAGE plpgsql;
```

**Delivery:**
- WhatsApp: Proactive message when pattern detected (weekly check)
- Dashboard: Insights card showing detected patterns

---

### Phase 2 Success Criteria

**WhatsApp Track:**
- ✅ Protein alerts sending automatically (daily cron working)
- ✅ Users receiving streak celebrations
- ✅ Alert engagement >30% (user responds/acts)

**Dashboard Track:**
- ✅ Weight chart displaying correctly with trends
- ✅ Muscle score gauge working (calls backend function)
- ✅ Side effect calendar showing logged symptoms

**Intelligence Track:**
- ✅ Pattern detection function working
- ✅ At least 1 pattern type implemented (dose timing)
- ✅ Patterns delivered to users (WhatsApp + Dashboard)

---

### PHASE 3: Advanced Features & Polish (Weeks 5-6)
**Goal:** Photo/voice logging + Dashboard polish + Advanced insights

---

#### Track A: WhatsApp Advanced Logging

**Feature 3A.1: Photo Meal Logging**

**Priority:** P1 (Table Stakes by 2025)
**Effort:** 3 days

**User Story:**
> "As a user, I want to send a photo of my meal to WhatsApp and get instant nutrition analysis."

**Implementation:**
- User sends photo to WhatsApp bot
- N8N workflow receives image
- Call Clarifai or similar food recognition API
- Parse detected foods → get nutrition from Edamam
- Send confirmation message with macros
- Save to Supabase meals table

**Flow:**
```
User: [sends photo of plate]
Bot: "Analisando sua refeição... ⏳"
Bot: "✅ Refeição registrada!
      
      Detectei:
      • Frango grelhado (~150g)
      • Arroz (~100g)
      • Brócolis (~80g)
      
      🥩 42g proteína
      🔥 380 calorias
      
      Está correto? Responda SIM ou corrija."
```

---

**Feature 3A.2: Voice Note Support**

**Priority:** P1 (Cultural Fit)
**Effort:** 2 days

**User Story:**
> "As a Brazilian user, I want to log meals by voice note since that's how I naturally communicate."

**Implementation:**
- Receive voice note from WhatsApp
- Use Whisper API (OpenAI) for speech-to-text in Portuguese
- Parse transcribed text with existing meal logging logic
- Confirm with user

**Example:**
```
User: [voice note] "Almocei um filé de frango com arroz integral e salada"
Bot: "✅ Almoço registrado via áudio!
      
      • Filé de frango
      • Arroz integral
      • Salada
      
      🥩 ~38g proteína
      
      Correto?"
```

---

#### Track B: Dashboard Polish & Gamification

**Feature 3B.1: Weekly Summary Card**

**Priority:** P1 (Retention Driver)
**Effort:** 2 days

**Requirements:**
- Calculate weekly metrics (weight change, protein avg, logging consistency)
- Display as card on Overview tab
- Auto-generated insight message
- "Share to WhatsApp" button

**Visual:**
```
┌─────────────────────────────────┐
│ 📅 Semana de 14-20 Out          │
├─────────────────────────────────┤
│ ⚖️  Peso: -0.8kg ↓              │
│ 💪 Proteína: 5/7 dias ótima     │
│ 🍽️ Refeições: 6/7 dias         │
│ 😊 Sem sintomas: 6 dias         │
├─────────────────────────────────┤
│ "Boa semana! Continue assim."   │
└─────────────────────────────────┘
```

---

**Feature 3B.2: Achievement Badges**

**Priority:** P2 (Nice-to-have)
**Effort:** 2 days

**Achievements:**
- 🏆 First Week Warrior (7 days tracking)
- 💪 Muscle Defender (30 days 1.6g/kg protein)
- 📉 First 5kg lost
- 🎯 Goal reached

**Display:** Profile section with locked/unlocked badges

---

**Feature 3B.3: Protein Timeline View**

**Priority:** P2 (Data Visualization)
**Effort:** 1 day

**Requirements:**
- Bar chart showing daily protein for last 30 days
- Target line at user's goal (1.6g/kg)
- Color coded: Green (hit), Amber (close), Red (miss)
- Tap bar → see that day's meals

---

#### Track C: Advanced Intelligence

**Feature 3C.1: Symptom-Aware Meal Suggestions**

**Priority:** P1 (Differentiator)
**Effort:** 2 days

**User Story:**
> "As a user feeling nauseated, I want meal suggestions that are gentle on my stomach but still high in protein."

**Implementation:**
- When user logs nausea symptom, bot becomes aware
- Meal suggestions filter for: low-fat (<12g), small portions, bland
- Conversational delivery via WhatsApp

**Example:**
```
User: "estou com náusea"
Bot: "😔 Entendo. Recomendo refeições leves hoje:

      1. Iogurte grego (25g prot, fácil de comer)
      2. Omelete simples (18g prot, leve)
      3. Frango cozido com arroz branco (35g prot)
      
      Qual te parece melhor?"
```

---

**Feature 3C.2: Dosage Insight (Basic)**

**Priority:** P2 (Future Foundation)
**Effort:** 2 days

**Requirements:**
- Track weeks on current dose
- Flag if weight plateaued >3 weeks + side effects manageable
- Conversational suggestion (not prescriptive)

**Example:**
```
Bot (proactive): "📊 Observação

     Você está há 6 semanas em 0.5mg.
     
     Peso estável últimas 3 semanas.
     Efeitos colaterais leves.
     
     💡 Pode ser útil discutir com seu médico sobre a dose na próxima consulta.
     
     Quer que eu prepare um relatório dos seus dados?"
```

---

### Phase 3 Success Criteria

**WhatsApp Track:**
- ✅ Photo logging working (API integration complete)
- ✅ Voice notes transcribing and logging correctly
- ✅ Symptom-aware suggestions being delivered

**Dashboard Track:**
- ✅ Weekly summary displaying with insights
- ✅ Badges system working (unlock triggers)
- ✅ All core visualizations polished and mobile-responsive

**Intelligence Track:**
- ✅ Meal suggestions adapt based on symptoms
- ✅ Dosage insights flag plateau situations correctly

---

### PHASE 4: Integration, Beta & Launch (Weeks 7-12)
**Goal:** Two-way sync + PDF export + Beta testing + Public launch

---

#### Weeks 7-8: Two-Way Sync & Export

**Feature 4.1: WhatsApp ↔ Dashboard Sync**

**Priority:** P0 (Core Integration)
**Effort:** 3 days

**Requirements:**
- User can log in either WhatsApp or Dashboard → appears in both
- Real-time sync via Supabase subscriptions
- Handle conflicts (prefer most recent)
- Show sync status indicator

**Technical:**
- Both interfaces write to same Supabase tables
- Dashboard subscribes to real-time updates
- WhatsApp N8N polls for dashboard-initiated changes (or webhook)

---

**Feature 4.2: PDF Report for Doctor**

**Priority:** P1 (User Value)
**Effort:** 2 days

**Requirements:**
- Generate PDF with: weight chart, muscle score trend, symptom calendar, medication log
- User can request from Dashboard or WhatsApp ("gerar relatório para médico")
- Professional medical aesthetic
- Include disclaimers

**Content:**
```
─────────────────────────────────
Relatório Zempi - [Nome do Usuário]
Período: [Data Início] - [Data Fim]
─────────────────────────────────

📊 Progresso de Peso
[Chart image]

💪 Score de Preservação Muscular
Média: 78/100 (Zona Segura)

🍽️ Nutrição
Proteína média: 1.7g/kg
Meta atingida: 85% dos dias

😊 Efeitos Colaterais
[Calendar with patterns]

💊 Medicação
Dose atual: 1.0mg semanal
Aderência: 95%

─────────────────────────────────
Este relatório é gerado automaticamente
e não substitui avaliação médica.
─────────────────────────────────
```

---

#### Weeks 9-10: Beta Testing

**Objective:** Validate with real users, find bugs, gather feedback

**Beta Recruitment:**
- Target: 30-50 users
- Sources:
  - Friends/family in Brazil
  - GLP-1 Facebook groups (post offering beta access)
  - WhatsApp groups (share bot link)
  - Doctor referrals if possible

**Incentives:**
- Free lifetime premium access
- Early adopter badge
- Direct line to founder (WhatsApp group for beta testers)

**Testing Focus:**
- WhatsApp conversation quality (is bot helpful? annoying?)
- Dashboard usability (can users find what they need?)
- Data accuracy (are calculations correct?)
- Feature adoption (which features used most?)

**Key Metrics:**
- D7 retention (target: >40%)
- Meal logging frequency (target: 4+ meals/week)
- Dashboard access frequency (target: 2x/week)
- WhatsApp engagement (target: daily conversations)
- Muscle score viewed (target: 3x/week)

**Feedback Collection:**
- In-app survey after 7 days
- WhatsApp beta group discussions
- Analytics (where users drop off)
- Direct conversations

---

#### Weeks 11-12: Iteration & Launch Prep

**Week 11: Fixes & Polish**

**Process:**
1. Prioritize feedback:
   - P0: Critical bugs (blocking usage)
   - P1: High-impact UX issues (3+ users mention)
   - P2: Feature requests (nice-to-have)

2. Common issues to expect:
   - Bot misunderstanding Portuguese food terms → expand keyword database
   - Photo logging accuracy issues → adjust confidence thresholds
   - Muscle score confusing → add explainer tooltip
   - Dashboard too complex → simplify navigation

3. Sprint planning:
   - Days 1-3: Fix P0 bugs
   - Days 4-7: Address top 5 UX issues

---

**Week 12: Launch**

**Pre-Launch Checklist:**
- [ ] WhatsApp bot stable (no critical bugs in 3 days)
- [ ] Dashboard responsive on mobile/desktop
- [ ] All Phase 1-3 features working
- [ ] Analytics instrumentation complete (Mixpanel/Amplitude)
- [ ] Error monitoring active (Sentry)
- [ ] Backup strategy confirmed (Supabase auto-backups)
- [ ] Support email setup (suporte@zempi.com)
- [ ] Privacy policy published (LGPD compliant)
- [ ] Pricing/paywall configured (if applicable)

**Soft Launch Activities:**
- Beta testers become ambassadors (share with 2-3 friends each)
- Post in 3-5 Brazilian GLP-1 Facebook groups
- Share bot link in WhatsApp health groups
- Reach out to 5-10 endocrinologists for referrals

**Success Metrics (Week 1 Post-Launch):**
- 50+ new users (beyond beta)
- 30+ daily active conversations (WhatsApp)
- 15+ dashboard logins
- <5 critical bugs reported
- Positive sentiment in feedback

---

### Phase 4 Success Criteria

**Integration:**
- ✅ Users can log anywhere, data syncs everywhere
- ✅ PDF report generates correctly with all data
- ✅ Export feature used by >20% of users

**Beta Testing:**
- ✅ 30+ beta users recruited
- ✅ D7 retention >40%
- ✅ All P0 bugs identified and fixed
- ✅ User feedback incorporated

**Launch:**
- ✅ Soft launch completed
- ✅ First 50+ non-beta users acquired
- ✅ System stable under real load
- ✅ Support flow working (email responses <24h)

---

**User Flow:**

```
User taps "📷 Foto" button
  ↓
Camera opens
  ↓
User captures photo
  ↓
[Loading spinner: "Analisando..."]
  ↓
AI returns: "Frango grelhado (150g), Arroz (100g), Brócolis (80g)"
  ↓
App shows:
  ┌─────────────────────────────────┐
  │ [Photo thumbnail]               │
  │                                 │
  │ Frango grelhado • 150g          │
  │ Arroz • 100g                    │
  │ Brócolis • 80g                  │
  │                                 │
  │ Total:                          │
  │ 🥩 38g proteína                 │
  │ 🔥 420 calorias                 │
  │                                 │
  │ [✏️ Editar]  [✅ Confirmar]     │
  └─────────────────────────────────┘
  ↓
User taps "Confirmar"
  ↓
Meal saved
```

**Fallback for Errors:**
- AI can't identify food → "Não consegui identificar. Buscar manualmente?"
- Low confidence (<70%) → "Isso é [food]? Toque para corrigir"
- Always allow manual override

**Implementation:**

```typescript
async function analyzeFoodPhoto(imageBlob: Blob): Promise<MealAnalysis> {
  // Step 1: Clarifai recognition
  const foodItems = await clarifai.recognizeFood(imageBlob)
  // Returns: [{ name: "grilled chicken", confidence: 0.92, portion: "150g" }, ...]

  // Step 2: Edamam nutrition lookup
  const nutritionData = await Promise.all(
    foodItems.map(item => edamam.getNutrition(item.name, item.portion))
  )

  // Step 3: Aggregate macros
  const totalMacros = {
    protein: sum(nutritionData.map(n => n.protein)),
    calories: sum(nutritionData.map(n => n.calories)),
    carbs: sum(nutritionData.map(n => n.carbs)),
    fats: sum(nutritionData.map(n => n.fats))
  }

  return {
    items: foodItems,
    macros: totalMacros,
    confidence: average(foodItems.map(i => i.confidence))
  }
}
```

---

### PHASE 3: Engagement & Polish (Weeks 5-6)
**Goal:** Gamification + integrations to drive retention

#### Feature 3.1: Streaks & Achievements

**Priority:** P1 (Engagement Driver)
**Effort:** 3 days
**Owner:** Backend (tracking) + Frontend (UI)

**Streaks Tracked:**

1. **Protein Streak:** Consecutive days hitting ≥1.6g/kg
   - Display: 🔥 icon with number
   - Celebration: At 7, 14, 30 days
   - Reset: If miss target one day

2. **Logging Streak:** Consecutive days with ≥3 meals logged
   - Display: 📝 icon with number
   - Celebration: At 7, 14, 30 days

3. **Medication Adherence:** Consecutive doses on time
   - Display: 💉 icon with number
   - Celebration: At 4, 8, 12 weeks

**Achievements (Badges):**

| Badge | Trigger | Icon | Message |
|-------|---------|------|---------|
| First Week Warrior | 7 days tracking | 🏆 | "Você completou sua primeira semana!" |
| Muscle Defender | 30 days ≥1.6g/kg protein | 💪 | "30 dias protegendo seus músculos!" |
| First 5kg | Lost 5kg | 📉 | "Primeiros 5kg! ~35.000 calorias!" |
| 10% Lighter | Lost 10% body weight | ⭐ | "Você eliminou 10% do peso inicial!" |
| Goal Crusher | Reached target weight | 🎯 | "Meta alcançada! Hora de celebrar!" |
| Hot Streak | 14-day protein streak | 🔥 | "14 dias sem parar. Incrível!" |

**UI Placement:**
- **Streaks:** Header of home screen (always visible)
  ```
  🔥 12 dias  📝 8 dias  💉 6 semanas
  ```

- **Badges:** Profile page → Achievements section
  ```
  Suas Conquistas
  ┌─────┬─────┬─────┬─────┐
  │ 🏆  │ 💪  │ 📉  │ 🔒  │
  │Unlck│Unlck│Unlck│Lockd│
  └─────┴─────┴─────┴─────┘
  ```

**Celebration Animations:**
- Use Lottie for confetti, fireworks
- Full-screen overlay (dismissible)
- Shareable card (optional): "Eu perdi 5kg com Zempi!"

---

#### Feature 3.2: Weekly Summary Card

**Priority:** P1 (Retention Driver)
**Effort:** 2 days
**Owner:** Backend (summary generation) + Frontend (card UI)

**User Story:**
> "As a GLP-1 user, I want a weekly summary of my progress, so I feel accomplished and know what to improve."

**Summary Metrics (Monday-Sunday):**

```typescript
interface WeeklySummary {
  weekOf: string // "14-20 Out"

  weightChange: {
    kg: number // -0.8
    trend: 'up' | 'down' | 'stable'
  }

  protein: {
    daysHitGoal: number // 5 out of 7
    averageGperKg: number // 1.7
    streak: number // 5 days
  }

  mealConsistency: {
    daysLogged: number // 6 out of 7
  }

  wellness: {
    symptomFreeDays: number // 6 out of 7
  }

  medication: {
    adherence: boolean // True if dose taken on time
  }

  score: number // 0-100
  message: string // Auto-generated insight
}
```

**Score Calculation:**
```typescript
function calculateWeekScore(summary: WeeklySummary): number {
  let score = 0

  // Weight loss in healthy range (0.5-1kg/week): 25 points
  if (Math.abs(summary.weightChange.kg) >= 0.5 && Math.abs(summary.weightChange.kg) <= 1.0) {
    score += 25
  } else if (Math.abs(summary.weightChange.kg) > 0) {
    score += 15 // Some progress
  }

  // Protein performance: 30 points
  score += (summary.protein.daysHitGoal / 7) * 30

  // Meal logging consistency: 20 points
  score += (summary.mealConsistency.daysLogged / 7) * 20

  // Wellness (symptom-free days): 15 points
  score += (summary.wellness.symptomFreeDays / 7) * 15

  // Medication adherence: 10 points
  if (summary.medication.adherence) score += 10

  return Math.round(score)
}
```

**Auto-Generated Message:**
```typescript
function generateWeeklySummary(score: number): string {
  if (score >= 80) return "Semana excelente! Você está no caminho certo. 🌟"
  if (score >= 60) return "Boa semana! Pequenos ajustes podem melhorar ainda mais."
  if (score >= 40) return "Semana desafiadora. O que podemos ajustar?"
  return "Vamos recomeçar esta semana juntos. Você consegue! 💪"
}
```

**Card Design:**
```
┌─────────────────────────────────────┐
│ 📅 Semana de 14-20 Out              │
├─────────────────────────────────────┤
│ Pontuação: 78/100 ⭐⭐⭐⭐          │
│                                     │
│ ⚖️  Peso: -0.8kg ↓                  │
│ 💪 Proteína: 5/7 dias excelente     │
│ 🍽️  Refeições: 6/7 dias registrados │
│ 😊 Bem-estar: 6 dias sem sintomas   │
│ 💉 Medicação: ✅ Em dia             │
│                                     │
│ "Boa semana! Pequenos ajustes      │
│  podem melhorar ainda mais."        │
│                                     │
│ [Ver detalhes]                      │
└─────────────────────────────────────┘
```

**Display:**
- Appears Monday morning at 6 AM (push notification)
- Persistent card on home screen until dismissed
- Archive: View past summaries in History tab

---

#### Feature 3.3: Apple Health / Google Fit Integration

**Priority:** P1 (Expected Feature)
**Effort:** 2 days
**Owner:** Frontend (native integrations)

**Data to Sync:**

**Read from HealthKit/Google Fit:**
- Weight (daily auto-import)
- Steps (daily activity tracking)
- Sleep hours (wellness correlation)
- Active calories (exercise validation)

**Write to HealthKit/Google Fit:**
- Protein grams (nutrition)
- Water intake (hydration)
- Meals logged (dietary data)

**User Flow:**
```
Onboarding Step 5:
  "Sincronizar com Apple Health?"
  [Sim] [Agora não]

If [Sim]:
  → Native permission dialog
  → "Zempi gostaria de acessar:
      • Peso
      • Atividade física
      • Sono"
  [Allow] [Don't Allow]

If [Allow]:
  → Background sync enabled
  → "✅ Sincronizado! Peso será importado automaticamente"
```

**Implementation:**
- iOS: HealthKit framework
- Android: Google Fit API
- Background sync: Daily at midnight + on-demand
- Conflict resolution: User manual entry > auto-import (show both, let user choose)

**UI Indicator:**
```
Weight Entry Screen:
  ┌─────────────────────────────────┐
  │ Peso                            │
  │                                 │
  │ Apple Health: 82.5kg (hoje)     │
  │ [Usar este valor]               │
  │                                 │
  │ Ou inserir manualmente:         │
  │ [____] kg                       │
  └─────────────────────────────────┘
```

---

### PHASE 4: Beta → Launch (Weeks 7-12)
**Goal:** Test, iterate, go-to-market

#### Week 7-8: Beta Testing

**Objectives:**
1. Find critical bugs
2. Validate core value props (muscle score, insights)
3. Measure engagement metrics
4. Gather qualitative feedback

**Beta Recruitment:**
- **Target:** 50 users
- **Sources:**
  - r/Semaglutide (Reddit) - post offer
  - GLP-1 Facebook groups (Brazil)
  - Friends/family network
  - Doctor referrals (if possible)

**Incentives:**
- Free premium access (lifetime)
- Early adopter badge
- Direct line to founders (WhatsApp group)

**Instrumentation (Analytics):**
- **Tool:** Mixpanel or Amplitude
- **Key Events:**
  - User signup, onboarding completion
  - Meal logged (manual vs photo)
  - Weight logged
  - Muscle score viewed
  - Alert clicked
  - Insight card viewed
  - Streak achieved
  - Premium feature accessed

**Success Criteria:**
- D7 retention: ≥40%
- Meal logging: ≥4 meals/week per user
- Muscle score viewed: ≥3x/week per user
- App Store rating: ≥3.5 stars (from beta testers)
- Critical bugs: <5 (none blocking core flows)

---

#### Week 9-10: Iterate Based on Feedback

**Process:**
1. **Collect Feedback:**
   - In-app survey (after 7 days of use)
   - WhatsApp group discussions
   - App Store reviews
   - Analytics (where users drop off)

2. **Prioritize Fixes:**
   - P0: Critical bugs (blocking usage)
   - P1: High-impact UX issues (3+ users complain)
   - P2: Feature requests (nice-to-have)

3. **Common Issues to Expect:**
   - Photo logging accuracy too low → adjust thresholds, allow easier manual override
   - Muscle score confusing → add explainer tooltip
   - Notifications too frequent → add settings to customize
   - Missing Brazilian meals → add custom meal database

**Sprint Planning:**
- Days 1-3: Fix P0 bugs
- Days 4-7: Address top 5 UX issues
- Days 8-10: Add most-requested feature (likely: meal templates/favorites)

---

#### Week 11: Monetization & Premium Paywall

**Freemium Model:**

**Free Tier:**
- Weight tracking (unlimited)
- Manual meal logging (unlimited)
- Basic protein tracking (7-day history)
- Medication reminders
- Side effect logging (basic)
- 1 alert type (protein warnings)

**Premium Tier (R$29.90/month or R$249/year):**
- ✅ **Muscle Preservation Score** (P0 feature behind paywall)
- ✅ AI photo meal logging (unlimited)
- ✅ Side effect correlation & insights
- ✅ AI meal suggestions (personalized)
- ✅ Unlimited history (all-time data)
- ✅ Weekly summaries
- ✅ PDF reports for doctor
- ✅ All alert types
- ✅ Ad-free experience

**Paywall Placement:**
- **Soft Gate:** Show Muscle Score card, but blur details → "Upgrade to see your score"
- **After Value Proof:** After 3-7 days of free usage (user is engaged)
- **Trial:** 7-day free trial of premium (requires payment method)

**Pricing Justification:**
- R$29.90/month = <3% of medication cost (R$800-1,200/month)
- "Proteja seus músculos por menos de R$1/dia"
- Annual discount: R$249 (save R$109, ~30% off)

**Payment Integration:**
- iOS: StoreKit (Apple In-App Purchase)
- Android: Google Play Billing
- Revenue share: Apple/Google take 30% (first year), 15% (after year 1)

---

#### Week 12: Public Launch

**Pre-Launch Checklist:**
- [ ] App Store / Play Store assets ready
  - Screenshots (6-8, showing hero features)
  - App icon (professional, memorable)
  - Description (SEO-optimized keywords)
  - Privacy policy URL
  - Support email
- [ ] Backend infrastructure scaled
  - Database: Supabase (auto-scales)
  - APIs: Rate limiting, error monitoring (Sentry)
  - CDN: Images, assets cached
- [ ] Analytics & monitoring live
  - Mixpanel dashboards
  - Error tracking (Sentry)
  - Performance monitoring (Vercel/Netlify)
- [ ] Customer support setup
  - Email: suporte@zempi.com
  - In-app chat (Intercom or simple form)
  - FAQ page

**App Store Optimization (ASO):**

**Title (30 chars max):**
- "Zempi - GLP-1 & Ozempic"

**Subtitle (30 chars max):**
- "Perca peso, preserve músculo"

**Keywords (100 chars, comma-separated):**
- ozempic,wegovy,mounjaro,glp1,proteína,peso,músculo,dieta,saúde,fitness

**Description (First 170 chars crucial - above fold):**
```
Zempi é o único app que protege seus músculos durante o uso de GLP-1 (Ozempic, Wegovy, Mounjaro).

Monitore proteína, previna perda muscular, otimize resultados.

✅ Score de Preservação Muscular (único no mercado)
✅ Análise de efeitos colaterais e padrões
✅ Sugestões de refeições personalizadas
✅ Registro por foto (IA)
✅ Relatórios para médico

[...rest of description...]
```

**Screenshots (Order by Priority):**
1. Muscle Preservation Score (hero feature)
2. Weight chart with healthy zone
3. Side effect insights
4. AI meal suggestions
5. Weekly summary
6. Photo meal logging

**Launch Day Activities:**

**Press & Outreach:**
- Email to health/tech journalists (Brazil)
- Post on Product Hunt (if relevant)
- Submit to app review sites (AppAdvice, etc.)

**Social Media:**
- Instagram post (visuals of app)
- LinkedIn post (founder story)
- Twitter thread (problem → solution)

**Community Seeding:**
- Post in r/Semaglutide, r/Ozempic (Reddit)
- Post in GLP-1 Facebook groups (Brazil)
- DM influencers (health, fitness micro-influencers with 10K-50K followers)

**Paid Acquisition (Optional, Budget: R$1,000-5,000):**
- Instagram/Facebook ads (target: women 35-50, interest: weight loss, Ozempic)
- Google App Campaigns (keywords: "Ozempic app", "GLP-1 tracker")

**Success Metrics (Week 1):**
- 100+ downloads
- 30+ daily active users
- 10+ premium conversions (trial starts)
- 3.5+ App Store rating

---

## PART 4: Technical Architecture

### Current Architecture (MVP - N8N Based)

**WhatsApp Bot:**
- **Automation Platform:** N8N (no-code workflow builder)
- **WhatsApp API:** WhatsApp Business API (official)
- **NLP:** OpenAI/Anthropic LLM for message understanding
- **Memory:** Conversation context stored in Supabase
- **Webhooks:** N8N receives WhatsApp messages → processes → responds

**Benefits of N8N for MVP:**
- ✅ Rapid iteration (no code deploys for workflow changes)
- ✅ Visual workflow debugging
- ✅ Built-in API integrations (Supabase, OpenAI, WhatsApp)
- ✅ Good enough for 100-500 users

**Limitations:**
- ⚠️ Limited control over error handling
- ⚠️ Performance bottlenecks at scale (>1000 concurrent users)
- ⚠️ Workflow complexity increases maintenance burden
- ⚠️ Cost increases with message volume

---

### Future Architecture (Post-Validation - Node.js)

**When to Migrate:**
- Trigger: 200+ daily active users OR complex workflows becoming unmanageable
- Timeline: After Phase 4 (post-beta validation)

**Target Stack:**
- **Runtime:** Node.js (Express or Fastify)
- **WhatsApp:** Official WhatsApp Business API (same, just custom webhook handling)
- **NLP:** OpenAI/Anthropic API (same)
- **Database:** PostgreSQL (Supabase - no change)
- **Queue System:** BullMQ (for async job processing - alerts, pattern detection)
- **Cron Jobs:** Node-cron or GitHub Actions for scheduled tasks

**Migration Path:**
1. Build Node.js webhook handler alongside N8N
2. Route 10% of traffic to Node.js (A/B test)
3. Monitor performance & error rates
4. Gradually increase to 100%
5. Deprecate N8N workflows

---

### Dashboard Stack (Current & Future)

**Frontend:**
- **Framework:** React 18 + TypeScript
- **Routing:** Wouter (lightweight)
- **State Management:**
  - Server state: TanStack Query (React Query)
  - UI state: Zustand (minimal global state)
- **Styling:** TailwindCSS + shadcn/ui components
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Mobile:** Responsive web (progressive web app capabilities via Capacitor if needed)

**Backend/Database:**
- **Database:** PostgreSQL via Supabase
- **ORM:** Drizzle (type-safe queries)
- **Auth:** Supabase Auth (linked to WhatsApp users)
- **Storage:** Supabase Storage (meal photos, avatars, PDF reports)
- **Real-time:** Supabase subscriptions (live data sync)

**APIs & Integrations:**
- **Nutrition Data:** Edamam API or Nutritionix API
- **Photo Recognition:** Clarifai Food API
- **Speech-to-Text:** OpenAI Whisper API (for voice notes)
- **AI/LLM:** OpenAI GPT-4 or Anthropic Claude (meal suggestions, conversational AI)

---

### Infrastructure

**Hosting:**
- **Dashboard:** Vercel (automatic deployments from GitHub)
- **Database:** Supabase (managed PostgreSQL)
- **WhatsApp Bot:** N8N Cloud (MVP) → Node.js on Railway/Fly.io (future)

**Monitoring & Analytics:**
- **Error Tracking:** Sentry
- **Analytics:** Mixpanel or Amplitude (user behavior, retention)
- **Logging:** Supabase logs + custom logging for N8N workflows

**CI/CD:**
- **Dashboard:** GitHub Actions → Vercel deploy
- **Database Migrations:** Drizzle migrations via GitHub Actions
- **WhatsApp Bot:** Manual deployment (N8N workflows) → GitHub Actions (Node.js future)

---

### Data Flow

**WhatsApp → Database → Dashboard:**

```
User sends message: "almocei frango 200g"
  ↓
WhatsApp Business API → N8N Webhook
  ↓
N8N Workflow:
  1. Call OpenAI to parse message
  2. Extract: meal="frango", portion="200g"
  3. Call Edamam for nutrition data
  4. Insert into Supabase `meals` table
  5. Calculate daily protein total
  6. Send confirmation to WhatsApp
  ↓
Supabase (real-time subscription)
  ↓
Dashboard updates in real-time (TanStack Query refetch)
```

**Dashboard → Database:**

```
User logs meal in dashboard
  ↓
React form submission
  ↓
TanStack Query mutation → Supabase API
  ↓
Insert into `meals` table
  ↓
(WhatsApp bot is aware on next query - no proactive notification to WhatsApp)
```

---

### Intelligence Layer (Shared by Both Interfaces)

**Supabase Functions (PostgreSQL):**
- `calculate_muscle_score(user_id)` → returns JSON with score, status, factors
- `detect_symptom_patterns(user_id)` → returns JSON with patterns found
- `generate_weekly_summary(user_id)` → returns JSON with metrics & insights

**Accessed By:**
- **WhatsApp Bot (N8N):** HTTP call to Supabase function → format response conversationally
- **Dashboard:** API call via TanStack Query → render as charts/gauges

**Why Supabase Functions:**
- ✅ Logic in one place (no duplication)
- ✅ Type-safe with Drizzle schema
- ✅ Can be unit tested
- ✅ Performance (runs in database, no round trips)

---

### Data Models (Key Tables)

```sql
-- Core tracking
users (id, username, email, createdAt)
user_profiles (userId, name, medication, dose, startWeight, currentWeight, goalWeight, ...)
meals (id, userId, date, time, protein, calories, carbs, fats, photoUrl, ...)
weight_entries (id, userId, date, weight, source: 'manual' | 'healthkit')
mood_entries (id, userId, date, mood, symptoms[], notes)
medication_doses (id, userId, scheduledDate, completed, completedAt)

-- Intelligence layer
alerts (id, userId, type, title, message, dismissed, createdAt)
insights (id, userId, category, content, metadata, createdAt)
achievements (id, userId, badgeId, unlockedAt)
streaks (id, userId, type, currentStreak, longestStreak, lastUpdated)

-- Meal database
meal_templates (id, name, protein, calories, carbs, fats, tags[], portionSize, blandnessScore, ...)

-- Premium
subscriptions (id, userId, tier, status, startDate, endDate, platform: 'ios' | 'android')
```

---

## PART 5: Go-to-Market Strategy (Brief Overview)

**Note:** Detailed GTM strategy omitted per request. Focus remains on product execution.

### Core Positioning

**Tagline:** "Seu coach de GLP-1 no WhatsApp - Perca peso, preserve músculo."

**Unique Value:**
1. WhatsApp-native (zero friction, cultural fit for Brazil)
2. Muscle preservation intelligence (quantified risk score)
3. Conversational AI coach with memory

### Primary Acquisition Channels (Summary)

1. **WhatsApp Groups** - Organic seeding in existing GLP-1 communities
2. **Doctor Referrals** - Endocrinologists, bariatric specialists
3. **Organic Content** - SEO-optimized articles, YouTube education
4. **Beta Testers as Ambassadors** - Viral coefficient targeting 30%+

---

## PART 6: Risks & Mitigation

### Risk 1: N8N Scalability Issues
**Likelihood:** Medium (as user base grows)
**Impact:** High (service degradation/downtime)
**Mitigation:**
- Monitor performance metrics closely (response time, error rate)
- Trigger migration to Node.js at 200+ DAU or performance degradation
- Build Node.js version in parallel during Phase 3-4 (not blocking launch)
- Keep N8N as fallback during migration

---

### Risk 2: WhatsApp API Compliance/Suspension
**Likelihood:** Low-Medium
**Impact:** Critical (entire product breaks)
**Mitigation:**
- Follow WhatsApp Business API guidelines strictly
- Avoid spam (rate limits, user-initiated conversations only)
- Clear opt-in flow during onboarding
- Have email/SMS backup communication channel
- Monitor Meta policy changes closely

---

### Risk 3: Portuguese NLP Accuracy Issues
**Likelihood:** Medium (regional variations, slang, food terms)
**Impact:** Medium (user frustration, incorrect logging)
**Mitigation:**
- Use best-in-class LLM (GPT-4 or Claude with Portuguese training)
- Maintain keyword database for common Brazilian foods
- Always confirm with user before saving ("Está correto?")
- Learn from corrections (track misunderstandings, improve prompts)
- Fallback to structured questions if NLP fails

---

### Risk 4: Low User Adoption
**Likelihood:** Low-Medium (WhatsApp reduces friction significantly)
**Impact:** High
**Mitigation:**
- WhatsApp-first removes biggest barrier (no app download)
- Generous free tier to prove value
- Beta testing with 30-50 users before launch
- Viral sharing incentive (share bot link in groups)

---

### Risk 5: Competitor Copies WhatsApp Integration
**Likelihood:** Low (12+ month moat)
**Impact:** Medium
**Mitigation:**
- Move fast, build brand loyalty
- Patent algorithm if novel (consult IP lawyer)
- Stay nimble, always innovate ahead

### Risk 5: Regulatory Issues (Medical App)
**Likelihood:** Low
**Impact:** High
**Mitigation:**
- Clear disclaimers: "Not medical advice, consult doctor"
- Never prescribe or diagnose
- Comply with ANVISA regulations (Brazil health authority)
- Privacy: LGPD compliance (Brazil's GDPR)

### Risk 6: Technical Failures (Downtime, Data Loss)
**Likelihood:** Low
**Impact:** High
**Mitigation:**
- Supabase SLA (99.9% uptime)
- Daily database backups
- Error monitoring (Sentry alerts)
- Graceful degradation (offline mode for logging)

---

## PART 7: Brazil Market Adjustments & WhatsApp Integration

### Key Differences: Brazil vs US Market

#### 1. Competitive Landscape
**US:** Saturated (15+ apps, Noom spending millions on marketing)
**Brazil:** Emerging (fewer localized apps, mostly US imports)
**Advantage:** Less competitive, easier to gain market share

#### 2. WhatsApp Dominance
**US:** SMS, iMessage, diverse messaging
**Brazil:** WhatsApp is THE communication platform (99% penetration)
**Advantage:** WhatsApp-native experience = massive differentiator

#### 3. Payment Infrastructure
**US:** Credit cards standard, recurring subscriptions normalized
**Brazil:** Pix (instant payment), Boleto bancário, credit card installments
**Adjustment:** Support Pix for subscriptions, offer installment pricing

#### 4. Language & Culture
**US:** English, individualistic culture
**Brazil:** Portuguese, community-oriented culture
**Adjustment:** Brazilian Portuguese (not European), warm/friendly tone, emphasize community support

#### 5. Healthcare System
**US:** Insurance-based, telehealth platforms integrated
**Brazil:** SUS (public) + private insurance, telehealth emerging
**Adjustment:** Position as supplement to doctor care, not replacement

#### 6. Price Sensitivity
**US:** $9.99/mo acceptable for health apps
**Brazil:** R$29.90/mo ($6 USD) - must justify value clearly
**Adjustment:** Emphasize cost savings vs coaching, offer annual discount

---

### WhatsApp AI Companion: Game-Changing Integration

**Why This Changes Everything:**

1. **Frictionless Logging**
   - User doesn't open app, just sends WhatsApp message
   - "Almocei frango 200g e arroz" → AI logs meal
   - "Pesei 82.5kg" → AI logs weight
   - "Nausea hoje" → AI logs symptom

2. **Faster Insights Delivery**
   - Insights sent as WhatsApp messages (where users already are)
   - "⚠️ Proteína baixa 3 dias seguidos. Risco muscular!"
   - Higher engagement (WhatsApp open rate ~90% vs app push ~15%)

3. **Conversational Support**
   - "Por que sinto náusea 2 dias após dose?"
   - AI responds with personalized insight based on user's data
   - Feels like having a coach in your pocket

4. **Cultural Fit (Brazil)**
   - Brazilians live in WhatsApp (avg 3+ hours/day)
   - Messaging > apps for daily tasks
   - Voice notes common (future: log by voice)

---

### WhatsApp Integration Architecture

**Tech Stack:**
- **WhatsApp Business API** (official, not unofficial bots)
- **Webhook:** Receive messages from WhatsApp → your backend
- **NLP:** OpenAI/Anthropic for message parsing
- **Database:** Log entries to same PostgreSQL database

**Message Flow:**

```
User sends WhatsApp message: "Almocei 200g de frango com arroz"
  ↓
WhatsApp → Your Webhook (POST request)
  ↓
Backend receives message
  ↓
AI parses message:
  {
    intent: "log_meal",
    meal: {
      items: ["frango 200g", "arroz"],
      time: "lunch",
      estimatedProtein: 40
    }
  }
  ↓
Backend calls Edamam API for exact macros
  ↓
Backend saves to meals table (same as app)
  ↓
Backend sends WhatsApp confirmation:
  "✅ Almoço registrado:
   🥩 42g proteína
   🔥 380 calorias

   Faltam 28g de proteína hoje!"
  ↓
User sees confirmation in WhatsApp
```

**Example Conversations:**

**Meal Logging:**
```
User: "Jantei salmão e brócolis"
Bot: "✅ Jantar registrado!
      🥩 35g proteína • 🔥 320 cal

      💪 Você atingiu sua meta de proteína hoje! (1.8g/kg)"
```

**Weight Logging:**
```
User: "82.3"
Bot: "✅ Peso registrado: 82.3kg

      📉 -0.5kg desde semana passada
      Você está na zona saudável (0.5-1kg/sem)!"
```

**Symptom Logging:**
```
User: "Náusea forte"
Bot: "😔 Registrei náusea forte.

      💡 Padrão detectado: Você costuma sentir náusea 2 dias após dose.

      Dica: Evite refeições gordurosas hoje."
```

**Questions (Conversational AI):**
```
User: "Quanto de proteína devo comer?"
Bot: "Com base no seu peso (82.3kg), você precisa de:
      • Mínimo: 115g/dia (1.4g/kg)
      • Ideal: 132g/dia (1.6g/kg)

      Hoje você comeu 107g. Faltam 25g!

      [Ver sugestões de snacks]"
```

**Proactive Insights (Bot Initiates):**
```
Bot (8 PM): "⚠️ Alerta de Proteína

             Você está há 3 dias abaixo de 1.4g/kg.

             Seu score de preservação muscular caiu para ATENÇÃO (🟡).

             Recomendo aumentar proteína amanhã!"
```

---

### WhatsApp-First Feature Roadmap

**Phase 1: Basic Logging (Weeks 1-2)**
- Text-based meal logging
- Weight logging (just send number)
- Symptom logging (keywords: náusea, fadiga, etc.)
- Confirmations with summary

**Phase 2: Intelligence (Weeks 3-4)**
- Proactive alerts (protein warnings, streaks)
- Insights delivery (side effect patterns)
- Question answering (RAG-based)

**Phase 3: Advanced (Weeks 5-8)**
- Photo logging via WhatsApp (send photo → AI analyzes)
- Voice note logging (speech-to-text → NLP)
- Conversational meal suggestions
  - User: "O que comer com náusea?"
  - Bot: "Com náusea, recomendo:
         1. Iogurte grego (25g proteína, leve)
         2. Omelete simples (18g proteína, fácil)
         ..."

**Phase 4: Two-Way Sync (Week 9+)**
- App ↔ WhatsApp bidirectional sync
- User can log in either, sees in both
- App for dashboards/charts (visual)
- WhatsApp for quick logging/insights (conversational)

---

### Positioning with WhatsApp Integration

**Updated Tagline:**
"Seu coach de GLP-1 no WhatsApp"

**Marketing Message:**
- "Não precisa abrir app. Só enviar mensagem."
- "Registre refeições, peso e sintomas direto no WhatsApp"
- "Receba insights personalizados onde você já está"

**Competitive Advantage:**
- Zero apps in US/Brazil do WhatsApp-native logging
- Massive barrier to entry (requires WhatsApp Business API approval, AI integration, UX rethinking)
- Perfect for Brazilian market (WhatsApp = daily life)

---

## PART 8: Success Metrics & KPIs

### North Star Metric
**Users hitting protein goal 4+ days/week**

*Why:* This indicates users are achieving core job-to-be-done (preserve muscle), which drives retention and word-of-mouth.

### Key Performance Indicators (KPIs)

#### Acquisition
- **WhatsApp bot users** (target: 100 users by Week 4, 500 by Week 12)
- **Dashboard signups** (target: 50% of WhatsApp users create dashboard account)
- **Viral coefficient** (target: 30% - users share bot with friends)
- **CAC** (Customer Acquisition Cost): <R$25 per user (WhatsApp reduces CAC vs. app)

#### Activation (WhatsApp-Specific)
- **Onboarding completion via WhatsApp** (target: >90% - very low friction)
- **First meal logged within 24h** (target: >70%)
- **First conversational question asked** (target: >50% - tests AI engagement)
- **Return next day** (target: >60% - WhatsApp makes this easier)

#### Engagement (Dual Interface)

**WhatsApp Engagement:**
- **Daily active conversations** (target: >60% of users message bot daily)
- **Messages per user/day** (target: 3-5 messages - logging + questions)
- **Voice note usage** (target: >20% use voice at least once)
- **Photo logging usage** (target: >15% send meal photos)

**Dashboard Engagement:**
- **Dashboard visits/week** (target: 2-3x - for visualizations)
- **Muscle score views/week** (target: 2+)
- **Chart interactions/week** (target: 1+ - weight or protein chart)

**Cross-Platform:**
- **Meal logging frequency** (target: 4+ meals/week, any interface)
- **Weight logging frequency** (target: 2+ times/week)

#### Retention
- **D7 retention** (target: >50% - WhatsApp should improve this)
- **D30 retention** (target: >40%)
- **D90 retention** (target: >25%)
- **Weekly active rate** (target: >65% - higher with WhatsApp)

#### Revenue
- **Free → Paid conversion** (target: 15-20% within 30 days)
- **MRR** (Monthly Recurring Revenue): Target R$2,500 by Month 3 (85 paid users)
- **ARPU** (Average Revenue Per User): R$29.90 × 18% = R$5.38

#### Product Quality
- **WhatsApp bot response time** (target: <3 seconds for simple queries)
- **NLP accuracy** (target: >85% correct meal parsing)
- **Dashboard performance** (target: <2s load time)
- **Error rate** (target: <2% of WhatsApp messages fail)
- **User satisfaction** (target: NPS >35)

#### Intelligence Layer
- **Muscle score calculated** (target: >90% of active users have valid score)
- **Patterns detected** (target: >30% of users with 2+ weeks data have pattern found)
- **Alerts sent & engaged with** (target: >40% of alerts result in user action)

---

## PART 9: Team & Roles

### Minimum Team for 90-Day Build

**Role 1: Full-Stack Developer (You/Primary)**
- **WhatsApp Bot:** N8N workflow building & iteration
- **Dashboard:** React, TypeScript, TailwindCSS, shadcn/ui
- **Database:** Supabase (PostgreSQL), Drizzle ORM, SQL functions
- **APIs:** Integrations (OpenAI, Edamam, Clarifai, Whisper)
- **Future:** Node.js backend for WhatsApp (post-validation)

**Effort Distribution (90 days):**
- Weeks 1-2: 50% WhatsApp, 50% Dashboard rebuild
- Weeks 3-4: 40% WhatsApp, 40% Dashboard, 20% Intelligence layer
- Weeks 5-6: 30% WhatsApp, 40% Dashboard, 30% Intelligence
- Weeks 7-12: 20% Each track, 40% Beta/iteration

**Role 2: Designer (Part-Time / Contractor) - Optional**
- Dashboard UI/UX improvements
- Visualization design (charts, gauges)
- Brand consistency
- 10-20 hours total (Phase 2-3 only if budget allows)

**Role 3: Growth/Community (You, 10-20% time)**
- Beta recruitment (WhatsApp groups, Facebook groups)
- Community management (respond to user questions)
- Analytics monitoring (Mixpanel dashboards)
- Doctor outreach (after beta validation)

**Note:** Solo founder feasible for MVP. N8N dramatically reduces backend development time, allowing focus on dashboard and intelligence algorithms.

---

## PART 10: Next Steps - Immediate Actions

### Current State Summary

**✅ Live & Working:**
- WhatsApp bot (N8N) with onboarding, meal logging, nutrition analysis, conversational Q&A
- Supabase database logging all user data
- LLM with memory for context-aware conversations

**⏳ Needs Immediate Attention:**
- Add weight & symptom logging to WhatsApp bot
- Build muscle preservation score algorithm
- Rebuild dashboard for visualizations
- Implement proactive alerts

---

### Week 1 Priorities (Phase 1 Start)

**Day 1-2: WhatsApp Enhancements**
- [ ] N8N workflow for weight logging
  - Parse messages like "82.5", "pesei 82.5kg"
  - Save to `weight_entries` table
  - Respond with trend ("0.5kg desde semana passada")

- [ ] N8N workflow for symptom logging
  - Detect keywords: náusea, enjoo, fadiga, constipação
  - Save to `mood_entries` table with symptoms array
  - Respond with empathy + tip

**Day 3-4: Muscle Score Algorithm**
- [ ] Create Supabase function `calculate_muscle_score(user_id)`
  - SQL function returning JSON with score, status, factors
  - Test with existing user data
  - Document thresholds and formula

**Day 5: Dashboard Foundation**
- [ ] Set up dashboard shell
  - Tab navigation: Overview, Muscle, Progress, Treatment
  - Supabase auth integration
  - Responsive layout (mobile-first)

---

### Week 2 Priorities (Complete Phase 1)

**Day 1-2: Data Sync Layer**
- [ ] TanStack Query setup
  - `useUserProfile()`, `useMealHistory()`, `useWeightHistory()`
  - Real-time subscriptions to Supabase
  - Error handling & retry logic

**Day 3-4: First Visualization**
- [ ] Weight Progress Chart (Recharts)
  - Line chart with 90-day data
  - 7-day moving average
  - Healthy zone shading (0.5-1kg/week)
  - Goal line

**Day 5: Muscle Score Display**
- [ ] Dashboard gauge component
  - Calls muscle score function
  - Visual gauge (circular or semi-circular)
  - Breakdown of factors
  - Color coded (green/amber/red)

---

### Week 3-4 Priorities (Phase 2)

**WhatsApp:**
- [ ] Proactive protein alerts (cron job)
  - Low protein streak (3 days)
  - Excellent streak (7 days)
  - Daily shortfall reminder

**Dashboard:**
- [ ] Side effect calendar (heatmap)
- [ ] Protein timeline (bar chart)
- [ ] Weekly summary card

**Intelligence:**
- [ ] Pattern detection function (Supabase)
  - Dose timing correlation for nausea
  - Deliver insights to WhatsApp + Dashboard

---

### Week 5-6 Priorities (Phase 3)

**WhatsApp:**
- [ ] Photo meal logging (Clarifai API integration)
- [ ] Voice note support (Whisper API)

**Dashboard:**
- [ ] Gamification (badges, streaks display)
- [ ] Weekly summary polish
- [ ] Mobile responsive polish

**Intelligence:**
- [ ] Symptom-aware meal suggestions
- [ ] Basic dosage insights

---

### Week 7-12: Beta & Launch (Phase 4)

**Week 7-8:**
- [ ] Two-way sync (WhatsApp ↔ Dashboard)
- [ ] PDF report generator for doctor visits
- [ ] Analytics instrumentation (Mixpanel)

**Week 9-10: Beta Testing**
- [ ] Recruit 30-50 beta users (WhatsApp groups, friends/family)
- [ ] Beta WhatsApp group for feedback
- [ ] Monitor metrics (D7 retention, engagement)

**Week 11:**
- [ ] Fix P0 bugs from beta
- [ ] Address top UX issues
- [ ] Prepare for soft launch

**Week 12:**
- [ ] Soft launch (share bot link in GLP-1 communities)
- [ ] Monitor stability and user feedback
- [ ] Celebrate first 50+ users! 🎉

---

## Conclusion

This 90-day roadmap outlines the execution plan for **Zempi** - Brazil's first WhatsApp-native GLP-1 coach with muscle preservation intelligence.

### The Paradigm Shift

**Traditional GLP-1 Apps (US Market):**
- Download app → Open daily → Navigate UI → Log data
- 15% push notification open rate
- High friction, lower retention
- Competing with 15+ established players

**Zempi (WhatsApp-First for Brazil):**
- Just message → Instant response → Done
- 90% WhatsApp message read rate
- Zero friction, higher engagement
- **ZERO global competitors** with this approach

---

### The Four Pillars of Competitive Advantage

1. **WhatsApp-Native Experience** (12+ month moat)
   - First mover globally
   - Perfect cultural fit for Brazil (99% penetration, 3+ hours/day usage)
   - Massive barrier to entry (API approval, AI integration, UX paradigm)
   - Viral potential (share bot link, no download barrier)

2. **Muscle Preservation Intelligence** (6-9 month moat)
   - No competitor quantifies muscle loss risk
   - Addresses #1 user fear
   - Research-backed algorithm (1.6g/kg protein target)
   - Can be accessed conversationally or visually

3. **Proactive Coaching & Gamification** (6-9 month moat)
   - Smart alerts delivered via WhatsApp (90% read rate)
   - Habit formation through streaks, badges, celebrations
   - Behavioral psychology for retention (40-60% improvement)
   - Builds behaviors that persist after medication ends

4. **User Autonomy & Data Ownership** (12+ month moat)
   - Dosage decision support (data for doctor conversations)
   - PDF reports for medical visits
   - Transparent data export (CSV, JSON)
   - Philosophical differentiation: Empower vs prescribe

---

### Critical Success Factors

- ✅ **WhatsApp MVP already live** - De-risks technical execution
- ✅ **Parallel development** - Enhance bot + build dashboard simultaneously
- ✅ **Simple tech stack** - N8N for speed, Node.js migration path for scale
- ✅ **Focus on retention** - D7 >50% target (WhatsApp should improve this vs. traditional apps)
- ✅ **Validate fast** - 30-50 beta users by Week 9, iterate rapidly
- ✅ **Brazil-first** - US players are benchmarks, not competitors (different market)

---

### Execution Timeline

**Weeks 1-2:** Complete WhatsApp logging (weight/symptoms) + Dashboard foundation + Muscle score algorithm

**Weeks 3-4:** Proactive alerts via WhatsApp + Core visualizations + Pattern detection

**Weeks 5-6:** Photo/voice logging + Dashboard polish + Symptom-aware suggestions

**Weeks 7-12:** Two-way sync + PDF export + Beta testing (30-50 users) + Soft launch

---

### Success Looks Like (90 Days)

- ✅ 500+ users conversing with WhatsApp bot daily
- ✅ 50% D7 retention (WhatsApp-enabled)
- ✅ 60% hitting protein goals 4+ days/week
- ✅ 70% achieve 7-day protein streak at least once (gamification working)
- ✅ 50% unlock 3+ achievement badges (habit formation)
- ✅ 30% generate PDF reports for doctors (autonomy/empowerment)
- ✅ Dashboard accessed 2x/week for visualizations
- ✅ 30% viral coefficient (users share bot with friends)
- ✅ R$2,500 MRR (85 paid users at R$29.90/month)
- ✅ Proven: Conversational + coaching > traditional apps for daily tracking in Brazil

---

### Why This Will Win

**Market Timing:**
- GLP-1 usage exploding in Brazil
- No localized, intelligent companions
- WhatsApp dominance creates unique opportunity

**Technical Feasibility:**
- WhatsApp bot already working (de-risked)
- N8N enables rapid iteration
- Supabase handles scale
- Clear migration path to Node.js when needed

**Competitive Moat:**
- 12+ months before large players (Noom, Calibrate) could replicate WhatsApp integration
- Brazil-specific (language, culture, payment, healthcare) creates defensibility
- Muscle preservation focus is global white space
- Gamification + autonomy create engagement and retention advantages
- Four pillars together = very difficult to replicate completely

**Unit Economics:**
- Lower CAC (WhatsApp sharing = viral, no app install ads)
- Higher retention (90% message read rate vs. 15% push)
- Faster activation (onboard in WhatsApp in 2 minutes vs. 10-minute app flow)

---

## The Future Beyond 90 Days

**6 Months:**
- 2,000+ daily active users
- Node.js migration completed (scale for 10K+ users)
- Advanced intelligence (predictive insights, CGM integration experiments)
- R$15-20K MRR

**12 Months:**
- 5,000+ daily active users
- Proven retention (>40% D30, >25% D90)
- Expand to other LATAM markets (Argentina, Mexico - similar WhatsApp dominance)
- R$50K+ MRR
- Decision point: Bootstrap profitable or raise seed round

---

**The market is ready. The technology exists. The WhatsApp MVP is live.**

**The only question: How fast can we execute?**

**Let's build something no one else has done. 🚀**

---

**End of Strategic Roadmap v2.0**

*Rewritten October 2025 to reflect WhatsApp-first reality, Brazil market focus, and parallel dashboard development. This roadmap supersedes the traditional app-first approach and embraces conversational AI as the primary interface for health tracking in emerging markets. Strategic update: Four value propositions (WhatsApp-native, muscle preservation, proactive coaching with gamification, and user autonomy) create a defensible competitive moat focused on habit formation and user empowerment—building health that lasts far beyond GLP-1 treatment.*
