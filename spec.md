# Zempi Dashboard - Product Specification & Roadmap

**Version:** 1.0
**Last Updated:** 2025-10-21
**Status:** In Progress

---

## 🎯 Vision Statement

Transform the Zempi dashboard into an indispensable tool that helps GLP-1 users **preserve muscle mass**, **manage side effects**, and **optimize treatment outcomes** through personalized insights and intelligent visualizations.

---

## 🧠 User Personas & Pain Points

### Primary Persona: "Maria, the Concerned Professional"
- **Age:** 35-45
- **Goal:** Lose 15-20kg while maintaining muscle and energy
- **Medication:** Ozempic 0.5mg → 1.0mg (titrating)
- **Top Fears:**
  1. Losing muscle mass (sagging skin, weakness)
  2. Unpredictable side effects (nausea ruining workday)
  3. Spending R$800-1200/month without optimal results
  4. Regaining weight after stopping treatment

### Critical User Needs
1. **Know if I'm eating enough protein** (daily tracking + trend)
2. **Understand what's normal** (am I losing weight too fast/slow?)
3. **Manage side effects** (when do they happen? what triggers them?)
4. **Feel confident in dose changes** (data to discuss with doctor)
5. **Stay motivated** (see progress beyond the scale)

---

## 📊 Success Metrics

### Engagement Metrics
- **DAU/MAU Ratio:** Target >40% (daily active users)
- **Meal Logging Frequency:** 4+ meals/week per user
- **Protein Goal Achievement:** >60% of users hit 1.6g/kg 4+ days/week

### Health Outcome Metrics
- **Average Protein Intake:** >1.4g/kg across user base
- **Healthy Weight Loss Velocity:** 80% of users losing 0.5-1kg/week
- **Side Effect Management:** Reduction in reported severity over time

### Retention Metrics
- **D7 Retention:** >70%
- **D30 Retention:** >50%
- **Feature Adoption:** >40% use insights/charts weekly

---

## 🗺️ Roadmap Overview

### Phase 1: Foundation (Weeks 1-2) - **IN PROGRESS**
- [x] Tab-based navigation (Apple Health style)
- [x] Basic panels (Overview, Protein, Wellness, Treatment)
- [ ] Weight Progress Chart with predictions
- [ ] Smart Alerts system
- [ ] Weekly Summary cards

### Phase 2: Intelligence (Weeks 3-4)
- [ ] Muscle Preservation Dashboard
- [ ] Side Effects correlation tracking
- [ ] Meal suggestions engine
- [ ] Quick log improvements

### Phase 3: Engagement (Weeks 5-6)
- [ ] Streaks & achievements
- [ ] Progress milestones
- [ ] Month-over-month comparisons

### Phase 4: Community & Optimization (Weeks 7-8)
- [ ] Anonymous community insights
- [ ] Dosage decision support
- [ ] Lab results integration

---

## 📋 Detailed Feature Specifications

---

## PHASE 1: Foundation of Value

### Feature 1.1: Weight Progress Chart 📈

**Status:** Not Started
**Priority:** P0 (Critical)
**Effort:** 3 days

#### User Story
> "As a GLP-1 user, I want to see my weight loss trend with predictions so I can feel confident I'm on track and know when I'll reach my goal."

#### Requirements

**Functional:**
- Display last 90 days of weight data as line chart
- 7-day moving average trend line (smoothed, prominent)
- "Healthy zone" shading (0.5-1kg/week loss rate)
- Visual milestones at 5%, 10%, 15%, 20% weight loss
- Goal line (horizontal) with date prediction
- Tap data point to see details (date, weight, change from previous)

**Data Calculations:**
```typescript
// Moving average (7-day)
movingAvg = sum(last7Days) / 7

// Prediction algorithm
weeklyRate = (currentWeight - weight4WeeksAgo) / 4
weeksToGoal = (currentWeight - goalWeight) / weeklyRate
predictedDate = today + (weeksToGoal * 7 days)

// Healthy zone bounds
upperBound = startWeight - (weeks * 0.5kg)
lowerBound = startWeight - (weeks * 1.0kg)
```

**UI Components:**
- Chart library: Recharts (already in use)
- Colors: Teal for trend line, green zone for healthy range
- Typography: JetBrains Mono for numbers
- Responsive: Full width on mobile, max-w-4xl on desktop

