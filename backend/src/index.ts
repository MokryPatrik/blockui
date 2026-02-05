import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import { createAuthRouter } from "./routes/auth";

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
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "BlockUI Backend API",
    version: "0.1.0",
    endpoints: {
      health: "/health",
      admin: {
        login: "POST /admin/login",
        verify: "POST /admin/verify",
        me: "GET /admin/me",
      },
    },
  });
});

// Mount auth routes
app.use("/", createAuthRouter(pool));

// TODO: Add routes
// - GET/POST /admin/blocks
// - GET /embed/:blockId (public)

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});
