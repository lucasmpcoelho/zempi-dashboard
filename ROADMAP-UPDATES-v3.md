# Strategic Roadmap Updates v3.0
## Critical Feature Reprioritization Based on Value Proposition Research

**Date:** October 2025
**Status:** Ready for Integration
**Impact:** High - Addresses critical gaps in habit formation and community support

---

## Executive Summary

After deep research into GLP-1 user communities (Reddit, Facebook groups) and competitive analysis, we've identified **critical gaps** in the current roadmap that prevent delivering on all 4 value propositions:

### ✅ What's Already Strong:
- Muscle Preservation Score (VP1: Protect Muscle) - 70% coverage
- Pattern Detection (VP3: Understand Patterns) - 60% coverage

### 🚨 Critical Gaps Identified:
- **VP2 (Build Lasting Habits): Only 30% coverage** - Missing habit template, maintenance mode, reflection framework
- **VP4 (Feel Supported): Only 20% coverage** - Community insights missing until Phase 4, too late

### 📊 Research Findings:
- **67% regain 2/3 of weight** within 1 year after stopping GLP-1
- **53% feel "getting healthy is lonely"**
- Research shows: **"Journaling creates 'habit template' for lifetime success"**
- **25-40% of weight lost is muscle mass** (confirms VP1 priority)

---

## Key Changes to Roadmap

### Features Moved Earlier:
1. ✅ **Photo Logging:** ~~Phase 3~~ → **Already exists in WhatsApp** (no change needed)
2. ✅ **Community Insights:** "Future" → **Phase 2** (VP4 was critically underserved)
3. ✅ **Anonymous Benchmarking:** "Future" → **Phase 2** (addresses "am I normal?" anxiety)

### Features Moved Later:
1. ⬇️ **Voice Notes:** Phase 3 → **Phase 4** (nice-to-have, not critical path)

### NEW Features Added:
1. 🆕 **Smart Onboarding** (Phase 1) - Immediate value, Day 1 protein targets
2. 🆕 **Weekly Reflection Prompts** (Phase 2) - Habit formation framework
3. 🆕 **Community Insights Panel** (Phase 2) - VP4 support
4. 🆕 **Anonymous Benchmarking Algorithm** (Phase 2) - VP3 context
5. 🆕 **Habit Template Builder** (Phase 3) - **THE feature to prevent 67% weight regain**
6. 🆕 **Maintenance Mode** (Phase 4) - Post-medication tracking

---

## REVISED PHASE 1: Foundation + Immediate Value (Weeks 1-2)

**Goal:** Hook users with muscle score + establish baseline + deliver immediate value

### Value Delivery Scorecard:
- VP1 (Protect Muscle): 40% → Focus on muscle score
- VP2 (Build Habits): 20% → Baseline tracking
- VP3 (Understand Patterns): 30% → Simple early insights
- VP4 (Feel Supported): 20% → Warm onboarding tone

---

### Track A: WhatsApp Enhancements

#### **Feature 1A.1: Smart Onboarding Journey** 🆕

**Priority:** P0 (First Impression)
**Effort:** 1 day
**User Story:** "As a new user, I want immediate protein targets and education so I know what to do from Day 1"

**Implementation:**
```
Day 1 Flow:
1. Welcome + Profile Setup
   - Name, starting weight, goal weight, medication
   - Calculate protein target: weight_kg × 1.6

2. Immediate Guidance
   WhatsApp: "Olá Maria! 👋

   Sua meta diária de proteína: 132g

   Por quê? Proteger seus músculos durante a perda de peso.

   25-40% da perda de peso com GLP-1 pode ser músculo.
   Zempi ajuda você a perder GORDURA, não músculo. 💪

   Vamos começar! Registre sua primeira refeição."

Day 3 (After 2-3 logs):
   "Parabéns! 3 refeições registradas. 🎉

   Já notei um padrão:
   ✅ Você registra café da manhã consistentemente

   Continue assim! Consistência > Perfeição."
```

**Why This Matters:**
- Current Phase 1 delivers no unique value for 2 weeks
- Users need quick wins to stay engaged
- Education from Day 1 sets proper expectations
- Simple patterns with 3 days of data = early engagement