**Edge Cases:**
- Not enough data (<7 days): Show message "Keep tracking to see trends"
- Weight gain weeks: Show in amber, don't predict date
- Goal already achieved: Show celebration, suggest new goal

**Technical Notes:**
- Component: `/client/src/components/charts/WeightProgressChart.tsx`
- Data source: `/api/weight?startDate=X&endDate=Y`
- Cache: React Query with 5min staleTime
- Animation: Smooth line draw on mount (1s duration)

---

### Feature 1.2: Smart Alerts System 🔔

**Status:** Not Started
**Priority:** P0 (Critical)
**Effort:** 4 days

#### User Story
> "As a GLP-1 user, I want personalized alerts about my patterns so I can take action before small issues become big problems."

#### Alert Types & Triggers

**1. Protein Alerts (Daily Check)**
```typescript
// Low protein streak
if (last3Days.every(day => day.proteinGPerKg < 1.4)) {
  alert = {
    type: 'warning',
    title: 'Proteína baixa por 3 dias',
    message: 'Sua proteína está abaixo de 1.4g/kg. Risco de perda muscular.',
    action: 'Ver recomendações de refeições',
    priority: 'high'
  }
}

// Excellent streak
if (last7Days.every(day => day.proteinGPerKg >= 1.6)) {
  alert = {
    type: 'celebration',
    title: '🔥 7 dias de proteína excelente!',
    message: 'Você está protegendo seus músculos como um pro.',
    action: null,
    priority: 'medium'
  }
}
```

**2. Weight Loss Alerts (Weekly Check)**
```typescript
// Too fast
if (weeklyLossRate > 1.2) {
  alert = {
    type: 'warning',
    title: 'Perda de peso muito rápida',
    message: 'Você está perdendo >1kg/semana. Considere falar com médico.',
    action: 'Agendar consulta',
    priority: 'high'
  }
}

// Plateau (3+ weeks)
if (last3Weeks.stdDev < 0.3) {
  alert = {
    type: 'info',
    title: 'Peso estável há 3 semanas',
    message: 'Pode ser hora de discutir aumento de dose.',
    action: 'Ver histórico de doses',
    priority: 'medium'
  }
}
```

**3. Side Effect Patterns (When new symptom logged)**
```typescript
// Dosing pattern
const symptomDaysPostDose = symptoms
  .filter(s => s.type === 'nausea')
  .map(s => daysSinceDose(s.date))

if (symptomDaysPostDose.filter(d => d <= 2).length > 3) {
  alert = {
    type: 'insight',
    title: 'Padrão detectado: Náusea',
    message: 'Você geralmente sente náusea 1-2 dias após dose.',
    action: 'Ajustar refeições nesses dias',
    priority: 'low'
  }
}
```

**UI Components:**
- Alert Cards in OverviewPanel (top position)
- Icon + color coded by type (warning=amber, celebration=green, insight=teal)
- Dismissible (but re-appears if condition persists)
- Action button (primary CTA)

**Technical Implementation:**
- Background job: `/server/jobs/calculateAlerts.ts` (runs daily at 6am)
- Storage: `alerts` table with `userId`, `type`, `dismissed`, `createdAt`
- API: `GET /api/alerts` (returns active, undismissed alerts)
- Component: `/client/src/components/alerts/SmartAlert.tsx`

---

### Feature 1.3: Weekly Summary Card 📊

**Status:** Not Started
**Priority:** P1 (High)
**Effort:** 2 days

#### User Story
> "As a GLP-1 user, I want a weekly summary of my progress so I can feel accomplished and know what to improve."

#### Requirements

**Summary Metrics (Monday-Sunday):**
1. **Weight Change:** `startWeight - endWeight` with trend arrow
2. **Protein Performance:**
   - Days hit goal (>1.6g/kg)
   - Average g/kg
   - Streak status
3. **Meal Consistency:** Days with 3+ meals logged
4. **Side Effects:** Count of symptom-free days
5. **Medication Adherence:** Dose taken on time (if scheduled)

**Card Design:**
```
┌─────────────────────────────────────┐
│ 📅 Semana de 14-20 Out              │
├─────────────────────────────────────┤
│ ⚖️  Peso: -0.8kg ↓                  │
│ 💪 Proteína: 5/7 dias excelente     │
│ 🍽️  Refeições: 6/7 dias registrados │
│ 😊 Bem-estar: 6 dias sem sintomas   │
├─────────────────────────────────────┤
│ "Ótima semana! Continue assim."    │
└─────────────────────────────────────┘
```

