import { db } from "./db";
import {
  messages,
  type Project,
  type Insight,
  type InsertMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";
// Import both JSON data files
// Replace the old imports with these
import projectsData from "../data/projects.json";
import insightsData from "../data/insights.json";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getInsights(): Promise<Insight[]>;
  getInsightBySlug(slug: string): Promise<Insight | undefined>;
  createMessage(message: InsertMessage): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Projects: Now served from JSON
  async getProjects(): Promise<Project[]> {
    return projectsData as Project[];
  }

  async getProject(id: number): Promise<Project | undefined> {
    return (projectsData as Project[]).find((p) => p.id === id);
  }

  // Insights: Now served from JSON for Vercel permanence
  async getInsights(): Promise<Insight[]> {
    return insightsData as Insight[];
  }

  async getInsightBySlug(slug: string): Promise<Insight | undefined> {
    return (insightsData as Insight[]).find((i) => i.slug === slug);
  }

  // Messages: Still uses DB (Will reset on Vercel restart, which is fine for a portfolio)
  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }

  async seedData(): Promise<void> {
    // seedData is now empty because all public data is in JSON files
    // This prevents errors on Vercel's read-only file system
    console.log("Static data loaded from JSON. Database seeding skipped.");
  }
}

export const storage = new DatabaseStorage();
