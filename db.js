// Database setup using Node's built-in SQLite module (no native build tools needed)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dbFile = path.resolve(__dirname, process.env.DB_FILE || 'products.db');
const db = new DatabaseSync(dbFile);

// Create the table and load the 10 sample records the first time only
const tableExists = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='products'")
  .get();

if (!tableExists) {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);
  console.log('Database created and sample products inserted.');
}

module.exports = db;
