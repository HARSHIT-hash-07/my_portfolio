import { db } from "./db";
import {
  projects,
  insights,
  messages,
  type Project,
  type Insight,
  type InsertMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

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
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getInsights(): Promise<Insight[]> {
    return await db.select().from(insights);
  }

  async getInsightBySlug(slug: string): Promise<Insight | undefined> {
    const [insight] = await db.select().from(insights).where(eq(insights.slug, slug));
    return insight;
  }

  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }

  async seedData(): Promise<void> {
    const existingProjects = await this.getProjects();
    if (existingProjects.length === 0) {
      await db.insert(projects).values([
        {
          title: "Human-Pose Estimation",
          description: "Real-time pose tracking system using computer vision and deep learning techniques to analyze human movement patterns with high precision.",
          imageUrl: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=1000",
          tags: ["Python", "OpenCV", "PyTorch"],
          category: "AI/ML",
          featured: true,
          link: "#"
        },
        {
          title: "Face-Recognition Door Lock",
          description: "Secure IoT-based access control system implementing FaceNet for biometric authentication on edge devices.",
          imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1000",
          tags: ["IoT", "Raspberry Pi", "FaceNet"],
          category: "AI/ML",
          featured: true,
          link: "#"
        },
        {
          title: "Autonomous AI Agents",
          description: "Framework for deploying autonomous agents capable of complex task planning and execution in dynamic environments.",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
          tags: ["LLMs", "LangChain", "Multi-Agent Systems"],
          category: "AI Agents",
          featured: true,
          link: "#"
        },
        {
          title: "Digital Logic Simulator",
          description: "Interactive educational tool for designing and simulating complex digital logic circuits.",
          imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
          tags: ["C++", "Verilog", "WebAssembly"],
          category: "Digital Logic",
          featured: false,
          link: "#"
        }
      ]);

      await db.insert(insights).values([
        {
          title: "My Journey at Google STEP",
          summary: "Reflecting on my intensive internship experience, learning scalable engineering practices, and contributing to core products.",
          content: "Full content about the Google STEP experience...",
          slug: "google-step-journey",
          readTime: "5 min read"
        },
        {
          title: "Microsoft Explore: A New Perspective",
          summary: "How exploring different engineering roles at Microsoft shaped my understanding of the software development lifecycle.",
          content: "Full content about the Microsoft Explore experience...",
          slug: "microsoft-explore",
          readTime: "4 min read"
        }
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
