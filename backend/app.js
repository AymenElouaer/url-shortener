const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();

const app = express();
app.use(errorHandler);

// Enable CORS with specific frontend URL
const corsOptions = {
  origin: "https://url-shortener-eight-beta.vercel.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", routes); // Use the routes defined in routes/index.js

//Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;
