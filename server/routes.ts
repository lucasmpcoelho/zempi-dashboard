import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserProfileSchema,
  insertMealSchema,
  insertMedicationDoseSchema,
  insertMoodEntrySchema,
  insertWeightEntrySchema
} from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize demo user if it doesn't exist
  const ensureDemoUser = async () => {
    try {
      const existingUser = await storage.getUser("demo-user-id");
      if (!existingUser) {
        await storage.createUser({
          id: "demo-user-id",
          username: "demo",
          password: "demo-password", // Dummy password for demo user
        });
        console.log("✓ Demo user created");
      }
    } catch (error) {
      console.error("Error ensuring demo user:", error);
    }
  };
  
  await ensureDemoUser();

  // User Routes
  app.get("/api/user", async (req, res) => {
    try {
      // Mock user ID for now (will be replaced with auth)
      const userId = "demo-user-id";

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const profile = await storage.getUserProfile(userId);

      res.json({
        id: user.id,
        username: user.username,
        profile
      });
    } catch (error: any) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // User Profile Routes
  app.get("/api/profile", async (req, res) => {
    try {
      // Mock user ID for now (will be replaced with auth)
      const userId = "demo-user-id";
      
      const profile = await storage.getUserProfile(userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      // For now, use demo-user-id. In the future, this will be req.user.id from auth
      const userId = "demo-user-id";
      
      const validation = insertUserProfileSchema.safeParse({
        ...req.body,
        userId // Inject the userId from server context
      });
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromError(validation.error).toString() 
        });
      }

      const profile = await storage.createUserProfile(validation.data);
      res.status(201).json(profile);
    } catch (error: any) {
      console.error("Error creating profile:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/profile", async (req, res) => {
    try {
      const userId = "demo-user-id";
      const profile = await storage.updateUserProfile(userId, req.body);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Meal Routes
  app.get("/api/meals", async (req, res) => {
    try {
      const userId = "demo-user-id";
      const date = req.query.date as string || new Date().toISOString().split('T')[0];
      
      const meals = await storage.getMealsByUserAndDate(userId, date);
      res.json(meals);
    } catch (error: any) {
      console.error("Error fetching meals:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/meals", async (req, res) => {
    try {
      const validation = insertMealSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromError(validation.error).toString() 
        });
      }

      const meal = await storage.createMeal(validation.data);
      res.status(201).json(meal);
    } catch (error: any) {
      console.error("Error creating meal:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Medication Dose Routes
  app.get("/api/medication-doses", async (req, res) => {
    try {
      const userId = "demo-user-id";
      const doses = await storage.getMedicationDoses(userId);
      res.json(doses);
    } catch (error: any) {
      console.error("Error fetching doses:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/medication-doses", async (req, res) => {
    try {
      const validation = insertMedicationDoseSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromError(validation.error).toString() 
        });
      }

      const dose = await storage.createMedicationDose(validation.data);
      res.status(201).json(dose);
    } catch (error: any) {
      console.error("Error creating dose:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/medication-doses/:id/complete", async (req, res) => {
    try {
      const { id } = req.params;
      const dose = await storage.markDoseComplete(id);
      
      if (!dose) {
        return res.status(404).json({ error: "Dose not found" });
      }
      
      res.json(dose);
    } catch (error: any) {
      console.error("Error completing dose:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Mood Entry Routes
  app.get("/api/mood-entries", async (req, res) => {
    try {
      const userId = "demo-user-id";
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 30;
      
      const entries = await storage.getMoodEntries(userId, limit);
      res.json(entries);
    } catch (error: any) {
      console.error("Error fetching mood entries:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/mood-entries", async (req, res) => {
    try {
      const validation = insertMoodEntrySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromError(validation.error).toString() 
        });
      }

      const entry = await storage.createMoodEntry(validation.data);
      res.status(201).json(entry);
    } catch (error: any) {
      console.error("Error creating mood entry:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Weight Entry Routes
  app.get("/api/weight-entries", async (req, res) => {
    try {
      const userId = "demo-user-id";
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

      const entries = await storage.getWeightEntries(userId, limit);
      res.json(entries);
    } catch (error: any) {
      console.error("Error fetching weight entries:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Alias for /api/weight (used by frontend)
  app.get("/api/weight", async (req, res) => {
    try {
      const userId = "demo-user-id";
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;

      // For now, return all entries and let frontend filter by date
      // TODO: Add date range filtering in storage layer
      const entries = await storage.getWeightEntries(userId, limit);
      res.json(entries);
    } catch (error: any) {
      console.error("Error fetching weight entries:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/weight-entries", async (req, res) => {
    try {
      const validation = insertWeightEntrySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromError(validation.error).toString() 
        });
      }

      const entry = await storage.createWeightEntry(validation.data);
      res.status(201).json(entry);
    } catch (error: any) {
      console.error("Error creating weight entry:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
