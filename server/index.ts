import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create the server instance
const httpServer = createServer(app);

// Simple logging helper
export function log(message: string) {
  console.log(`${new Date().toLocaleTimeString()} [express] ${message}`);
}

(async () => {
  // 1. Register API routes first
  await registerRoutes(httpServer, app);

  // 2. Error handling
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  });

  // 3. Setup Frontend
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    // This is what makes your localhost:3001 work exactly as before
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // 4. Start the listener for LOCAL development
  // We use the VERCEL env check to avoid interfering with production
  if (process.env.VERCEL !== "1") {
    const port = parseInt(process.env.PORT || "3001", 10);
    const host = process.env.HOST || "127.0.0.1";

    httpServer.listen(
      {
        port,
        host,
      },
      () => {
        log(`serving on http://${host}:${port}`);
      }
    );
  }
})();

// 5. THE "MAGIC" LINE: Export for Vercel
// This allows Vercel to bypass the listener and use the app directly in the cloud.
export default app;
