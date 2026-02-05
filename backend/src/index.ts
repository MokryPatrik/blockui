import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import { createAuthRouter } from "./routes/auth";
import { createBlocksRouter } from "./routes/blocks";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

// Health check
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.json({ status: "ok", database: "connected", timestamp: new Date().toISOString() });
  } catch (error) {
    // Database not available yet, but API is running
    res.status(200).json({ 
      status: "ok", 
      database: "pending", 
      message: "API is running, waiting for database configuration",
      timestamp: new Date().toISOString() 
    });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "BlockUI Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      admin: {
        login: "POST /admin/login",
        verify: "POST /admin/verify",
        me: "GET /admin/me",
      },
      blocks: {
        list: "GET /api/blocks",
        get: "GET /api/blocks/:id",
        create: "POST /api/blocks",
        update: "PUT /api/blocks/:id",
        delete: "DELETE /api/blocks/:id",
        publish: "POST /api/blocks/:id/publish",
        types: "GET /api/blocks/types",
        templates: "GET /api/block-templates",
        versions: "GET /api/blocks/:id/versions",
      },
      embed: {
        get: "GET /embed/:blockId (public, no auth required)",
      },
    },
  });
});

// Mount auth routes
app.use("/", createAuthRouter(pool));

// Mount block routes
app.use("/api", createBlocksRouter(pool));

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});
