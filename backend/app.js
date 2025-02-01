const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();

const app = express();

// Enable CORS for all origins (for testing)
app.use(
  cors({
    origin: "*", // Allow all origins (replace with your frontend URL in production)
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(errorHandler);

// Test Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, the backend is working!" });
});

// Routes
app.use("/api", routes); // Use the routes defined in routes/index.js

//Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
