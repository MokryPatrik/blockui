import { Router } from "express";
import { Pool } from "pg";
import {
  generateToken,
  verifyPassword,
  authenticateToken,
  requireAdmin,
  AuthRequest,
} from "../utils/auth";

const router = Router();

export function createAuthRouter(pool: Pool) {
  /**
   * POST /admin/login
   * Login with email and password
   */
  router.post("/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // Hardcoded admin user for MVP (remove when database is ready)
      const adminEmail = "admin@blockui.local";
      const adminPassword = "blockui123";

      if (email !== adminEmail) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (password !== adminPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate token
      const token = generateToken({
        userId: "admin-001",
        email: email,
        role: "admin",
      });

      res.json({
        success: true,
        token,
        user: {
          id: "admin-001",
          email: email,
          role: "admin",
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * POST /admin/verify
   * Verify token
   */
  router.post("/admin/verify", authenticateToken, (req: AuthRequest, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  });

  /**
   * GET /admin/me
   * Get current user info
   */
  router.get(
    "/admin/me",
    authenticateToken,
    requireAdmin,
    (req: AuthRequest, res) => {
      res.json({
        success: true,
        user: req.user,
      });
    }
  );

  return router;
}
