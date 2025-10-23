import "dotenv/config";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import {
  users,
  userProfiles,
  meals,
  weightEntries,
  moodEntries,
  medicationDoses
} from "@shared/schema";
import { format, subDays, addDays } from "date-fns";

const DEMO_USER = {
  username: "demo@glp1.com",
  name: "Maria Silva"
};

async function seed() {
  console.log("🌱 Starting seed...\n");

  try {
    // 1. Find any existing user (not necessarily demo)
    console.log("👤 Finding existing user...");
    let allUsers = await db.query.users.findMany();

    if (allUsers.length === 0) {
      console.log("❌ No users found. Please create an account first:");
      console.log("   1. Go to http://localhost:3000");
      console.log("   2. Complete the onboarding");
      console.log("   3. Run 'npm run seed' again");
      process.exit(1);
    }

    // Use the first user found
    const user = allUsers[0];
    console.log(`✅ Found user: ${user.username}\n`);

    // Get user profile
    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, user.id)
    });

    if (!profile) {
      console.log("❌ User profile not found. Please complete onboarding first.");
      process.exit(1);
    }

    const currentWeight = 88; // kg atual para os cálculos
    const initialWeight = profile.weight; // peso inicial do perfil

    // 2. Clear existing data
    console.log("🗑️  Clearing existing seed data...");
    await db.delete(meals).where(eq(meals.userId, user.id));
    await db.delete(weightEntries).where(eq(weightEntries.userId, user.id));
    await db.delete(moodEntries).where(eq(moodEntries.userId, user.id));
    await db.delete(medicationDoses).where(eq(medicationDoses.userId, user.id));
    console.log("✅ Cleared old data\n");

    // 3. Generate weight entries (últimos 30 dias)
    console.log("⚖️  Generating weight entries...");
    const weightData: any[] = [];
    const startWeight = initialWeight; // ex: 95kg
    const endWeight = currentWeight; // ex: 88kg
    const totalDays = 30;

    for (let i = 0; i < totalDays; i++) {
      const date = format(subDays(new Date(), totalDays - i - 1), 'yyyy-MM-dd');

      // Tendência descendente com flutuação natural
      const progress = i / (totalDays - 1);
      const baseWeight = startWeight - (startWeight - endWeight) * progress;
      const fluctuation = (Math.random() - 0.5) * 0.6; // ±0.3kg
      const weight = Number((baseWeight + fluctuation).toFixed(1));

      weightData.push({
        userId: user.id,
        weight,
        date
      });
    }

    await db.insert(weightEntries).values(weightData);
    console.log(`✅ Created ${weightData.length} weight entries\n`);

    // 4. Generate meals (últimos 30 dias)
    console.log("🍽️  Generating meals...");
    const mealData: any[] = [];
    const mealNames = {
      breakfast: [
        "Ovos mexidos com whey",
        "Omelete de claras",
        "Iogurte grego com granola",
        "Tapioca com queijo cottage",
        "Panqueca de banana"
      ],
      lunch: [
        "Frango grelhado com batata doce",
        "Salmão com legumes",
        "Carne magra com arroz integral",
        "Peixe com quinoa",
        "Peito de peru com salada"
      ],
      snack: [
        "Whey protein",
        "Barrinha de proteína",
        "Castanhas e queijo",
        "Iogurte com frutas",
        "Sanduíche natural"
      ],
      dinner: [
        "Tilápia grelhada",
        "Frango com legumes",
        "Omelete com salada",
        "Carne moída com abobrinha",
        "Peixe assado"
      ]
    };

    for (let i = 0; i < totalDays; i++) {
      const date = format(subDays(new Date(), totalDays - i - 1), 'yyyy-MM-dd');
      const dayOfWeek = subDays(new Date(), totalDays - i - 1).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Proteína varia: finais de semana geralmente pior
      const proteinMultiplier = isWeekend ? 0.7 : (Math.random() > 0.3 ? 1.0 : 0.85);

      // Café da manhã (7h-9h)
      const breakfastProtein = Math.round((20 + Math.random() * 15) * proteinMultiplier);
      mealData.push({
        userId: user.id,
        name: mealNames.breakfast[Math.floor(Math.random() * mealNames.breakfast.length)],
        calories: Math.round(breakfastProtein * 4 + 150),
        protein: breakfastProtein,
        carbs: Math.round(20 + Math.random() * 30),
        fats: Math.round(5 + Math.random() * 15),
        time: `0${7 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        date
      });

      // Almoço (12h-14h)
      const lunchProtein = Math.round((35 + Math.random() * 10) * proteinMultiplier);
      mealData.push({
        userId: user.id,
        name: mealNames.lunch[Math.floor(Math.random() * mealNames.lunch.length)],
        calories: Math.round(lunchProtein * 4 + 200),
        protein: lunchProtein,
        carbs: Math.round(40 + Math.random() * 30),
        fats: Math.round(10 + Math.random() * 15),
        time: `${12 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        date
      });

      // Lanche (16h-17h) - nem sempre
      if (Math.random() > 0.3) {
        const snackProtein = Math.round((15 + Math.random() * 10) * proteinMultiplier);
        mealData.push({
          userId: user.id,
          name: mealNames.snack[Math.floor(Math.random() * mealNames.snack.length)],
          calories: Math.round(snackProtein * 4 + 100),
          protein: snackProtein,
          carbs: Math.round(10 + Math.random() * 20),
          fats: Math.round(5 + Math.random() * 10),
          time: `16:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          date
        });
      }

      // Jantar (19h-21h)
      const dinnerProtein = Math.round((30 + Math.random() * 10) * proteinMultiplier);
      mealData.push({
        userId: user.id,
        name: mealNames.dinner[Math.floor(Math.random() * mealNames.dinner.length)],
        calories: Math.round(dinnerProtein * 4 + 150),
        protein: dinnerProtein,
        carbs: Math.round(25 + Math.random() * 25),
        fats: Math.round(8 + Math.random() * 12),
        time: `${19 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        date
      });
    }

    await db.insert(meals).values(mealData);
    console.log(`✅ Created ${mealData.length} meals\n`);

    // 5. Generate mood entries (últimos 14 dias)
    console.log("😊 Generating mood entries...");
    const moodData: any[] = [];
    const symptoms = ["Náusea leve", "Fadiga", "Dor de cabeça", "Gases", "Sem apetite"];
    const moods: ("good" | "neutral" | "bad")[] = ["good", "neutral", "bad"];

    for (let i = 0; i < 14; i++) {
      const date = format(subDays(new Date(), 14 - i - 1), 'yyyy-MM-dd');
      const mood = moods[Math.floor(Math.random() * moods.length)];

      // Dias ruins têm mais sintomas
      const symptomCount = mood === "bad" ? 2 : mood === "neutral" ? 1 : 0;
      const daySymptoms = [];
      for (let j = 0; j < symptomCount; j++) {
        const symptom = symptoms[Math.floor(Math.random() * symptoms.length)];
        if (!daySymptoms.includes(symptom)) {
          daySymptoms.push(symptom);
        }
      }

      moodData.push({
        userId: user.id,
        mood,
        symptoms: daySymptoms,
        notes: mood === "bad" ? "Me senti mal hoje" : null,
        date
      });
    }

    await db.insert(moodEntries).values(moodData);
    console.log(`✅ Created ${moodData.length} mood entries\n`);

    // 6. Generate medication doses (7 passadas + 7 futuras)
    console.log("💉 Generating medication doses...");
    const doseData: any[] = [];
    const dose = profile.dose; // ex: "1.0mg"

    // 7 doses passadas (completadas)
    for (let i = 1; i <= 7; i++) {
      const scheduledDate = format(subDays(new Date(), i * 7), 'yyyy-MM-dd');
      doseData.push({
        userId: user.id,
        dose,
        scheduledDate,
        completed: 1,
        completedAt: new Date(subDays(new Date(), i * 7))
      });
    }

    // 7 doses futuras (pendentes)
    for (let i = 0; i < 7; i++) {
      const scheduledDate = format(addDays(new Date(), i * 7), 'yyyy-MM-dd');
      doseData.push({
        userId: user.id,
        dose,
        scheduledDate,
        completed: 0,
        completedAt: null
      });
    }

    await db.insert(medicationDoses).values(doseData);
    console.log(`✅ Created ${doseData.length} medication doses\n`);

    // 7. Summary
    console.log("✨ Seed completed successfully!\n");
    console.log("📊 Summary:");
    console.log(`   Weight entries: ${weightData.length}`);
    console.log(`   Meals: ${mealData.length}`);
    console.log(`   Mood entries: ${moodData.length}`);
    console.log(`   Medication doses: ${doseData.length}`);
    console.log("\n🎉 Your dashboard is now populated with demo data!");
    console.log("   Open http://localhost:3000 to see the results\n");

  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