---

#### **Feature 1A.2: Meal Logging (Text-Based)**

**Priority:** P0
**Effort:** Already exists (enhance)
**Enhancement:** Add favorites/templates from Day 1
```
WhatsApp: "Repetir café da manhã de ontem?
          (2 ovos, pão integral, café)

          Responda SIM ou descreva nova refeição."
```

---

#### **Feature 1A.3: Weight & Symptom Logging**

**Priority:** P0
**Effort:** 1 day
(Same as current roadmap)

---

### Track B: Dashboard Foundation

#### **Feature 1B.1: Dashboard Shell + Navigation**

**Priority:** P0
**Effort:** 2 days
**Change:** Add 5th tab: "Community"

**Navigation Structure:**
```
📊 Overview     💪 Muscle     📈 Progress     💊 Treatment     👥 Community
```

Why: Community insights come in Phase 2 now (not Phase 4)

---

#### **Feature 1B.2: Data Sync Layer**

**Priority:** P0
**Effort:** 2 days
(Same as current roadmap)

---

### Track C: Intelligence Layer

#### **Feature 1C.1: Muscle Preservation Score Algorithm**

**Priority:** P0 (CORE DIFFERENTIATOR)
**Effort:** 3 days
(Same as current roadmap - this is already excellent)

---

#### **Feature 1C.2: Baseline Pattern Detection (Simple)** 🆕

**Priority:** P1
**Effort:** 1 day
**User Story:** "As a user, I want to see simple patterns even with 3-5 days of data"

**Implementation:**
```typescript
function detectEarlyPatterns(userId: string, days: number = 5) {
  // Consistency patterns
  const morningLogs = countLogsByTime(userId, '06:00-10:00', days)
  if (morningLogs >= days * 0.7) {
    return "Você registra café da manhã consistentemente (${morningLogs}/${days} dias)"
  }

  // Timing patterns
  const avgWeighInTime = getAvgWeighInTime(userId, days)
  return "Você costuma pesar às ${avgWeighInTime}. Continue neste horário!"
}
```

**Why This Matters:**
- Don't make users wait weeks for insights
- Simple patterns = early engagement
- Shows system is "learning" about them

---

### Phase 1 Success Criteria:

- ✅ Users can log meals, weight, symptoms (WhatsApp + Dashboard)
- ✅ Muscle score calculated and displayed
- ✅ Users receive immediate protein targets (Day 1)
- ✅ Simple patterns shown by Day 3-5 (early engagement hook)
- ✅ Dashboard shell ready with 5 tabs
- ✅ Data syncing in real-time

---

## REVISED PHASE 2: Intelligence + Habit Formation (Weeks 3-4)

**Goal:** Deliver insights, start habit formation, introduce community context

### Value Delivery Scorecard:
- VP1 (Protect Muscle): 80%
- VP2 (Build Habits): 50%
- VP3 (Understand Patterns): 75%
- VP4 (Feel Supported): 70% ⬆️ (was 20%)

---

### Track A: WhatsApp Proactive Features

#### **Feature 2A.1: Smart Protein Alerts**

**Priority:** P0
**Effort:** 2 days
(Same as current roadmap)

---

#### **Feature 2A.2: Streak Tracking + Celebrations**

**Priority:** P0 (HABIT FORMATION)
**Effort:** 1 day
(Same as current roadmap)

---

#### **Feature 2A.3: Weekly Reflection Prompts** 🆕

**Priority:** P1 (CRITICAL FOR VP2)
**Effort:** 1 day
**User Story:** "As a user, I want to reflect on what worked so I build lasting habits"

**Implementation:**
```
Every Monday 9 AM (WhatsApp):

"Vamos refletir sobre a semana passada 💭

1. O que funcionou bem para você?
2. Qual foi seu maior desafio?
3. O que você vai repetir esta semana?

Responda quando puder (ou pule com /pular)"

---

User Response Examples:

"Comer proteína no café da manhã ajudou muito"
  → AI tags: breakfast_protein_success
  → Saved to habit_insights table

"Difícil comer proteína com náusea"
  → AI tags: nausea_protein_challenge
  → Triggers: symptom-aware meal suggestions
```

