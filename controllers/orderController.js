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

// GET all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// CREATE order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

// UPDATE order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
};

// DELETE order
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};