**Auto-generated Insight:**
```typescript
function generateWeeklySummary(data: WeekData): string {
  const score = calculateWeekScore(data) // 0-100

  if (score >= 80) return "Semana excelente! Você está no caminho certo. 🌟"
  if (score >= 60) return "Boa semana! Pequenos ajustes podem melhorar ainda mais."
  if (score >= 40) return "Semana desafiadora. O que podemos ajustar?"
  return "Vamos recomeçar esta semana juntos. Você consegue!"
}
```

**Technical Notes:**
- Appears in OverviewPanel, top position (after alerts)
- Updates every Monday at 00:00
- Cached for the week (React Query)
- Tap to expand full details

---

## PHASE 2: Intelligence Layer

### Feature 2.1: Muscle Preservation Dashboard 💪

**Status:** Not Started
**Priority:** P0 (Critical)
**Effort:** 5 days

#### User Story
> "As a GLP-1 user, I want to understand if I'm losing fat or muscle so I can adjust my protein and exercise."

#### Components

**1. Protein × Weight Correlation Chart**
- Dual-axis chart: Weight (left Y), Protein g/kg (right Y)
- Visual correlation: When protein drops, does weight loss accelerate?
- Color zones: Green when protein >1.6, amber when 1.4-1.6, red when <1.4

**2. Body Composition Estimator**
```typescript
// Algorithm based on protein intake + weight loss rate
function estimateComposition(data: UserData) {
  const avgProtein = calculateAvgProtein(last30Days)
  const weightLossRate = calculateWeeklyRate()

  // Research-based heuristic
  let muscleRetentionRate = 0.85 // base
  if (avgProtein >= 1.6) muscleRetentionRate = 0.95
  if (avgProtein < 1.2) muscleRetentionRate = 0.70

  const totalLoss = initialWeight - currentWeight
  const estimatedMuscleLoss = totalLoss * (1 - muscleRetentionRate)
  const estimatedFatLoss = totalLoss - estimatedMuscleLoss

  return { muscle: estimatedMuscleLoss, fat: estimatedFatLoss }
}
```

**3. Risk Indicators**
- "Zona de Risco" badge when protein <1.4g/kg for 3+ days
- Recommendations: Increase protein, add resistance training

---

### Feature 2.2: Side Effects Intelligence 🤢

**Status:** Not Started
**Priority:** P1 (High)
**Effort:** 4 days

#### User Story
> "As a GLP-1 user, I want to know what triggers my side effects so I can avoid them."

#### Components

**1. Side Effects Timeline**
- Visual calendar showing: 💉 Dose day, 😕 Symptom days
- Patterns highlighted: "Náusea geralmente 2 dias pós-dose"

**2. Trigger Correlation**
```typescript
// Analyze: meal timing, food types, hydration
correlations = {
  'high-fat meals': {
    correlation: 0.78,
    insight: 'Gordura alta → +78% chance náusea'
  },
  'dose day': {
    correlation: 0.45,
    insight: 'Sintomas mais comuns dia da dose'
  },
  'low water intake': {
    correlation: 0.62,
    insight: 'Baixa água → constipação'
  }
}
```

**3. Personalized Tips**
- "Evite refeições gordurosas 2 dias após dose"
- "Hidrate mais nos dias de dose"
- "Refeições menores reduzem náusea em 60% dos casos"

---

### Feature 2.3: Intelligent Meal Suggestions 🍽️

**Status:** Not Started
**Priority:** P1 (High)
**Effort:** 3 days

#### User Story
> "As a GLP-1 user with low appetite, I want meal suggestions that are high-protein but small/easy so I can hit my goals even when I don't feel like eating."

