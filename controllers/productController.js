import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    const regex = new RegExp(name, 'i'); // case-insensitive partial match
    const products = await Product.find({ name: regex });
    res.json(products);
  } catch (error) {
    console.error('❌ Product search error:', error.message);
    res.status(500).json({ error: 'Failed to search products' });
  }
};


export const createProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const imageUrl = req.file.path; // Cloudinary returns full URL
  const product = await Product.create({ name, description, price, quantity, imageUrl });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};