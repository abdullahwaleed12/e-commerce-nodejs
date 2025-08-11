const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const mongoose = require("mongoose");

const dbConnection = require("./config/database");
const categoryRoutes = require("./routes/categoryRoutes");

// Connect with db
dbConnection();

// express app
const app = express();


// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}


// Routes

app.use("/api/v1/categories", categoryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
