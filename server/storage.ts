import { db } from "./db";
import {
  messages,
  type Project,
  type Insight,
  type InsertMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";
import path from "path";
import { readFileSync } from "fs";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getInsights(): Promise<Insight[]>;
  getInsightBySlug(slug: string): Promise<Insight | undefined>;
  createMessage(message: InsertMessage): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  /**
   * Helper to read JSON files from the root /data folder.
   * process.cwd() is essential for Vercel to find the root directory.
   */
  private readJsonFile(fileName: string) {
    try {
      const filePath = path.join(process.cwd(), "data", fileName);
      const fileContent = readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading ${fileName} from ${process.cwd()}:`, error);
      return [];
    }
  }

  // Projects: Served dynamically from the root /data/projects.json
  async getProjects(): Promise<Project[]> {
    const data = this.readJsonFile("projects.json");
    return data as Project[];
  }

  async getProject(id: number): Promise<Project | undefined> {
    const data = this.readJsonFile("projects.json") as Project[];
    return data.find((p) => p.id === id);
  }

  // Insights: Served dynamically from the root /data/insights.json
  async getInsights(): Promise<Insight[]> {
    const data = this.readJsonFile("insights.json");
    return data as Insight[];
  }

  async getInsightBySlug(slug: string): Promise<Insight | undefined> {
    const data = this.readJsonFile("insights.json") as Insight[];
    return data.find((i) => i.slug === slug);
  }

  // Messages: Continues to use the live Neon PostgreSQL DB
  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }

  async seedData(): Promise<void> {
    console.log(
      "Static data loaded via FS. Database seeding skipped for Vercel compatibility."
    );
  }
}

export const storage = new DatabaseStorage();
