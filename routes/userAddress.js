import express from "express";
import Order from "../models/Order.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Place order (protected)
router.post("/place", authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!req.user.address || !req.user.phone) {
      return res.status(400).json({ error: "Address details missing" });
    }

    const order = new Order({
      userId: req.user._id,
      items,
      total,
    });

    await order.save();
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});



router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Me error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});


export default router;