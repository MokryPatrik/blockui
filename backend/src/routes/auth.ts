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

      // Find user
      const result = await pool.query(
        "SELECT id, email, password_hash, role FROM users WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = result.rows[0];

      // Verify password
      const passwordMatch = await verifyPassword(password, user.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if user has admin role
      if (user.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
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
