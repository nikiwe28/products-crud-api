-- Tech Product Showcase: one table only
CREATE TABLE IF NOT EXISTS products (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name  VARCHAR(150) NOT NULL,
  brand         VARCHAR(80),
  category      VARCHAR(60),
  price         DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock         INTEGER NOT NULL DEFAULT 0,
  description   TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10 sample records
INSERT INTO products (product_name, brand, category, price, stock, description) VALUES
 ('Galaxy S24', 'Samsung', 'Smartphone', 799.99, 25, '6.2-inch AMOLED display, 128GB storage'),
 ('iPhone 15', 'Apple', 'Smartphone', 899.00, 18, 'A16 chip, 48MP main camera'),
 ('ThinkPad E14', 'Lenovo', 'Laptop', 650.00, 12, '14-inch, Core i5, 16GB RAM, 512GB SSD'),
 ('MacBook Air M2', 'Apple', 'Laptop', 1099.00, 8, '13.6-inch Liquid Retina, 8GB RAM, 256GB SSD'),
 ('WH-1000XM5', 'Sony', 'Headphones', 349.99, 30, 'Wireless noise-cancelling headphones'),
 ('AirPods Pro 2', 'Apple', 'Earbuds', 249.00, 40, 'Active noise cancellation, USB-C case'),
 ('Pavilion 27 Monitor', 'HP', 'Monitor', 229.50, 15, '27-inch Full HD IPS monitor'),
 ('MX Master 3S', 'Logitech', 'Accessories', 99.99, 50, 'Wireless ergonomic mouse'),
 ('Echo Dot 5th Gen', 'Amazon', 'Smart Home', 49.99, 60, 'Smart speaker with Alexa'),
 ('Tab S9', 'Samsung', 'Tablet', 649.99, 14, '11-inch Dynamic AMOLED tablet');
