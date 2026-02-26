# E-Commerce Product API

E-Commerce Product API (In-Memory REST API using Express.js)

---

## Objective

- This project demonstrates how to:
- Implements 3 GET routes
- Implements 1 POST route
- Implements 3 PUT routes
- Follows REST principles
- Uses correct HTTP status codes (200, 201, 404)
- Uses Express middleware properly
- Uses CORS
- Does not use any database
- No database is used. Data is stored in an in-memory JSON array.

---

## List of implemented routes

1️. GET `/products`

- Status Code: 200
- Returns full products array

2️. GET `/products/:id`

- Returns a product by ID
- Status: 200 (if found)
- Status: 404 (if not found)

3️. GET `/products/category/:categoryName`

- Returns products by category
- Status: 200
- Returns filtered array
- Returns empty array if none found

4️. POST `/products`

Adds a new product

- Auto-generates ID
- Pushes product into array
- Status: 201
- Returns created product

5️. PUT `/products/:id`

Replaces entire product except ID

- Status: 200
- Status: 404 if product not found

6️. PUT `/products/:id/stock`

Updates only the stock value

- Status: 200
- Status: 404 if product not found

7. PUT `/products/:id/price`

Updates only the price value

- Status: 200
- Status: 404 if product not found

---

## Sample API URLs
1. All products
   url:  https://ecom-api-sushant.onrender.com/products
   
2. Product by id
   url:  https://ecom-api-sushant.onrender.com/products/3
   
3. Products by category
   url:  https://ecom-api-sushant.onrender.com/products/category/fashion
   
4. Add a new product
   url:  https://ecom-api-sushant.onrender.com/products
   
5. Replace entire product
   url:  https://ecom-api-sushant.onrender.com/products/3
   
6. Update stock value
   url:  https://ecom-api-sushant.onrender.com/products/4/stock

7. Update price value
   url:  https://ecom-api-sushant.onrender.com/products/2/price
   
---
   
## How To Run Locally

1. Clone Repository: 
` git clone https://github.com/Sushant-Ravi14/servers/tree/main/assignments/ecom_api `

2️. Install Dependencies: 
` npm install `

3️. Run Server: 
` node index.js `

Server runs on: 
http://localhost:3000

---

## Live Deployment

Render Deployment Link:
https://ecom-api-sushant.onrender.com

---

## Documentation

Postman Documentation link: 
https://documenter.getpostman.com/view/50841146/2sBXcGFL9w#75dae9bc-e38f-4ca6-87d3-fcac3a0a5d59

---