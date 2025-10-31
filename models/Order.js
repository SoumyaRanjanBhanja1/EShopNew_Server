// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   items: [
//     {
//       productId: String,
//       name: String,
//       imageUrl: String,
//       price: Number,
//       quantity: Number,
//     },
//   ],
//   total: Number,
//   status: {
//     type: String,
//     default: 'Pending',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model('Order', orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // allow guest checkout
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        imageUrl: { type: String },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Failed"],
      default: "Unpaid",
    },
    // Razorpay fields
    razorpayOrderId: { type: String },
    paymentId: { type: String },
    signature: { type: String },
    // Stripe fields
    stripeSessionId: { type: String },
    stripePaymentIntent: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);