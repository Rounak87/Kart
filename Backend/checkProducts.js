import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const originalLog = console.log;
console.log = () => {};
dotenv.config();
console.log = originalLog;

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const count = await Product.countDocuments();
    console.log(`📦 Total products in database: ${count}`);
    
    if (count > 0) {
      const products = await Product.find().select('name price');
      console.log('\nProducts:');
      products.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} - $${p.price}`);
      });
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Done');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkProducts();
