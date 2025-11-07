import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

const originalLog = console.log;
console.log = () => {};
dotenv.config();
console.log = originalLog;

const seedProducts = [
  {
    name: 'Oversized Graphic Hoodie',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'Streetwear',
    description: 'Cozy oversized hoodie with bold graphics, perfect for layering',
  },
  {
    name: 'Wide Leg Cargo Pants',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
    category: 'Bottoms',
    description: 'Trendy wide-leg cargo pants with multiple pockets',
  },
  {
    name: 'Cropped Puffer Jacket',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
    category: 'Outerwear',
    description: 'Y2K inspired cropped puffer jacket in vibrant colors',
  },
  {
    name: 'Vintage Band Tee',
    price: 799,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    category: 'Tops',
    description: 'Retro band t-shirt with distressed print',
  },
  {
    name: 'Mom Jeans - High Waist',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
    category: 'Bottoms',
    description: 'Classic mom jeans with high waist and relaxed fit',
  },
  {
    name: 'Chunky Platform Sneakers',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop',
    category: 'Footwear',
    description: 'Trendy chunky sneakers with platform sole',
  },
  {
    name: 'Mini Skirt - Pleated',
    price: 899,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop',
    category: 'Bottoms',
    description: 'Cute pleated mini skirt, perfect for any occasion',
  },
  {
    name: 'Crop Top - Ribbed',
    price: 599,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    category: 'Tops',
    description: 'Fitted ribbed crop top in neutral colors',
  },
  {
    name: 'Baggy Joggers',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517583010307-3f789911b89c?w=400&h=400&fit=crop',
    category: 'Bottoms',
    description: 'Comfortable baggy joggers for streetwear style',
  },
  {
    name: 'Bucket Hat',
    price: 499,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    category: 'Accessories',
    description: '90s inspired bucket hat in multiple colors',
  },
  {
    name: 'Denim Jacket - Oversized',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    category: 'Outerwear',
    description: 'Classic oversized denim jacket for layering',
  },
  {
    name: 'Corset Top',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&h=400&fit=crop',
    category: 'Tops',
    description: 'Trendy corset top with adjustable lacing',
  },
  {
    name: 'Track Pants - Striped',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop',
    category: 'Bottoms',
    description: 'Retro striped track pants for athleisure vibes',
  },
  {
    name: 'Chain Necklace - Layered',
    price: 699,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Accessories',
    description: 'Edgy layered chain necklace set',
  },
  {
    name: 'Bomber Jacket - Satin',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
    category: 'Outerwear',
    description: 'Shiny satin bomber jacket with embroidered patches',
  },
  {
    name: 'Cargo Shorts',
    price: 999,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
    category: 'Bottoms',
    description: 'Utility cargo shorts with functional pockets',
  },
  {
    name: 'Turtleneck - Cropped',
    price: 899,
    image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400&h=400&fit=crop',
    category: 'Tops',
    description: 'Minimal cropped turtleneck for layering',
  },
  {
    name: 'White Air Force 1s',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'Footwear',
    description: 'Classic white sneakers - Gen Z essential',
  },
  {
    name: 'Mini Backpack',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Accessories',
    description: 'Cute mini backpack for everyday essentials',
  },
  {
    name: 'Butterfly Top',
    price: 799,
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=400&fit=crop',
    category: 'Tops',
    description: 'Y2K butterfly print baby tee',
  },
  {
    name: 'Parachute Pants',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
    category: 'Bottoms',
    description: 'Trendy parachute pants with adjustable straps',
  },
  {
    name: 'Retro Sunglasses',
    price: 799,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
    category: 'Accessories',
    description: 'Vintage inspired oval sunglasses',
  },
  {
    name: 'Graphic Sweatshirt',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop',
    category: 'Streetwear',
    description: 'Oversized sweatshirt with bold typography',
  },
  {
    name: 'Platform Boots',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
    category: 'Footwear',
    description: 'Chunky platform boots for edgy style',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(seedProducts);
    console.log(`✅ Successfully seeded ${seedProducts.length} products!`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
