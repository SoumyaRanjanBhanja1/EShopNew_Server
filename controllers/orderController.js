import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0 || !total) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const order = new Order({
      items,
      total,
      userId: req.userId,
    });

    await order.save();
    res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    console.error('❌ Order save error:', error.message);
    res.status(500).json({ error: 'Failed to save order' });
  }
};

