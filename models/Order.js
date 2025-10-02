import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      imageUrl: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema);