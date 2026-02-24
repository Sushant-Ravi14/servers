const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 799,
    stock: 25,
    rating: 4.3
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499,
    stock: 40,
    rating: 4.5
  },
  {
    id: 3,
    name: "Laptop Stand",
    category: "Accessories",
    price: 999,
    stock: 30,
    rating: 4.2
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 4999,
    stock: 12,
    rating: 4.4
  },
  {
    id: 5,
    name: "Backpack",
    category: "Fashion",
    price: 1599,
    stock: 50,
    rating: 4.1
  }
];

// home route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Return all products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

// Return product by ID
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if(!product){
        return res.status(404).json("no product found");
    }

    res.status(200).json(product);
});

// Return products by category
app.get("/products/category/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;

    if(!categoryName){
        return res.status(404).json("no product found");
    }

    const result = products.filter(r => r.category.toLowerCase() === categoryName);
    res.status(200).json(result);
});

// Add a new product
app.post("/products", (req, res) => {
    const {name, category, price, stock, rating} = req.body;

    if(!name || !category || !price || !stock || !rating){
        return res.status(404).send("All fields are required");
    }

    const newId = products.length > 0 
                ? products[products.length-1].id + 1
                : 1;

    const newproduct = {id: newId, name, category, price, stock, rating};
    products.push(newproduct);
    res.status(201).json(newproduct);
});

// Replace entire product
app.put("/products/:id", (req, res) => {
    const prodId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === prodId);

    if(index === -1){
        return res.status(404).json({message: "product not found"});
    }

    const { name, category, price, stock, rating } = req.body;

    if (!name || !category || !price || !stock || !rating) {
        return res.status(400).json({ message: "All fields are required for full update" });
    }

    const updatedProduct = {
        id: prodId,
        name,
        category,
        price,
        stock,
        rating
    };

    products[index] = updatedProduct;
    res.status(200).json(updatedProduct);
});

// Update only stock value
app.put("/products/:id/stock", (req, res) => {
    const prodId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === prodId)

    if(index === -1){
        return res.status(404).json("Product not found");
    }

    const {stock} = req.body;

    if (stock == null) {
        return res.status(400).json({ message: "Stock value is required"});
    }

    products[index].stock = stock;
    res.status(200).json(products[index]);
});

// Update only price
app.put("/products/:id/price", (req, res) => {
    const prodId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === prodId)

    if(index === -1){
        return res.status(404).json("Product not found");
    }

    const {price} = req.body;

    if (price == null) {
        return res.status(400).json({ message: "price value is required"});
    }

    products[index].price = price;
    res.status(200).json(products[index]);
});

app.listen(3000, () => {
    console.log("server started on port 3000")
});