// tests/products.test.js
const request = require('supertest');
const app = require('../app'); // Your Express app
const Product = require('../src/models/product.model');
const mongoose = require('mongoose');

// Clean up the database after each test
afterEach(async () => {
  await Product.deleteMany();
});

// Close DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        costPrice: 80,
        sellingPrice: 100,
        stock: 50
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Product');
  });

  it('should get all products', async () => {
    await new Product({ name: 'Laptop', costPrice: 75000, sellingPrice: 80000, stock: 10 }).save();
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name', 'Laptop');
  });

  it('should get a product by ID', async () => {
    const product = await new Product({ name: 'Mouse', costPrice: 500, sellingPrice: 700, stock: 20 }).save();
    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Mouse');
  });

  it('should update a product', async () => {
    const product = await new Product({ name: 'Keyboard', costPrice: 1000, sellingPrice: 1200, stock: 15 }).save();
    const res = await request(app)
      .patch(`/api/products/${product._id}`)
      .send({ stock: 25 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('stock', 25);
  });

  it('should delete a product', async () => {
    const product = await new Product({ name: 'Monitor', costPrice: 5000, sellingPrice: 5500, stock: 5 }).save();
    const res = await request(app).delete(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Product deleted successfully');
  });

  it('should get product profit', async () => {
    const product = await new Product({ name: 'Laptop', costPrice: 75000, sellingPrice: 80000, stock: 10 }).save();
    const res = await request(app).get(`/api/products/${product._id}/profit`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('profit', 5000);
    expect(res.body).toHaveProperty('productName', 'Laptop');
  });
});
