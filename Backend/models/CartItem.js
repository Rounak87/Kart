import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product is required'],
    },
    qty: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