#### Algorithm
```typescript
function suggestMeal(context: UserContext): Meal[] {
  const {
    proteinNeeded,      // remaining protein for today
    currentSymptoms,    // nausea, fatigue, etc
    foodPreferences,    // vegetarian, no lactose, etc
    timeOfDay,          // breakfast, lunch, dinner, snack
    recentMeals         // avoid repetition
  } = context

  // Filter meal database
  let candidates = mealDatabase
    .filter(m => m.protein >= proteinNeeded * 0.4)  // Provides significant protein
    .filter(m => !hasRestrictedIngredients(m, foodPreferences))
    .filter(m => !recentMeals.includes(m.id))  // Variety

  // Adjust for symptoms
  if (currentSymptoms.includes('nausea')) {
    candidates = candidates
      .filter(m => m.fats < 15)  // Low fat
      .filter(m => m.portionSize === 'small')  // Small portions
      .sort((a, b) => a.blandness - b.blandness)  // Bland first
  }

  // Return top 3
  return candidates.slice(0, 3)
}
```

**UI:**
- Card in ProteinPanel: "Faltam 45g de proteína hoje"
- 3 suggestions with: photo, macros, "Log este prato" button
- "Não gostei" → learns preferences

---

## PHASE 3: Engagement & Gamification

### Feature 3.1: Streaks & Achievements 🔥

**Status:** Not Started
**Priority:** P2 (Medium)
**Effort:** 3 days

#### Streaks Tracked
1. **Protein Streak:** Consecutive days hitting 1.6g/kg
2. **Logging Streak:** Consecutive days with 3+ meals logged
3. **Medication Adherence:** Consecutive doses on time

#### Achievements (Badges)
- 🏆 "First Week Warrior" - 7 days of tracking
- 💪 "Muscle Defender" - 30 days of 1.6g/kg protein
- 📉 "First 5kg" - Lost 5kg
- 🎯 "Goal Crusher" - Reached target weight
- 🔥 "Hot Streak" - 14 days protein streak

#### UI
- Streak counter in header (🔥 12 days)
- Badge showcase in profile
- Celebration animation when milestone hit
- Share to WhatsApp status (optional)

---

### Feature 3.2: Progress Milestones 🎉

**Status:** Not Started
**Priority:** P2 (Medium)
**Effort:** 2 days

#### Milestone Triggers
```typescript
milestones = [
  {
    id: '5kg',
    threshold: (initial - current) >= 5,
    title: 'Primeiros 5kg!',
    message: 'Você perdeu 5kg. Isso é aproximadamente 35.000 calorias!',
    celebration: 'confetti'
  },
  {
    id: '10percent',
    threshold: ((initial - current) / initial) >= 0.10,
    title: '10% mais leve!',
    message: 'Você eliminou 10% do peso inicial. Incrível!',
    celebration: 'fireworks'
  },
  {
    id: 'goal',
    threshold: current <= goal,
    title: '🎯 Meta Alcançada!',
    message: 'Parabéns! Hora de manter e celebrar.',
    celebration: 'fullscreen'
  }
]
```

#### Celebration UX
- Full-screen overlay with Lottie animation
- Shareable card (download PNG)
- "Continue sua jornada" CTA

---

### Feature 3.3: Month-over-Month Comparison 📊

**Status:** Not Started
**Priority:** P2 (Medium)
**Effort:** 2 days

#### Metrics Compared
```
Este Mês vs Mês Passado
─────────────────────────
Peso perdido: 3.2kg vs 2.8kg (+14%) ✅
Proteína média: 1.7g/kg vs 1.5g/kg (+13%) ✅
Dias sem sintomas: 22 vs 18 (+22%) ✅
Refeições registradas: 89 vs 76 (+17%) ✅
```

#### UI
- Toggle in TreatmentPanel
- Bar charts for each metric
- Green/red arrows for improvement/regression
- Insights: "Você melhorou em 4/4 métricas este mês!"

---

## PHASE 4: Community & Advanced Features

### Feature 4.1: Anonymous Community Insights 👥

**Status:** Not Started
**Priority:** P3 (Nice-to-have)
**Effort:** 5 days

#### Privacy-First Approach
- All data aggregated and anonymized
- No personal information shared
- User can opt-out completely

#### Insights Shown
```typescript
communityInsights = {
  medication: "Ozempic 1.0mg",
  insights: [
    {
      metric: "Protein Intake",
      userValue: 1.7,
      community: {
        avg: 1.4,
        percentile: 78,  // User is in top 22%
        message: "Você está acima de 78% dos usuários!"
      }
    },
    {
      metric: "Weight Loss Rate",
      userValue: 0.7,
      community: {
        avg: 0.6,
        healthyRange: [0.5, 1.0],
        message: "Você está no ritmo saudável (0.5-1kg/sem)"
      }
    }
  ]
}
```

