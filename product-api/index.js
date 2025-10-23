// api/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./src/routes/product.routes.js');
const authRoutes = require('./src/routes/auth.routes.js');

console.log("Starting Product Manager API...");

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["https://your-frontend.vercel.app"], 
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-client-key", "x-client-secret"]
}));

console.log("Mounting /api routes");
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Connection error:', err));

// Optional healthcheck route
app.get("/", (req, res) => {
  res.send("Product Manager API is running.");
});

// Export app for serverless deployment
module.exports = app;
