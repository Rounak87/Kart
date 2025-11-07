import express from 'express';
import auth from '../middleware/auth.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from '../controllers/cartController.js';

const router = express.Router();

// All cart routes require authentication
router.use(auth);

// GET /api/cart - Get user's cart
router.get('/', getCart);

// POST /api/cart - Add item to cart
router.post('/', addToCart);

// PATCH /api/cart/:id - Update cart item quantity
router.patch('/:id', updateCartItem);

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', removeFromCart);

export default router;