**Why This Is Critical:**
- Research shows: "Journaling creates 'habit template' for lifetime success"
- Current roadmap has NO reflection mechanism
- This is what prevents 67% weight regain
- Start Week 3 (users have 2 weeks of data to reflect on)

**Database Schema:**
```sql
CREATE TABLE habit_reflections (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  week_start DATE,
  wins TEXT[],           -- Tagged successes
  challenges TEXT[],     -- Tagged struggles
  patterns TEXT[],       -- AI-detected patterns
  created_at TIMESTAMP
);
```

---

#### **Feature 2A.4: Photo Meal Logging**

**Status:** ✅ Already exists in WhatsApp
**Action:** Document current capability, ensure quality

---

### Track B: Dashboard Visualizations

#### **Feature 2B.1: Weight Progress Chart**

**Priority:** P0
**Effort:** 2 days
(Same as current roadmap)

---

#### **Feature 2B.2: Muscle Score Gauge**

**Priority:** P0
**Effort:** 1 day
(Same as current roadmap)

---

#### **Feature 2B.3: Side Effect Calendar**

**Priority:** P1
**Effort:** 2 days
(Same as current roadmap)

---

#### **Feature 2B.4: Community Insights Panel** 🆕

**Priority:** P1 (CRITICAL FOR VP4)
**Effort:** 2 days
**User Story:** "As a user, I want to know if my experience is normal without social pressure"

**Implementation:**

**Dashboard: Community Tab**
```tsx
<CommunityInsightsPanel>
  <SectionHeader>
    💬 Você não está sozinha
  </SectionHeader>

  <InsightCard>
    <MetricComparison>
      <Label>Peso perdido por semana</Label>
      <UserValue>Você: 0.8kg</UserValue>
      <CohortValue>Média (Ozempic 1.0mg): 0.7kg</CohortValue>
      <Status color="green">✅ Ritmo saudável!</Status>
    </MetricComparison>
  </InsightCard>

  <InsightCard>
    <PercentileRanking>
      <Label>Proteína diária</Label>
      <UserValue>Você: 1.7g/kg</UserValue>
      <Percentile>Top 15% dos usuários</Percentile>
      <Status color="green">💪 Excelente!</Status>
    </PercentileRanking>
  </InsightCard>

  <InsightCard>
    <CommonPatterns>
      <Label>Sintomas comuns</Label>
      <Pattern>73% sentem náusea dias 1-2 pós-dose</Pattern>
      <UserPattern>Você: Dia 2 (normal!)</UserPattern>
    </CommonPatterns>
  </InsightCard>
</CommunityInsightsPanel>
```

**Why This Is Critical:**
- VP4 was only 20% covered (community deferred to "future")
- 53% feel lonely in health journey
- "Am I normal?" is constant user question
- Brazil is collectivist culture (community matters MORE than US)
- Privacy-first approach (no social feed)

**Data Displayed:**
- Weight loss rate comparison (cohort: medication + dose + weeks)
- Protein intake percentile
- Side effect frequency (anonymous aggregation)
- NO user photos, names, or social feed

---

### Track C: Intelligence Layer

#### **Feature 2C.1: Advanced Pattern Detection**

**Priority:** P0
**Effort:** 3 days
(Same as current roadmap - side effect correlation)

---

#### **Feature 2C.2: Anonymous Benchmarking Algorithm** 🆕

**Priority:** P1
**Effort:** 2 days
**User Story:** "As a user, I want to see how my metrics compare to similar users"

