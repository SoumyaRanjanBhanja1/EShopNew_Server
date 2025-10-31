import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from './routes/payment.js';
import orderRoutes from './routes/order.js';
import order from "./routes/orderRoutes.js";





dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  "https://e-shop-new-9zbz.vercel.app/",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/orders", order);




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 10000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 10000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
