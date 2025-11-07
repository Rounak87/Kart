# 🛒 KART - Full Stack E-Commerce Cart Application

<div align="center">

![KART Logo](https://img.shields.io/badge/KART-E--Commerce-ff6b6b?style=for-the-badge&logo=shopping-cart&logoColor=white)

**A Modern, Responsive Shopping Cart Application Built with MERN Stack**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup](#-installation--setup) • [API Documentation](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Bonus Features Implemented](#-bonus-features-implemented)
- [Demo Video](#-demo-video)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🎯 Overview

**KART** is a fully functional e-commerce shopping cart application. This project demonstrates proficiency in full-stack development, covering frontend UI/UX, backend REST APIs, database integration, and real-world e-commerce workflows.

The application features a curated collection of **24 Gen Z streetwear products**, complete authentication flow, persistent cart management, and email order confirmations. It showcases modern web development practices with a focus on responsive design and user experience.

---

## ✨ Features

### Core Requirements ✅

- **Product Catalog**
  - Grid display of 24 Gen Z fashion products
  - Pagination (8 products per page)
  - Category badges and product descriptions
  - Prices in Indian Rupees (₹)

- **Shopping Cart**
  - Add/Remove items with real-time updates
  - Quantity increment/decrement controls
  - Dynamic cart total calculation
  - Persistent cart storage in MongoDB

- **User Authentication**
  - Secure JWT-based authentication (7-day token expiry)
  - Sign Up / Sign In modal
  - Password hashing with bcryptjs
  - Protected cart and checkout routes

- **Checkout Flow**
  - Customer information form (Name & Email)
  - Loading animation during order processing
  - Mock order receipt generation
  - Order timestamp and unique ID

- **Responsive Design**
  - Mobile-first approach with Tailwind CSS
  - Breakpoints: Mobile (320px), Tablet (640px), Desktop (768px+)
  - Touch-friendly UI elements
  - Adaptive layouts for all screen sizes

### Bonus Features ⭐

- **Database Persistence**: MongoDB Atlas integration with Mongoose ODM
- **User Sessions**: JWT token-based authentication with secure HTTP-only considerations
- **Email Notifications**: EmailJS integration for order confirmation emails
- **Error Handling**: Comprehensive error handling with user-friendly toast notifications
- **Loading States**: Skeleton screens and spinners for better UX
- **Code Quality**: Clean, commented code following best practices
- **Modern UI**: Organic design with coral/teal/blue color scheme and rounded corners

---

## 🛠 Tech Stack

### Frontend
- **React 19.1.1** - UI library with hooks
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Axios 1.13.2** - HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **EmailJS** - Client-side email service integration

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose 8.19.3** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Secure authentication tokens
- **bcryptjs 3.0.3** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **dotenv** - Environment variable management
- **Git** - Version control

---

## 📁 Project Structure

```
Kart/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── cartController.js     # Cart operations
│   │   ├── checkoutController.js # Checkout processing
│   │   └── productController.js  # Product retrieval
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   ├── CartItem.js           # Cart item schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── cartRoutes.js         # Cart endpoints
│   │   ├── checkoutRoutes.js     # Checkout endpoints
│   │   └── productRoutes.js      # Product endpoints
│   ├── seed.js                   # Database seeding script
│   ├── index.js                  # Express app entry
│   ├── package.json
│   └── .env                      # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Products.jsx      # Product grid & pagination
│   │   │   ├── Cart.jsx          # Shopping cart modal
│   │   │   ├── AuthModal.jsx     # Sign In/Sign Up
│   │   │   ├── CheckoutModal.jsx # Checkout form
│   │   │   └── ReceiptModal.jsx  # Order confirmation
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state
│   │   ├── utils/
│   │   │   ├── api.js            # Axios instance
│   │   │   └── emailService.js   # EmailJS integration
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env                      # Environment variables
│
├── Screenshots/                  # Application screenshots
│   ├── Home.png
│   ├── Signup.png
│   ├── Cart.png
│   ├── Reciept.png
│   └── Mail.png
│
└── README.md                     # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/kart.git
cd kart
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file
# Copy the contents from .env.example or create manually
# Add your MongoDB URI and JWT secret
```

**Backend `.env` file:**
```env
PORT=4000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=jwt_key
NODE_ENV=development
```

**Seed the Database (First Time Only):**
```bash
node seed.js
```

**Start Backend Server:**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```
Backend will run on `http://localhost:4000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../Frontend

# Install dependencies
npm install

# Create .env file for EmailJS (optional)
```

**Frontend `.env` file (Optional - for email notifications):**
```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

**Start Frontend Development Server:**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### 5. MongoDB Atlas Setup (Important!)

⚠️ **IP Whitelist Configuration Required:**

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to **Network Access**
3. Click **Add IP Address**
4. Choose one of:
   - **Add Current IP Address** (for development)
   - **Allow Access from Anywhere** (`0.0.0.0/0`) (for testing)
5. Click **Confirm**
6. Wait 1-2 minutes for changes to propagate

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `4000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/kart` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_123` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | Optional (for emails) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Optional (for emails) |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | Optional (for emails) |

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "sam",
  "email": "sam@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "sam@example.com",
  "password": "password123"
}
```
**Response:** Same as Register

---

### Product Endpoints

#### 3. Get All Products (with Pagination)
```http
GET /api/products?page=1&limit=8
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 8)

**Response:**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Oversized Graphic Tee",
      "price": 1299,
      "description": "Vintage-inspired streetwear essential",
      "image": "https://images.unsplash.com/...",
      "category": "Tops"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalProducts": 24,
    "limit": 8
  }
}
```

---

### Cart Endpoints (Protected - Requires JWT)

> **Note:** All cart endpoints require `Authorization: Bearer <token>` header

#### 4. Get User Cart
```http
GET /api/cart
```
**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Response:**
```json
{
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": "507f1f77bcf86cd799439011",
      "product": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Oversized Graphic Tee",
        "price": 1299,
        "image": "https://images.unsplash.com/..."
      },
      "quantity": 2
    }
  ],
  "total": "2598.00"
}
```

#### 5. Add Item to Cart
```http
POST /api/cart
```
**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439013",
  "quantity": 1
}
```
**Response:**
```json
{
  "message": "Item added to cart",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "product": "507f1f77bcf86cd799439013",
    "quantity": 1
  }
}
```

#### 6. Update Cart Item Quantity
```http
PUT /api/cart/:id
```
**Request Body:**
```json
{
  "quantity": 3
}
```
**Response:**
```json
{
  "message": "Cart updated",
  "item": { /* updated cart item */ }
}
```

#### 7. Remove Item from Cart
```http
DELETE /api/cart/:id
```
**Response:**
```json
{
  "message": "Item removed from cart"
}
```

---

### Checkout Endpoint (Protected - Requires JWT)

#### 8. Process Checkout
```http
POST /api/checkout
```
**Request Body:**
```json
{
  "name": "Sam",
  "email": "sam@example.com"
}
```
**Response:**
```json
{
  "message": "Order placed successfully",
  "receipt": {
    "id": "ORD-1730983456789-ABC123",
    "name": "sam",
    "email": "sam@example.com",
    "items": [
      {
        "name": "Oversized Graphic Tee",
        "qty": 2,
        "price": 1299
      }
    ],
    "total": "2598.00",
    "timestamp": "2024-11-07T10:30:56.789Z"
  }
}
```

---

## 📸 Screenshots

### 1. Home Page - Product Grid
![Home Page](Screenshots/Home.png)
*Responsive product grid with pagination showing Gen Z streetwear collection*

### 2. Sign Up / Sign In Modal
![Authentication](Screenshots/Signup.png)
*Clean authentication modal with form validation*

### 3. Shopping Cart
![Shopping Cart](Screenshots/Cart.png)
*Cart sidebar with quantity controls and real-time total calculation*

### 4. Order Receipt
![Order Receipt](Screenshots/Reciept.png)
*Order confirmation modal with detailed receipt information*

### 5. Email Confirmation
![Email Confirmation](Screenshots/Mail.png)
*Automated order confirmation email sent via EmailJS*

---

## 🎁 Bonus Features Implemented

### 1. ✅ Database Persistence
- **MongoDB Atlas** integration for production-ready cloud storage
- Mongoose schemas for Users, Products, CartItems, and Orders
- Automatic cart restoration on login
- Seeding script for initial 24 Gen Z products

### 2. ✅ User Authentication & Sessions
- JWT-based authentication with 7-day token expiry
- Secure password hashing using bcryptjs (10 salt rounds)
- Protected routes middleware
- Persistent login state using localStorage

### 3. ✅ Error Handling
- Comprehensive try-catch blocks in all controllers
- User-friendly error messages with react-hot-toast
- Backend error logging for debugging
- 404 handling for invalid routes

### 4. ✅ Email Notifications
- EmailJS integration for order confirmations
- Professional email template with order details
- Includes order ID, items list, total, and timestamp
- Fallback handling if email service is unavailable

### 5. ✅ Enhanced UX
- Loading states with spinners and animations
- Toast notifications for all user actions
- Responsive design (mobile, tablet, desktop)
- Smooth transitions and hover effects
- Organic UI with rounded corners and soft shadows

### 6. ✅ Code Quality
- Clean, modular code structure
- Minimal inline comments (as per requirements)
- ESLint configuration for code consistency
- Separation of concerns (MVC pattern)
- Reusable API utility with Axios interceptors


---

## 🔮 Future Enhancements

- [ ] Product search and filtering
- [ ] User profile and order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Admin dashboard for product management
- [ ] Real-time stock tracking
- [ ] Social media authentication
- [ ] Advanced analytics and reporting
- [ ] Multi-language support

---

## 👨‍💻 Author

**Rounak**

- GitHub: [[@Rounak87](https://github.com/Rounak87)]


---

## 📄 License

This project is created for the Vibe Commerce coding assignment and is available for educational purposes.

---

<div align="center">

### 🌟 Please give it a star!

**Built with ❤️ using MERN Stack**

</div>