**Implementation:**
```sql
-- Cohort Matching
CREATE OR REPLACE FUNCTION get_user_cohort(user_id UUID)
RETURNS TABLE (
  avg_weekly_weight_loss DECIMAL,
  avg_protein_gperkg DECIMAL,
  common_side_effects JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    AVG(weekly_weight_loss),
    AVG(avg_daily_protein / current_weight),
    jsonb_agg(DISTINCT side_effect) as common_side_effects
  FROM user_stats
  WHERE medication = (SELECT medication FROM users WHERE id = user_id)
    AND dose = (SELECT dose FROM users WHERE id = user_id)
    AND weeks_on_treatment BETWEEN
      (SELECT weeks_on_treatment - 2 FROM users WHERE id = user_id) AND
      (SELECT weeks_on_treatment + 2 FROM users WHERE id = user_id)
  GROUP BY medication, dose;
END;
$$ LANGUAGE plpgsql;

-- Percentile Ranking
CREATE OR REPLACE FUNCTION get_protein_percentile(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  user_protein DECIMAL;
  percentile INTEGER;
BEGIN
  SELECT avg_daily_protein / current_weight INTO user_protein
  FROM user_stats WHERE id = user_id;

  SELECT PERCENT_RANK() OVER (ORDER BY avg_daily_protein / current_weight) * 100
  INTO percentile
  FROM user_stats
  WHERE medication = (SELECT medication FROM users WHERE id = user_id);

  RETURN ROUND(percentile);
END;
$$ LANGUAGE plpgsql;
```

**Privacy Safeguards:**
- Minimum 10 users in cohort (otherwise show "insufficient data")
- No individual user data exposed
- Aggregate statistics only
- User can opt-out completely

---

### Phase 2 Success Criteria:

- ✅ Photo logging working (already exists, documented)
- ✅ Protein alerts sending (low streak, excellent streak)
- ✅ Pattern detection showing side effect correlations
- ✅ **Community insights panel live (benchmarking working)**
- ✅ **Weekly reflection prompts active (habit formation starting)**
- ✅ Alert engagement >30%
- ✅ Community insights viewed by 40%+ users

---

## REVISED PHASE 3: Gamification + Habit Templates (Weeks 5-6)

**Goal:** Solidify habit formation, polish engagement, prepare for maintenance

### Value Delivery Scorecard:
- VP1 (Protect Muscle): 95%
- VP2 (Build Habits): 85% ⬆️ (was 60%)
- VP3 (Understand Patterns): 90%
- VP4 (Feel Supported): 85%

---

### Track A: WhatsApp Advanced Features

#### **Feature 3A.1: Achievement Badges + Milestones**

**Priority:** P0 (GAMIFICATION)
**Effort:** 2 days
(Same as current roadmap)

**Badges:**
- 🏆 First Week Warrior (7 days tracking)
- 💪 Muscle Defender (30 days 1.6g/kg)
- 🔥 Hot Streak (14 day protein streak)
- 📉 First 5kg lost
- 🎯 Goal Crusher (reached target weight)

---

#### **Feature 3A.2: Symptom-Aware Meal Suggestions**

**Priority:** P1
**Effort:** 2 days
(Same as current roadmap)

---

#### **Feature 3A.3: Habit Template Builder** 🆕

**Priority:** P0 (CRITICAL FOR VP2)
**Effort:** 2 days
**User Story:** "As a user who's been tracking 3-4 weeks, I want to see MY successful patterns so I can replicate them"

**This is THE feature to prevent 67% weight regain.**

**Implementation:**

**Week 5 WhatsApp Message:**
```
📊 Analisando seus últimos 30 dias...

🎯 SEU MODELO DE HÁBITOS DE SUCESSO

✅ Padrões Alimentares
  • Você come proteína alta no café (6/7 dias)
  • Você registra ANTES de comer (80% do tempo)
  • Almoço às 12h-13h (consistente)

✅ Proteína
  • Meta: 132g/dia
  • Você atinge: 85% dos dias
  • Melhores fontes: Frango, ovos, iogurte

✅ Gestão de Sintomas
  • Você evita gordura dias 1-2 pós-dose
  • Resultado: 60% menos náusea

✅ Pesagem
  • Segundas, quartas, sextas às 7h (excelente!)

💪 Este é SEU modelo para VIDA TODA.
   Continue assim quando parar medicação!

[Ver modelo completo no app]
```

