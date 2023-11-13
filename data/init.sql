-- init-data.sql
-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
INSERT INTO users (id, username, email) VALUES
  (1, 'user1', 'user1@example.com'),
  (2, 'user2', 'user2@example.com'),
  (3, 'user3', 'user3@example.com'),
  (4, 'user4', 'user4@example.com');

-- Products table
CREATE TABLE IF NOT EXISTS products (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price DECIMAL(10, 2) NOT NULL
);
INSERT INTO products (id, name, price) VALUES
  (1, 'Product A', 19.99),
  (2, 'Product B', 29.99),
  (3, 'Product C', 14.99),
  (4, 'Product D', 39.99);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
   id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   product_id INT NOT NULL,
   quantity INT NOT NULL,
   order_date DATE NOT NULL
);
INSERT INTO orders (id, user_id, product_id, quantity, order_date) VALUES
  (1, 1, 2, 3, '2023-01-01'),
  (2, 2, 1, 1, '2023-01-02'),
  (3, 3, 3, 2, '2023-01-03'),
  (4, 1, 4, 1, '2023-01-04');
