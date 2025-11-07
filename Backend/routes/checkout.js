import express from 'express';
import auth from '../middleware/auth.js';
import { checkout } from '../controllers/checkoutController.js';

const router = express.Router();

// POST /api/checkout - Process checkout
router.post('/', auth, checkout);

export default router;