**Dashboard: Habit Template View**
```tsx
<HabitTemplatePanel>
  <Header>
    <Title>Seu Modelo de Hábitos</Title>
    <Subtitle>Padrões que funcionam para VOCÊ</Subtitle>
  </Header>

  <Section>
    <SectionTitle>🍽️ Padrões Alimentares</SectionTitle>
    <HabitCard>
      <Pattern>Proteína alta no café da manhã</Pattern>
      <Frequency>6/7 dias</Frequency>
      <Impact>Correlação com dias de meta atingida: 92%</Impact>
    </HabitCard>
    <HabitCard>
      <Pattern>Registrar antes de comer</Pattern>
      <Frequency>80% do tempo</Frequency>
      <Impact>Melhora aderência em 35%</Impact>
    </HabitCard>
  </Section>

  <Section>
    <SectionTitle>😌 Gestão de Sintomas</SectionTitle>
    <HabitCard>
      <Pattern>Evitar gordura dias 1-2 pós-dose</Pattern>
      <Impact>Reduz náusea em 60%</Impact>
    </HabitCard>
  </Section>

  <Section>
    <SectionTitle>⚖️ Pesagem</SectionTitle>
    <HabitCard>
      <Pattern>Seg/Qua/Sex às 7h</Pattern>
      <Consistency>95% consistência</Consistency>
    </HabitCard>
  </Section>

  <ExportButton>
    📄 Exportar "Meu Modelo de Hábitos para Vida"
  </ExportButton>
</HabitTemplatePanel>
```

**Algorithm:**
```typescript
async function generateHabitTemplate(userId: string) {
  const last30Days = await getUserData(userId, 30)

  // 1. Eating Pattern Analysis
  const mealTimingPatterns = analyzeMealTiming(last30Days.meals)
  const proteinSourcePatterns = analyzeProteinSources(last30Days.meals)
  const loggingBehavior = analyzeLoggingBehavior(last30Days.logs)

  // 2. Success Correlation
  const successDays = last30Days.filter(d => d.proteinGoalMet)
  const successPatterns = findCommonalities(successDays)

  // 3. Symptom Management
  const symptomManagement = analyzeSymptomPatterns(last30Days.symptoms, last30Days.meals)

  // 4. Weight Tracking
  const weighingPatterns = analyzeWeighingConsistency(last30Days.weights)

  return {
    eatingPatterns: {
      timing: mealTimingPatterns,
      proteinSources: proteinSourcePatterns,
      loggingBehavior
    },
    successFactors: successPatterns,
    symptomManagement,
    weighingHabits: weighingPatterns
  }
}
```

**Why This Is Critical:**
- Research: "Journaling creates habit template for lifetime success"
- Current roadmap: ZERO features for post-medication success
- 67% regain weight because they don't know WHAT worked
- This exports as PDF: "My Habit Template for Life"

**Database:**
```sql
CREATE TABLE habit_templates (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  generated_at TIMESTAMP,
  eating_patterns JSONB,
  success_factors JSONB,
  symptom_management JSONB,
  weighing_habits JSONB,
  pdf_url TEXT
);
```

---

### Track B: Dashboard Polish

#### **Feature 3B.1: Weekly Summary Card**

**Priority:** P1
**Effort:** 2 days
(Same as current roadmap)

---

#### **Feature 3B.2: Protein Timeline (Bar Chart)**

**Priority:** P2
**Effort:** 1 day
(Same as current roadmap)

---

#### **Feature 3B.3: Progress Celebration Animations**

**Priority:** P2
**Effort:** 1 day
(Same as current roadmap - Lottie animations for badges)

---

### Track C: Intelligence Layer

#### **Feature 3C.1: Dosage Decision Support Dashboard (BASIC)**

**Priority:** P1
**Effort:** 2 days
(Same as current roadmap)

---

### Phase 3 Success Criteria:

- ✅ Achievement badges unlocking (gamification working)
- ✅ **Habit template generated for users with 3+ weeks data**
- ✅ **Habit template viewed 2+ times by 60%+ users**
- ✅ Weekly summaries showing scores
- ✅ Dosage insights surfaced (when patterns detected)

---

## REVISED PHASE 4: Integration, Maintenance Mode, Beta Launch (Weeks 7-12)

**Goal:** Two-way sync, post-medication features, beta testing, launch

### Value Delivery Scorecard:
- VP1 (Protect Muscle): 100%
- VP2 (Build Habits): 100% ⬆️ (was 60%)
- VP3 (Understand Patterns): 100%
- VP4 (Feel Supported): 95%

---

### Weeks 7-8: Integration & Maintenance Features

