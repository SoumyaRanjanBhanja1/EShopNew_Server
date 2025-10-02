import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected Checkout Route
router.get("/checkout", verifyUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Welcome to Checkout (User Protected Route)",
    user: {
      id: req.user.id,
      role: req.user.role,
      email: req.user.email,
    },
  });
});

export default router;