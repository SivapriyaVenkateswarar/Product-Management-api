const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const productRoutes = require('./src/routes/product.routes.js');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!')) 
  .catch(err => console.error('Connection error:', err)); 

// Server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});

module.exports = app;