#### **Feature 4.1: WhatsApp ↔ Dashboard Two-Way Sync**

**Priority:** P0
**Effort:** 3 days
(Same as current roadmap)

---

#### **Feature 4.2: PDF Report for Doctor Visits**

**Priority:** P1
**Effort:** 2 days
(Same as current roadmap)

---

#### **Feature 4.3: Maintenance Mode Toggle** 🆕

**Priority:** P0 (CRITICAL FOR VP2)
**Effort:** 2 days
**User Story:** "As a user stopping GLP-1, I want to transition to maintenance mode and keep tracking habits"

**This addresses 67% weight regain.**

**Implementation:**

**Transition Flow (4 weeks before stopping):**
```
Week -4 WhatsApp:
"Olá Maria,

Vi que você está próxima do fim do tratamento.

Vamos preparar para manter seus resultados PARA SEMPRE. 💪

Nas próximas 4 semanas, vou ajudar você a:
1. Revisar seu Modelo de Hábitos
2. Praticar sem depender da medicação
3. Ativar Modo Manutenção

Juntos, vamos garantir que sua perda de peso seja PERMANENTE."

Week -2:
"📊 Revisão do Modelo de Hábitos

Últimos 90 dias:
✅ Café proteico: 85% dos dias
✅ Registrar antes comer: 80%
✅ Evitar gordura pós-dose: funcionou!

Agora: Pratique TODOS os dias (não só 85%).

Dica: Remova "evitar gordura pós-dose"
      (não terá mais doses!)

Adicione: Gerenciar apetite sem medicação
         (refeições menores, proteína primeiro)"

Week 0 (Stopping medication):
"🎯 MODO MANUTENÇÃO ATIVADO

Você parou a medicação, mas seus HÁBITOS continuam.

Mudanças:
• Não rastreio doses (você não toma mais)
• Não rastreio sintomas (não terá mais)
• FOCO: Aderência aos hábitos

Nova métrica: Score de Consistência de Hábitos (0-100)

Vamos lá! Seus primeiros 30 dias sem medicação. 💪"
```

**Dashboard Changes in Maintenance Mode:**
```tsx
// Before (Medication Mode)
<Tabs>
  <Tab>Overview</Tab>
  <Tab>Muscle</Tab>
  <Tab>Progress</Tab>
  <Tab>Treatment</Tab>  ← Medication tracking
  <Tab>Community</Tab>
</Tabs>

// After (Maintenance Mode)
<Tabs>
  <Tab>Overview</Tab>
  <Tab>Muscle</Tab>
  <Tab>Progress</Tab>
  <Tab>Habits</Tab>  ← Habit adherence tracking
  <Tab>Community</Tab>
</Tabs>

<MaintenanceModePanel>
  <Header>
    <Badge color="purple">Modo Manutenção</Badge>
    <Title>30 dias sem medicação</Title>
  </Header>

  <HabitConsistencyScore>
    <Score>82/100</Score>
    <Status>Excelente! Continue assim.</Status>
  </HabitConsistencyScore>

  <HabitChecklist>
    <Habit>
      <Name>Café proteico</Name>
      <This Week>6/7 dias</This Week>
      <Trend>↑ Melhorando</Trend>
    </Habit>
    <Habit>
      <Name>Registrar antes comer</Name>
      <ThisWeek>5/7 dias</ThisWeek>
      <Trend>↓ Atenção</Trend>
    </Habit>
  </HabitChecklist>

  <WeightMaintenance>
    <CurrentWeight>75kg</CurrentWeight>
    <GoalWeight>75kg (manter)</GoalWeight>
    <Variation>±0.5kg (estável!)</Variation>
  </WeightMaintenance>
</MaintenanceModePanel>
```

**WhatsApp Tone Shift:**
```
// Before (Medication Mode)
"Você atingiu meta proteína hoje! 💪"
"Seu score muscular: 78 (zona segura)"

// After (Maintenance Mode)
"30 dias sem medicação! Peso estável. 🎉"
"Mantendo hábitos fortes! 5 dias seguidos. 💪"
"Lembre: Hábitos > Medicação. Você consegue!"
```

