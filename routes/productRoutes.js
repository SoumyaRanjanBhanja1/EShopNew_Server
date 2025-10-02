import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';
import { searchProducts } from '../controllers/productController.js';



const router = express.Router();
const upload = multer({ storage });

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/search', searchProducts); // ✅ Add this



// CREATE product
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const imageUrl = req.file?.path;
  const product = await Product.create({ name, description, price, quantity, imageUrl });
  res.json(product);
});

// UPDATE product
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const updateData = { name, description, price, quantity };
  if (req.file) updateData.imageUrl = req.file.path;
  const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updated);
});

// DELETE product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;