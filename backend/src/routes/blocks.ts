import { Router, Request, Response } from "express";
import { Pool } from "pg";
import { verifyToken } from "../utils/auth";

export function createBlocksRouter(pool: Pool) {
  const router = Router();

  // Middleware: Verify admin token for protected routes
  const requireAuth = (req: Request, res: Response, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const verified = verifyToken(token);
    if (!verified) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    (req as any).user = verified;
    next();
  };

  // GET /api/blocks - List all blocks with pagination
  router.get("/blocks", requireAuth, async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;
      const type = req.query.type as string;

      let query = "SELECT * FROM blocks";
      const params: any[] = [];

      if (type) {
        query += " WHERE type = $1";
        params.push(type);
      }

      query += " ORDER BY created_at DESC LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2);
      params.push(limit, offset);

      const result = await pool.query(query, params);

      // Get total count
      let countQuery = "SELECT COUNT(*) FROM blocks";
      if (type) {
        countQuery += " WHERE type = $1";
      }
      const countResult = await pool.query(countQuery, type ? [type] : []);
      const total = parseInt(countResult.rows[0].count);

      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching blocks:", error);
      res.status(500).json({ success: false, error: "Failed to fetch blocks" });
    }
  });

  // GET /api/blocks/:id - Get single block with data
  router.get("/blocks/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const blockResult = await pool.query("SELECT * FROM blocks WHERE id = $1", [id]);
      if (blockResult.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Block not found" });
      }

      const block = blockResult.rows[0];

      // Fetch block data
      const dataResult = await pool.query(
        "SELECT key, value FROM block_data WHERE block_id = $1",
        [id]
      );

      // Fetch version history
      const versionsResult = await pool.query(
        "SELECT * FROM block_versions WHERE block_id = $1 ORDER BY created_at DESC LIMIT 10",
        [id]
      );

      res.json({
        success: true,
        data: {
          ...block,
          blockData: dataResult.rows,
          versions: versionsResult.rows,
        },
      });
    } catch (error) {
      console.error("Error fetching block:", error);
      res.status(500).json({ success: false, error: "Failed to fetch block" });
    }
  });

  // POST /api/blocks - Create new block
  router.post("/blocks", requireAuth, async (req: Request, res: Response) => {
    try {
      const { name, type, config } = req.body;

      if (!name || !type || !config) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      // Validate type
      const validTypes = ["logo_carousel", "testimonials", "features"];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ success: false, error: "Invalid block type" });
      }

      const createdBy = (req as any).user?.email || "unknown";

      const result = await pool.query(
        `INSERT INTO blocks (name, type, config, created_by)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [name, type, config, createdBy]
      );

      // Create version record
      await pool.query(
        `INSERT INTO block_versions (block_id, config, change_description, created_by)
         VALUES ($1, $2, $3, $4)`,
        [result.rows[0].id, config, "Initial creation", createdBy]
      );

      res.status(201).json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error creating block:", error);
      res.status(500).json({ success: false, error: "Failed to create block" });
    }
  });

  // PUT /api/blocks/:id - Update block
  router.put("/blocks/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, config, isPublished } = req.body;

      // Check if block exists
      const existsResult = await pool.query("SELECT * FROM blocks WHERE id = $1", [id]);
      if (existsResult.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Block not found" });
      }

      const oldConfig = existsResult.rows[0].config;

      let updateQuery = "UPDATE blocks SET";
      const params: any[] = [];
      let paramIndex = 1;

      if (name !== undefined) {
        updateQuery += ` name = $${paramIndex}`;
        params.push(name);
        paramIndex++;
      }

      if (config !== undefined) {
        if (updateQuery.includes("SET")) updateQuery += ",";
        updateQuery += ` config = $${paramIndex}`;
        params.push(config);
        paramIndex++;
      }

      if (isPublished !== undefined) {
        if (updateQuery.includes("SET")) updateQuery += ",";
        updateQuery += ` is_published = $${paramIndex}`;
        params.push(isPublished);
        paramIndex++;
      }

      updateQuery += ` WHERE id = $${paramIndex} RETURNING *`;
      params.push(id);

      const result = await pool.query(updateQuery, params);

      // Create version record if config changed
      if (config && JSON.stringify(config) !== JSON.stringify(oldConfig)) {
        const createdBy = (req as any).user?.email || "unknown";
        await pool.query(
          `INSERT INTO block_versions (block_id, config, change_description, created_by)
           VALUES ($1, $2, $3, $4)`,
          [id, config, "Configuration updated", createdBy]
        );
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error updating block:", error);
      res.status(500).json({ success: false, error: "Failed to update block" });
    }
  });

  // DELETE /api/blocks/:id - Delete block
  router.delete("/blocks/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "DELETE FROM blocks WHERE id = $1 RETURNING id",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Block not found" });
      }

      res.json({
        success: true,
        message: "Block deleted successfully",
        data: { id },
      });
    } catch (error) {
      console.error("Error deleting block:", error);
      res.status(500).json({ success: false, error: "Failed to delete block" });
    }
  });

  // GET /api/blocks/types - List available block types
  router.get("/api/blocks/types", async (req: Request, res: Response) => {
    try {
      const types = [
        {
          id: "logo_carousel",
          name: "Logo Carousel",
          description: "Display logos in a scrollable carousel",
          icon: "images",
        },
        {
          id: "testimonials",
          name: "Testimonials",
          description: "Showcase customer testimonials and reviews",
          icon: "quote",
        },
        {
          id: "features",
          name: "Features",
          description: "Display product features or benefits",
          icon: "star",
        },
      ];

      res.json({
        success: true,
        data: types,
      });
    } catch (error) {
      console.error("Error fetching block types:", error);
      res.status(500).json({ success: false, error: "Failed to fetch block types" });
    }
  });

  // GET /api/block-templates - List available templates
  router.get("/block-templates", async (req: Request, res: Response) => {
    try {
      const type = req.query.type as string;
      let query = "SELECT * FROM block_templates";
      const params: any[] = [];

      if (type) {
        query += " WHERE type = $1";
        params.push(type);
      }

      query += " ORDER BY created_at DESC";

      const result = await pool.query(query, params);

      res.json({
        success: true,
        data: result.rows,
      });
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ success: false, error: "Failed to fetch templates" });
    }
  });

  // POST /api/blocks/:id/data - Add/update block data
  router.post("/blocks/:id/data", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { key, value } = req.body;

      if (!key) {
        return res.status(400).json({ success: false, error: "Key is required" });
      }

      const result = await pool.query(
        `INSERT INTO block_data (block_id, key, value)
         VALUES ($1, $2, $3)
         ON CONFLICT (block_id, key) DO UPDATE SET value = $3
         RETURNING *`,
        [id, key, value]
      );

      res.status(201).json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error saving block data:", error);
      res.status(500).json({ success: false, error: "Failed to save block data" });
    }
  });

  // GET /api/blocks/:id/versions - Get version history
  router.get("/blocks/:id/versions", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `SELECT * FROM block_versions WHERE block_id = $1 ORDER BY created_at DESC`,
        [id]
      );

      res.json({
        success: true,
        data: result.rows,
      });
    } catch (error) {
      console.error("Error fetching versions:", error);
      res.status(500).json({ success: false, error: "Failed to fetch versions" });
    }
  });

  // POST /api/blocks/:id/publish - Publish block
  router.post("/blocks/:id/publish", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `UPDATE blocks SET is_published = true WHERE id = $1 RETURNING *`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Block not found" });
      }

      res.json({
        success: true,
        message: "Block published successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error publishing block:", error);
      res.status(500).json({ success: false, error: "Failed to publish block" });
    }
  });

  // GET /embed/:blockId - Public embed endpoint (no auth required)
  router.get("/embed/:blockId", async (req: Request, res: Response) => {
    try {
      const { blockId } = req.params;

      const result = await pool.query(
        "SELECT * FROM blocks WHERE id = $1 AND is_published = true",
        [blockId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Block not found or not published" });
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error fetching embed:", error);
      res.status(500).json({ success: false, error: "Failed to fetch embed" });
    }
  });

  return router;
}
