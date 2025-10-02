import express from "express";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin Dashboard Route
router.get("/", verifyAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Welcome to Admin Dashboard (Admin Protected Route)",
    user: {
      id: req.user.id,
      role: req.user.role,
      email: req.user.email,
    },
  });
});

export default router;