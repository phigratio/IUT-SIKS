import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoute.js";
import { connectDB } from "./lib/db.js";

// Load environment variables
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging the URI

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(express.json());

// Database connection first
connectDB()
  .then(() => {
    // If DB connection is successful, start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit if the DB connection fails
  });

// Middleware and Routes
app.use("/api/auth", authRoutes); // Auth routes
