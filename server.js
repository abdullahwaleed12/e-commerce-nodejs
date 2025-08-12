const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const mongoose = require("mongoose");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/globalError")

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

app.use("/", (req, res, next) => {
  next(new ApiError(`Can not found this route ${req.originalUrl}`, 400));
});

// Handel Global error middleware 
app.use(globalError)
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Error: ${err}`)
  server.close(() => {
    console.log("Server Shutting down ");
    process.exit(1);
  })
} )