# Tech Product Showcase (Question 5) - Single-table CRUD app

Node.js + Express REST API, SQLite database, HTML/JavaScript frontend.

## Run locally (Windows, Node 22.13+; you have v24)
    cd backend
    npm install express cors dotenv
    npm start
Open http://localhost:3000 (the server also serves the frontend).

The database file (products.db) and the 10 sample products are created
automatically on first run from schema.sql.

## Endpoints
| Method | URL                  | Purpose        |
|--------|----------------------|----------------|
| GET    | /api/products        | List all       |
| GET    | /api/products/:id    | Get one        |
| POST   | /api/products        | Create         |
| PUT    | /api/products/:id    | Update         |
| DELETE | /api/products/:id    | Delete         |

POST/PUT body example:
    {"product_name":"Pixel 9","brand":"Google","category":"Smartphone","price":699,"stock":10,"description":"128GB"}
