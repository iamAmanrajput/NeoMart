# 🛒 NeoMart - Modern E-commerce Platform

A full-stack e-commerce platform built with React 19, Node.js, and MongoDB. Features a modern UI with animations, comprehensive admin dashboard, and secure payment integration.

![NeoMart Banner](https://github.com/user-attachments/assets/e53f3408-3647-4144-ade9-ad86bfec0486)

## ✨ Features

### 🛍️ **Customer Features**

- **User Authentication**: Secure login/signup with JWT
- **Product Browsing**: Advanced filtering and search functionality
- **Shopping Cart**: Persistent cart with real-time updates
- **Order Management**: Track orders and view order history
- **Review System**: Rate and review products with profile images
- **Payment Integration**: Secure Razorpay payment gateway
- **Pincode Validation**: Delivery availability checker
- **Responsive Design**: Mobile-first approach with dark/light mode

### 🎛️ **Admin Features**

- **Product Management**: CRUD operations for products
- **Order Management**: View and manage customer orders
- **Analytics Dashboard**: Sales charts and performance metrics
- **User Management**: Customer data and order tracking
- **Settings Panel**: Platform configuration and customization
- **Image Management**: Cloudinary integration for media handling

### 🎨 **UI/UX Features**

- **Modern Design**: Clean, professional interface
- **Framer Motion**: Smooth animations and transitions
- **Dark/Light Mode**: Theme switching capability
- **Responsive Layout**: Works on all device sizes
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: User feedback with Sonner

## 🛠️ Tech Stack

### **Frontend**

- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router DOM 7** - Client-side routing
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Swiper** - Touch slider
- **Sonner** - Toast notifications

### **Backend**

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image management
- **Razorpay** - Payment gateway
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Cloudinary account
- Razorpay account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd NeoMart
```

### 2. Backend Setup

```bash
cd BACKEND
npm install
```

Create `.env` file:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd FRONTEND
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

### 4. Start Development Servers

**Backend:**

```bash
cd BACKEND
npm start
```

**Frontend:**

```bash
cd FRONTEND
npm run dev
```

## 📁 Project Structure

```
NeoMart/
├── BACKEND/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   ├── settingController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── verifyToken.js
│   ├── models/
│   │   ├── admin.js
│   │   ├── order.js
│   │   ├── product.js
│   │   ├── review.js
│   │   └── user.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   ├── profileRoutes.js
│   │   └── reviewRoutes.js
│   └── utils/
│       ├── constants.js
│       └── imageUploader.js
└── FRONTEND/
    ├── src/
    │   ├── Admin/
    │   │   ├── AllProducts.jsx
    │   │   ├── Analytics.jsx
    │   │   ├── CreateProduct.jsx
    │   │   ├── Orders.jsx
    │   │   └── Settings.jsx
    │   ├── components/
    │   │   ├── custom/
    │   │   │   ├── CartDrawer.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── ProductCard.jsx
    │   │   │   ├── ReviewComponent.jsx
    │   │   │   └── ...
    │   │   ├── provider/
    │   │   └── ui/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   ├── redux/
    │   └── constants/
    └── public/
```

## 🚀 Key Features Explained

### **Authentication System**

- JWT-based authentication
- Protected routes for users and admins
- Secure password hashing with bcryptjs

### **Product Management**

- CRUD operations for products
- Image upload with Cloudinary
- Category and filter management
- Inventory tracking

### **Shopping Experience**

- Real-time cart updates
- Wishlist functionality
- Product reviews and ratings
- Order tracking

### **Payment Integration**

- Razorpay payment gateway
- Secure transaction processing
- Order confirmation emails
- Payment status tracking

### **Admin Dashboard**

- Sales analytics with charts
- Order management interface
- User management tools
- Product catalog management

## 🔧 Available Scripts

### Backend

```bash
npm start          # Start development server with nodemon
```

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🌐 API Endpoints

### Authentication

- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/admin/login` - Admin login

### Products

- `GET /api/v1/product` - Get all products
- `POST /api/v1/product` - Create product (Admin)
- `PUT /api/v1/product/:id` - Update product (Admin)
- `DELETE /api/v1/product/:id` - Delete product (Admin)

### Orders

- `POST /api/v1/order` - Create order
- `GET /api/v1/order` - Get user orders
- `GET /api/v1/order/admin` - Get all orders (Admin)

### Reviews

- `POST /api/v1/review` - Add product review
- `GET /api/v1/review/:productId` - Get product reviews

## 🎨 UI Components

The project uses a comprehensive component library:

- **Radix UI Primitives** - Accessible base components
- **Custom Components** - Tailored for e-commerce needs
- **Animation Components** - Framer Motion integration
- **Chart Components** - Recharts for analytics

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcryptjs
- CORS configuration
- Input validation and sanitization
- Secure file upload handling

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interactions
- Adaptive layouts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aman Kumar**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Aman Kumar](https://linkedin.com/in/aman-kumar)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Razorpay](https://razorpay.com/) for payment integration

---

⭐ **Star this repository if you find it helpful!**
