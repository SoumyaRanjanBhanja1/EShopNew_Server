// backend/routes/orderRoutes.js
import express from "express";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// GET all orders
router.get("/", getOrders);

// POST create new order
router.post("/", createOrder);

// PUT update order
router.put("/:id", updateOrder);

// DELETE order
router.delete("/:id", deleteOrder);

export default router;