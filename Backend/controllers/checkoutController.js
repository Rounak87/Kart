import CartItem from '../models/CartItem.js';
import Order from '../models/Order.js';

export const checkout = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const cartItems = await CartItem.find({ user: req.userId }).populate('product').lean();

    if (!cartItems.length) {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.product._id.toString(),
      name: item.product.name,
      price: item.product.price,
      qty: item.qty,
      image: item.product.image,
    }));

    const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const order = await Order.create({
      user: req.userId,
      items: orderItems,
      total: parseFloat(total.toFixed(2)),
      name,
      email,
    });

    await CartItem.deleteMany({ user: req.userId });

    res.status(201).json({
      success: true,
      receipt: {
        id: order._id,
        total: order.total,
        items: order.items,
        name: order.name,
        email: order.email,
        timestamp: order.createdAt,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ success: false, error: 'Server error during checkout' });
  }
};
