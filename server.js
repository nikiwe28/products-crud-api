require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());           // lets the HTML page call the API from any origin
app.use(express.json());   // parse JSON request bodies

// Serve the frontend too, so one deployment hosts both
app.use(express.static(path.join(__dirname, 'frontend')));

// ---- helpers ----
function validate(body) {
  const errors = [];
  if (!body.product_name || !String(body.product_name).trim()) {
    errors.push('product_name is required');
  }
  if (body.price !== undefined && (isNaN(Number(body.price)) || Number(body.price) < 0)) {
    errors.push('price must be a number >= 0');
  }
  if (body.stock !== undefined && (!Number.isInteger(Number(body.stock)) || Number(body.stock) < 0)) {
    errors.push('stock must be a whole number >= 0');
  }
  return errors;
}

// ---- routes ----

// GET /api/products -> list all records
app.get('/api/products', (req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY id').all();
  res.json(rows);
});

// GET /api/products/:id -> get one record
app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Product not found' });
  res.json(row);
});

// POST /api/products -> create a record
app.post('/api/products', (req, res) => {
  const errors = validate(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const { product_name, brand = null, category = null, price = 0, stock = 0, description = null } = req.body;
  const result = db
    .prepare(
      `INSERT INTO products (product_name, brand, category, price, stock, description)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(String(product_name).trim(), brand, category, Number(price), Number(stock), description);

  const created = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/products/:id -> update a record
app.put('/api/products/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Product not found' });

  const errors = validate({ ...existing, ...req.body });
  if (errors.length) return res.status(400).json({ errors });

  const merged = { ...existing, ...req.body };
  db.prepare(
    `UPDATE products
     SET product_name = ?, brand = ?, category = ?, price = ?, stock = ?, description = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).run(
    String(merged.product_name).trim(),
    merged.brand,
    merged.category,
    Number(merged.price),
    Number(merged.stock),
    merged.description,
    req.params.id
  );

  res.json(db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id));
});

// DELETE /api/products/:id -> delete a record
app.delete('/api/products/:id', (req, res) => {
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted', id: Number(req.params.id) });
});

// Unknown API routes return JSON, not HTML
app.use('/api', (req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