#### Social Features
- "Top 3 receitas da comunidade"
- "90% dos usuários reportam náusea dias 1-2 pós-dose"
- Benchmarking without competition

---

### Feature 4.2: Dosage Decision Support 💊

**Status:** Not Started
**Priority:** P1 (High)
**Effort:** 4 days

#### User Story
> "As a GLP-1 user, I want data-driven insights about my current dose so I can have informed conversations with my doctor about titration."

#### Analysis Factors
```typescript
function analyzeDoseEffectiveness(user: User): DoseReport {
  const currentDose = user.currentDose
  const weeksOnDose = weeksSince(user.lastDoseChange)

  const indicators = {
    weightLoss: {
      last4Weeks: calculateWeightLoss(4),
      status: weightLossStatus(),  // "good", "plateau", "too-fast"
      recommendation: null
    },
    sideEffects: {
      severity: calculateAvgSeverity(),
      frequency: calculateFrequency(),
      status: sideEffectStatus(),  // "manageable", "severe", "minimal"
      recommendation: null
    },
    timeOnDose: {
      weeks: weeksOnDose,
      status: weeksOnDose >= 4 ? "ready" : "wait",  // Min 4 weeks per dose
      recommendation: null
    }
  }

  // Decision logic
  if (
    indicators.weightLoss.status === "plateau" &&
    indicators.sideEffects.status !== "severe" &&
    indicators.timeOnDose.status === "ready"
  ) {
    return {
      recommendation: "consider-increase",
      confidence: "medium",
      message: "Dados sugerem conversar com médico sobre aumento de dose",
      supportingData: indicators
    }
  }

  // ... more logic
}
```

#### UI Dashboard
```
Análise da Dose Atual
─────────────────────
Dose: 0.5mg | Há 6 semanas

✅ Peso estável (últimas 2 sem)
✅ Efeitos colaterais diminuíram 60%
⏰ Tempo mínimo na dose atingido

💡 Recomendação: Considere discutir
   aumento de dose com seu médico.

[Ver histórico completo]  [Baixar relatório PDF]
```

---

### Feature 4.3: Lab Results Integration 🧪

**Status:** Not Started
**Priority:** P3 (Nice-to-have)
**Effort:** 6 days

#### Supported Biomarkers
- HbA1c (glycemic control)
- Fasting glucose
- Lipid panel (cholesterol, triglycerides, HDL, LDL)
- Liver enzymes (ALT, AST)
- Thyroid (TSH, T3, T4)

#### Features
- Manual entry or photo upload (OCR)
- Trend over time
- Flag out-of-range values
- Celebrate improvements: "HbA1c melhorou 1.2% desde início!"

---

## 🎨 UX Principles

### Visual Design System
- **Colors:** Teal (medical trust), Green (success), Amber (warning), Red (alert)
- **Typography:** Inter (UI), JetBrains Mono (data/numbers)
- **Spacing:** 8px grid system
- **Elevation:** 3 levels (flat, subtle, prominent)

### Animation Guidelines
- **Purpose-driven:** Only animate to provide feedback or guide attention
- **Subtle:** Max 300ms duration, ease-out curves
- **Celebrations:** Exception - full animations for milestones
- **Loading:** Skeleton screens, no spinners

### Accessibility
- **WCAG 2.1 AA** compliance minimum
- Keyboard navigation for all interactions
- Screen reader optimized (ARIA labels)
- High contrast mode support
- Font scaling support (up to 200%)

---

## 🔧 Technical Architecture

### Frontend Stack
- **Framework:** React 18 + TypeScript
- **State:** TanStack Query (server state) + Zustand (UI state)
- **Styling:** TailwindCSS + shadcn/ui
- **Charts:** Recharts
- **Animations:** Framer Motion

### Backend Stack
- **Runtime:** Node.js (Express)
- **Database:** PostgreSQL (Supabase)
- **ORM:** Drizzle
- **Jobs:** Node-cron (for alerts, summaries)
- **Storage:** Supabase Storage (for photos, lab results)

### API Design Patterns
```typescript
// Consistent response format
{
  data: T | null,
  error: { code: string, message: string } | null,
  meta: { page, total, etc } | null
}

// Standard endpoints
GET    /api/{resource}              // List
GET    /api/{resource}/:id          // Get one
POST   /api/{resource}              // Create
PATCH  /api/{resource}/:id          // Update
DELETE /api/{resource}/:id          // Delete
GET    /api/{resource}/insights     // Computed data
```

