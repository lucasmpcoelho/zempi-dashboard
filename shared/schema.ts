import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// User Profile table (dados do onboarding)
export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  medication: text("medication").notNull(),
  height: integer("height").notNull(), // em cm
  weight: real("weight").notNull(), // em kg
  targetWeight: real("target_weight").notNull(), // em kg
  treatmentStartDate: date("treatment_start_date").notNull(),
  dose: text("dose").notNull(),
  bodyType: text("body_type").notNull(),
  foodPreferences: jsonb("food_preferences").$type<string[]>().notNull().default([]),
  comorbidities: jsonb("comorbidities").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  foodPreferences: z.array(z.string()).optional().default([]),
  comorbidities: z.array(z.string()).optional().default([]),
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Meals table
export const meals = pgTable("meals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  calories: integer("calories").notNull(),
  protein: real("protein"), // em gramas
  carbs: real("carbs"), // em gramas
  fats: real("fats"), // em gramas
  time: text("time").notNull(), // HH:MM
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMealSchema = createInsertSchema(meals).omit({
  id: true,
  createdAt: true,
});

export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = typeof meals.$inferSelect;

// Medication Doses table
export const medicationDoses = pgTable("medication_doses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  dose: text("dose").notNull(),
  scheduledDate: date("scheduled_date").notNull(),
  completed: integer("completed").notNull().default(0), // 0 = false, 1 = true
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMedicationDoseSchema = createInsertSchema(medicationDoses).omit({
  id: true,
  createdAt: true,
});

export type InsertMedicationDose = z.infer<typeof insertMedicationDoseSchema>;
export type MedicationDose = typeof medicationDoses.$inferSelect;

// Mood Entries table
export const moodEntries = pgTable("mood_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  mood: text("mood").notNull(), // "good" | "neutral" | "bad"
  symptoms: jsonb("symptoms").$type<string[]>().notNull().default([]),
  notes: text("notes"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMoodEntrySchema = createInsertSchema(moodEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertMoodEntry = z.infer<typeof insertMoodEntrySchema>;
export type MoodEntry = typeof moodEntries.$inferSelect;

// Weight Tracking table
export const weightEntries = pgTable("weight_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  weight: real("weight").notNull(), // em kg
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWeightEntrySchema = createInsertSchema(weightEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertWeightEntry = z.infer<typeof insertWeightEntrySchema>;
export type WeightEntry = typeof weightEntries.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  meals: many(meals),
  medicationDoses: many(medicationDoses),
  moodEntries: many(moodEntries),
  weightEntries: many(weightEntries),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const mealsRelations = relations(meals, ({ one }) => ({
  user: one(users, {
    fields: [meals.userId],
    references: [users.id],
  }),
}));

export const medicationDosesRelations = relations(medicationDoses, ({ one }) => ({
  user: one(users, {
    fields: [medicationDoses.userId],
    references: [users.id],
  }),
}));

export const moodEntriesRelations = relations(moodEntries, ({ one }) => ({
  user: one(users, {
    fields: [moodEntries.userId],
    references: [users.id],
  }),
}));

export const weightEntriesRelations = relations(weightEntries, ({ one }) => ({
  user: one(users, {
    fields: [weightEntries.userId],
    references: [users.id],
  }),
}));
