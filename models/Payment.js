import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  verified: Boolean,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Payment', paymentSchema);