### Data Models (Key Tables)

```sql
-- Core tracking
users (id, username, createdAt)
user_profiles (userId, name, medication, dose, weight, goalWeight, ...)
meals (id, userId, date, time, protein, calories, carbs, fats, ...)
weight_entries (id, userId, date, weight)
mood_entries (id, userId, date, mood, symptoms[], notes)
medication_doses (id, userId, scheduledDate, completed, completedAt)

-- Intelligence layer
alerts (id, userId, type, title, message, dismissed, createdAt)
insights (id, userId, category, content, createdAt)
achievements (id, userId, badgeId, unlockedAt)
streaks (id, userId, type, currentStreak, longestStreak)

-- Future
lab_results (id, userId, date, biomarker, value, unit)
meal_templates (id, userId, name, protein, calories, ...)
```

---

## 🚀 Implementation Priorities

### This Week (P0 - Must Have)
1. ✅ Tab navigation + panels structure
2. ⬜ Weight Progress Chart
3. ⬜ Smart Alerts (protein warnings)
4. ⬜ Weekly Summary

### Next 2 Weeks (P1 - Should Have)
5. ⬜ Muscle Preservation Dashboard
6. ⬜ Side Effects intelligence
7. ⬜ Meal suggestions
8. ⬜ Quick log improvements

### Month 2 (P2 - Nice to Have)
9. ⬜ Streaks & achievements
10. ⬜ Progress milestones
11. ⬜ Month-over-month

### Future (P3 - Deferred)
12. ⬜ Community insights
13. ⬜ Lab results
14. ⬜ Advanced dosage support

---

## 📝 Open Questions & Decisions Needed

### Design Decisions
- [ ] Should we show predicted weight loss date prominently? (Could create anxiety if not met)
- [ ] How aggressive should protein alerts be? (Balance between helpful and nagging)
- [ ] Should achievements be shareable outside app? (Privacy vs social proof)

### Technical Decisions
- [ ] Run background jobs server-side or client-side? (Lean toward server for consistency)
- [ ] How to handle timezone differences for "daily" calculations?
- [ ] Cache strategy for charts (static until new data vs real-time)?

### Product Decisions
- [ ] Freemium vs paid? Which features are premium?
- [ ] Integration with WhatsApp bot - how deep?
- [ ] Medical disclaimer language for all recommendations?

---

## 🔗 References & Inspiration

### Apps Studied
- **Hims/Hers:** Onboarding, medical credibility, premium feel
- **Calibrate:** Structured program, metabolic focus, coaching
- **Found:** Affordable, community-driven, chat-first
- **MyFitnessPal:** Meal logging UX, database of foods
- **Apple Health:** Visual hierarchy, data visualization, privacy-first

### Research Papers
- Protein requirements during weight loss (1.6g/kg recommendation)
- GLP-1 side effect patterns and management
- Weight loss velocity and muscle preservation

---

## 📊 Appendix: User Flow Diagrams

### Daily User Journey
```
Morning (7am)
  → Open app
  → See Weekly Summary (if Monday)
  → Check alerts ("Protein streak: 3 days!")
  → Log breakfast

Afternoon (1pm)
  → Quick log lunch (voice or template)

Evening (7pm)
  → Log dinner
  → See "You need 30g more protein"
  → Tap suggestion: "Iogurte grego"
  → Log snack

Before bed (10pm)
  → Check weight progress chart
  → Feel accomplished seeing trend
  → Set reminder for tomorrow's dose
```

### Titration Decision Journey
```
User Context: Been on 0.5mg for 6 weeks

1. Opens TreatmentPanel
2. Sees "Dose Analysis" card
3. Reads:
   - ✅ 6 weeks on current dose
   - ✅ Weight stable last 2 weeks
   - ✅ Side effects minimal
   - 💡 "Consider discussing increase with doctor"
4. Taps "Download Report"
5. Gets PDF with charts to show doctor
6. Books appointment
7. Doctor increases to 1.0mg
8. User updates dose in app
9. App starts tracking "Week 1 on 1.0mg"
```

---

**End of Specification**

*This is a living document. Update as we learn from users and iterate on features.*
