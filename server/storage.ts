import { db } from "./db";
import {
  messages,
  type Project,
  type Insight,
  type InsertMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

// Hardcoding your data directly here so Vercel doesn't have to "find" files
const projectsData: Project[] = [
  {
    id: 1,
    title: "Human-Pose Estimation",
    description:
      "Real-time pose tracking system using computer vision and deep learning techniques to analyze human movement patterns with high precision.",
    imageUrl:
      "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=1000",
    tags: ["Python", "OpenCV"],
    category: "Visual Computing",
    featured: true,
    link: "https://github.com/HARSHIT-hash-07/Human-Pose-Estimation",
  },
  {
    id: 2,
    title: "Face-Recognition Door Lock",
    description:
      "Secure IoT-based access control system implementing FaceNet for biometric authentication on edge devices.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000",
    tags: ["OpenCV", "Arduino UNO", "HaarCascade"],
    category: "AI/ML",
    featured: true,
    link: "https://github.com/HARSHIT-hash-07/Face-Recognition-Based-Door-Lock",
  },
  {
    id: 3,
    title: "Autonomous AI Agents",
    description:
      "Framework for deploying autonomous agents capable of complex task planning and execution in dynamic environments.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    tags: ["Google ADK"],
    category: "AI Agents",
    featured: true,
    link: "https://github.com/HARSHIT-hash-07",
  },
];

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getInsights(): Promise<Insight[]>;
  getInsightBySlug(slug: string): Promise<Insight | undefined>;
  createMessage(message: InsertMessage): Promise<void>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return projectsData;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return projectsData.find((p) => p.id === id);
  }

  // Insights can be an empty array for now to keep it simple
  async getInsights(): Promise<Insight[]> {
    return [];
  }

  async getInsightBySlug(slug: string): Promise<Insight | undefined> {
    return undefined;
  }

  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }

  async seedData(): Promise<void> {
    console.log("Using hardcoded data. No file system or DB seeding needed.");
  }
}

export const storage = new DatabaseStorage();
