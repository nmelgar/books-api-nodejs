import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerDocs from "./utils/swagger";
import bookRoutes from "./routes/bookRoutes";
import genreRoutes from "./routes/genreRoutes";
import reviewRoutes from "./routes/reviewRoutes";

// env variables
dotenv.config();

const app = express();
app.use(express.json());

// connect to the database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/books-api";

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

// routes
app.use("/books", bookRoutes);
app.use("/genres", genreRoutes);
app.use("/reviews", reviewRoutes);

// Export the app for testing
export default app;
