import { db } from "./db";
import {
  messages,
  type Project,
  type Insight,
  type InsertMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

/**
 * CLEANUP NOTE:
 * We are keeping the interface for compatibility, but since projects
 * are now hardcoded in the frontend, these methods return empty/null
 * to avoid technical debt.
 */

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getInsights(): Promise<Insight[]>;
  getInsightBySlug(slug: string): Promise<Insight | undefined>;
  createMessage(message: InsertMessage): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Frontend handles projects now; returning empty to keep things clean
  async getProjects(): Promise<Project[]> {
    return [];
  }

  async getProject(id: number): Promise<Project | undefined> {
    return undefined;
  }

  async getInsights(): Promise<Insight[]> {
    return [];
  }

  async getInsightBySlug(slug: string): Promise<Insight | undefined> {
    return undefined;
  }

  // Keep this for your Contact Form / Messages
  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }

  async seedData(): Promise<void> {
    console.log("Cleanup: Storage initialized without project seeding.");
  }
}

export const storage = new DatabaseStorage();
