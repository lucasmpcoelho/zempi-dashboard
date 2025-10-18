import { 
  type User, 
  type InsertUser,
  type UserProfile,
  type InsertUserProfile,
  type Meal,
  type InsertMeal,
  type MedicationDose,
  type InsertMedicationDose,
  type MoodEntry,
  type InsertMoodEntry,
  type WeightEntry,
  type InsertWeightEntry,
  users,
  userProfiles,
  meals,
  medicationDoses,
  moodEntries,
  weightEntries
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Profile methods
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  
  // Meal methods
  getMealsByUserAndDate(userId: string, date: string): Promise<Meal[]>;
  createMeal(meal: InsertMeal): Promise<Meal>;
  
  // Medication methods
  getMedicationDoses(userId: string): Promise<MedicationDose[]>;
  createMedicationDose(dose: InsertMedicationDose): Promise<MedicationDose>;
  markDoseComplete(doseId: string): Promise<MedicationDose | undefined>;
  
  // Mood methods
  getMoodEntries(userId: string, limit?: number): Promise<MoodEntry[]>;
  createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry>;
  
  // Weight methods
  getWeightEntries(userId: string, limit?: number): Promise<WeightEntry[]>;
  createWeightEntry(entry: InsertWeightEntry): Promise<WeightEntry>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Profile methods
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .orderBy(desc(userProfiles.createdAt))
      .limit(1);
    return profile || undefined;
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [createdProfile] = await db
      .insert(userProfiles)
      .values({
        ...profile,
        foodPreferences: profile.foodPreferences || [],
        comorbidities: profile.comorbidities || [],
      } as any)
      .returning();
    return createdProfile;
  }

  async updateUserProfile(userId: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const updateData: any = { ...profile, updatedAt: sql`now()` };
    const [updated] = await db
      .update(userProfiles)
      .set(updateData)
      .where(eq(userProfiles.userId, userId))
      .returning();
    return updated || undefined;
  }

  // Meal methods
  async getMealsByUserAndDate(userId: string, date: string): Promise<Meal[]> {
    return await db
      .select()
      .from(meals)
      .where(and(eq(meals.userId, userId), eq(meals.date, date)))
      .orderBy(meals.time);
  }

  async createMeal(meal: InsertMeal): Promise<Meal> {
    const [created] = await db
      .insert(meals)
      .values(meal)
      .returning();
    return created;
  }

  // Medication methods
  async getMedicationDoses(userId: string): Promise<MedicationDose[]> {
    return await db
      .select()
      .from(medicationDoses)
      .where(eq(medicationDoses.userId, userId))
      .orderBy(desc(medicationDoses.scheduledDate))
      .limit(30);
  }

  async createMedicationDose(dose: InsertMedicationDose): Promise<MedicationDose> {
    const [created] = await db
      .insert(medicationDoses)
      .values(dose)
      .returning();
    return created;
  }

  async markDoseComplete(doseId: string): Promise<MedicationDose | undefined> {
    const [updated] = await db
      .update(medicationDoses)
      .set({ completed: 1, completedAt: sql`now()` })
      .where(eq(medicationDoses.id, doseId))
      .returning();
    return updated || undefined;
  }

  // Mood methods
  async getMoodEntries(userId: string, limit: number = 30): Promise<MoodEntry[]> {
    return await db
      .select()
      .from(moodEntries)
      .where(eq(moodEntries.userId, userId))
      .orderBy(desc(moodEntries.date))
      .limit(limit);
  }

  async createMoodEntry(entry: InsertMoodEntry): Promise<MoodEntry> {
    const [created] = await db
      .insert(moodEntries)
      .values({
        ...entry,
        symptoms: entry.symptoms || [],
      } as any)
      .returning();
    return created;
  }

  // Weight methods
  async getWeightEntries(userId: string, limit: number = 50): Promise<WeightEntry[]> {
    return await db
      .select()
      .from(weightEntries)
      .where(eq(weightEntries.userId, userId))
      .orderBy(desc(weightEntries.date))
      .limit(limit);
  }

  async createWeightEntry(entry: InsertWeightEntry): Promise<WeightEntry> {
    const [created] = await db
      .insert(weightEntries)
      .values(entry)
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
