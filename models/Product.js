import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  imageUrl: String,
});

export default mongoose.model('Product', productSchema);