**New Metrics Tracked:**
- Habit consistency score (adherence to personal template)
- Weight stability (±2kg from goal = maintained)
- Logging consistency (still tracking?)
- Protein adherence (without medication appetite suppression)

**Database:**
```sql
ALTER TABLE users ADD COLUMN maintenance_mode BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN medication_stop_date DATE;
ALTER TABLE users ADD COLUMN goal_maintenance_weight DECIMAL;

CREATE TABLE maintenance_stats (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  week_number INTEGER,  -- Weeks since stopping medication
  habit_consistency_score INTEGER,
  weight_stability_score INTEGER,
  logging_consistency DECIMAL,
  created_at TIMESTAMP
);
```

**Why This Is Critical:**
- Current roadmap: ZERO features for users stopping medication
- 67% regain weight - this directly addresses that
- Medication is TEMPORARY, habits must be PERMANENT
- Users need different tracking when off medication

---

#### **Feature 4.4: Voice Note Support** (Moved from Phase 3)

**Priority:** P2
**Effort:** 2 days
(Brazilian cultural fit, but lower priority than habit/maintenance features)

---

### Weeks 9-10: Beta Testing

**Enhanced Beta Focus:**

**Test ALL Four Value Props:**
1. VP1 (Protect Muscle): % checking muscle score 3+/week
2. VP2 (Build Habits): % with 7-day protein streak, % creating habit template
3. VP3 (Understand Patterns): % viewing community insights
4. VP4 (Feel Supported): NPS, loneliness reduction survey

**Beta Metrics:**
- D7 retention >50%
- Habit template created by 40%+ (with 3+ weeks data)
- Community insights viewed by 50%+
- "Feel supported" score >4/5

**Beta Community:**
- WhatsApp group (30-50 users)
- Weekly AMAs
- Feature voting (prioritize based on value prop gaps)
- Early adopter badge

---

### Weeks 11-12: Iteration + Launch

**Week 11: Fixes & Polish**
- P0 bugs (blocking usage)
- UX issues (3+ users mention)
- Brazilian Portuguese refinements

**Week 12: Soft Launch**
- São Paulo/Rio focus
- Doctor partnerships (free premium for patients)
- WhatsApp group seeding
- PR launch announcement

---

### Phase 4 Success Criteria:

- ✅ Two-way sync working
- ✅ PDF reports generated for 30%+ users
- ✅ **Maintenance mode activated by beta users stopping medication**
- ✅ **Maintenance mode users maintaining weight (±2kg) at 80% rate**
- ✅ 30+ beta users recruited
- ✅ D7 retention >50%
- ✅ **All 4 value props validated in beta feedback**

---

## Updated Value Delivery Scorecard

### OLD ROADMAP:
| Value Prop | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Final |
|------------|---------|---------|---------|---------|-------|
| VP1: Protect Muscle | 40% | 70% | 90% | 95% | 95% |
| VP2: Build Habits | 20% | 30% | 50% | **60%** | **60%** ⚠️ |
| VP3: Understand Patterns | 30% | 60% | 80% | 95% | 95% |
| VP4: Feel Supported | 20% | 20% | 30% | **40%** | **40%** ⚠️ |

**Problems:**
- VP2 only 60% (missing habit template, maintenance mode)
- VP4 only 40% (community deferred too late)

### NEW ROADMAP:
| Value Prop | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Final |
|------------|---------|---------|---------|---------|-------|
| VP1: Protect Muscle | 40% | 80% | 95% | 100% | ✅✅✅ |
| VP2: Build Habits | 20% | 50% | 85% | **100%** | ✅✅✅ |
| VP3: Understand Patterns | 30% | 75% | 90% | 100% | ✅✅✅ |
| VP4: Feel Supported | 20% | 70% | 85% | **95%** | ✅✅✅ |

**Improvements:**
- VP2: +40% (habit template, maintenance mode, reflection framework)
- VP4: +55% (community insights in Phase 2, not Phase 4)
- ALL value props 95-100% by Phase 4
- Balanced delivery across phases

---

## Updated Success Metrics (90 Days)

