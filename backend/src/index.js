require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const cors    = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json()); 

const path = require('path');

// Returns all products in the database
app.get('/api/products', async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

// Returns data for the selected product
app.get('/api/products/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return res.status(404).json({ error: 'Not found' });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Path to images
app.use(
    '/uploads',
    express.static(path.join(__dirname, '../public/uploads'))
);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
