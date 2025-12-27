import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array().notNull(),
  link: text("link"),
  category: text("category").notNull(), // 'AI/ML', 'Competitive Programming', 'Digital Logic', 'AI Agents'
  featured: boolean("featured").default(false),
});

export const insights = pgTable("insights", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),
  publishedAt: timestamp("published_at").defaultNow(),
  readTime: text("read_time").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertInsightSchema = createInsertSchema(insights).omit({ id: true, publishedAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Project = typeof projects.$inferSelect;
export type Insight = typeof insights.$inferSelect;
export type Message = typeof messages.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
