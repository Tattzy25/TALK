import express from "express";
import cors from "cors";
import path from "path";
import { handleProcessAudio } from "./routes/bridgit";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve audio files
  app.use("/audio", express.static(path.join(__dirname, "../audio")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  // Remove demo route
  // app.get("/api/demo", handleDemo);

  // BRIDGIT_AI_ endpoint
  app.post("/api/BRIDGIT_AI_/process-audio", handleProcessAudio);

  return app;
}
