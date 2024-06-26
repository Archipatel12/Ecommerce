// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection URI (from environment variable)
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Ensure upload directory exists (not necessary on Vercel)
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Image storage engine using multer
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Serve static files (images) - Vercel requires different setup
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Image upload endpoint
app.post("/api/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    imageurl: `/images/${req.file.filename}` // Adjusted path for Vercel deployment
  });
});

// Product schema and model
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

// Add product endpoint
app.post('/api/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Delete product endpoint
app.post('/api/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
      success: true,
      id: req.body.id,
    });
  } catch (error) {
    console.error('Error removing product:', error);
    res.status(500).json({ error: 'Failed to remove product' });
  }
});

// Fetch all products endpoint (GET request)
app.get('/api/fetchallproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartdata: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', userSchema);

// Register user endpoint
app.post('/api/signup', async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, errors: "Existing user found with same email" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new User({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartdata: cart,
    });
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({
      success: true,
      token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const passcompare = req.body.password === user.password;
      if (passcompare) {
        const data = {
          user: {
            id: user.id,
          }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({
          success: true,
          token
        });
      } else {
        res.json({ success: false, errors: "Wrong password" });
      }
    } else {
      res.json({ success: false, errors: "Wrong email id" });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// New collection endpoint
app.get('/api/newcollection', async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollection = products.slice(-8);
    console.log("New collection fetched");
    res.json(newcollection);
  } catch (error) {
    console.error('Error fetching new collection:', error);
    res.status(500).json({ error: 'Failed to fetch new collection' });
  }
});

// Popular products in women endpoint
app.get('/api/popularinwomen', async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let popularinwomen = products.slice(0, 4);
    console.log("Popular products in women fetched");
    res.json(popularinwomen);
  } catch (error) {
    console.error('Error fetching popular products in women:', error);
    res.status(500).json({ error: 'Failed to fetch popular products in women' });
  }
});

// Export app for Vercel deployment
module.exports = app;


