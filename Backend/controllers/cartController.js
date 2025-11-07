import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.userId }).populate('product').lean();
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

    res.status(200).json({
      success: true,
      count: cartItems.length,
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, error: 'Server error while fetching cart' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, error: 'Product ID is required' });
    }

    if (qty < 1) {
      return res.status(400).json({ success: false, error: 'Quantity must be at least 1' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    let cartItem = await CartItem.findOne({ user: req.userId, product: productId });

    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ user: req.userId, product: productId, qty });
    }

    const populatedItem = await CartItem.findById(cartItem._id).populate('product');
    res.status(201).json({ success: true, cartItem: populatedItem });
  } catch (error) {
    console.error('Add to cart error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Item already in cart' });
    }
    res.status(500).json({ success: false, error: 'Server error while adding to cart' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;

    if (!qty || qty < 1) {
      return res.status(400).json({ success: false, error: 'Valid quantity is required (minimum 1)' });
    }

    const cartItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { qty },
      { new: true, runValidators: true }
    ).populate('product');

    if (!cartItem) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ success: false, error: 'Server error while updating cart item' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!cartItem) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, error: 'Server error while removing from cart' });
  }
};