### OLD METRICS:
```
- 500+ active users
- 40%+ D7 retention
- 60%+ hit protein goals 4+ days/week
- 70%+ achieve 7-day protein streak
- 50%+ unlock 3+ badges
- 30%+ generate PDF report
- 30% viral coefficient
- R$2,500 MRR
```

### NEW METRICS (Aligned with 4 VPs):

**VP1: PROTECT YOUR MUSCLE**
- 60%+ users hit protein goals 4+ days/week
- 70%+ achieve 7-day protein streak at least once
- Muscle score viewed 3+/week by 80%+ users
- Muscle risk score in "safe zone" (green) for 60%+ users

**VP2: BUILD LASTING HABITS** 🆕
- 50%+ create personal habit template (Week 5-6)
- 20%+ activate maintenance mode (beta users stopping)
- 60%+ complete weekly reflection prompts 2+ times
- 70%+ maintain logging consistency (4+ days/week)

**VP3: UNDERSTAND YOUR PATTERNS** 🆕
- 30%+ view community insights panel weekly
- 30%+ generate PDF report for doctor visit
- Pattern insights surfaced for 80%+ users
- Dosage insights available for 40%+ users

**VP4: FEEL SUPPORTED** 🆕
- NPS score >35
- "Feel supported" survey score >4/5
- Community insights viewed by 50%+ users
- 30% viral coefficient (share bot)

**Overall:**
- 500+ active WhatsApp conversations daily
- 50%+ D7 retention (WhatsApp-enhanced)
- R$2,500 MRR (85 paid at R$29.90/month)

---

## Implementation Priority

### MUST DO (P0):
1. ✅ Smart onboarding (Phase 1) - First impressions matter
2. ✅ Weekly reflection prompts (Phase 2) - Habit formation core
3. ✅ Community insights panel (Phase 2) - VP4 critically underserved
4. ✅ Habit template builder (Phase 3) - Prevents 67% weight regain
5. ✅ Maintenance mode (Phase 4) - Post-medication success

### SHOULD DO (P1):
6. Anonymous benchmarking algorithm (Phase 2)
7. Baseline pattern detection (Phase 1)

### NICE TO HAVE (P2):
8. Voice notes moved to Phase 4 (cultural fit, but not critical path)

---

## Next Steps for Integration

### Option 1: Integrate Now (Recommended)
Replace Phase sections in `strategic-roadmap.md` with detailed specs from this document

### Option 2: Staged Integration
1. Week 1: Integrate Phase 1 updates
2. Week 2: Integrate Phase 2 updates
3. Week 3: Integrate Phase 3-4 updates

### Option 3: Use as Reference
Keep this document as reference, update `strategic-roadmap.md` phases as you build

---

## Summary: What Changed and Why

### Features Added:
1. **Smart Onboarding** - Immediate value, education from Day 1
2. **Weekly Reflection Prompts** - Research-backed habit formation
3. **Community Insights Panel** - Address loneliness (53% feel it)
4. **Anonymous Benchmarking** - "Am I normal?" anxiety relief
5. **Habit Template Builder** - Prevent 67% weight regain
6. **Maintenance Mode** - Post-medication tracking and support

### Features Moved:
1. **Community Insights:** "Future" → Phase 2 (VP4 was 20% covered)
2. **Voice Notes:** Phase 3 → Phase 4 (nice-to-have, not critical)

### Why These Changes Matter:

**Research-Backed:**
- 67% regain 2/3 of weight after stopping GLP-1
- 53% feel lonely in health journey
- "Journaling creates habit template" for lifetime success
- 25-40% of weight loss is muscle (confirms VP1 focus)

**Value Prop Alignment:**
- OLD: VP2 (Habits) only 60%, VP4 (Support) only 40%
- NEW: ALL value props 95-100% by Phase 4

**User Impact:**
- Habit template = knowledge for life (not just 6-12 months)
- Maintenance mode = support beyond medication
- Community insights = reduce anxiety, feel normal
- Reflection framework = understand what works for YOU

---

**This roadmap now delivers on the CORE PROMISE:**

> "Zempi ensures GLP-1 weight loss is permanent - protecting muscle and building habits that last beyond medication."

**Not just tracking. Not just gamification. TRANSFORMATION.**

---

*End of Roadmap Updates v3.0*
