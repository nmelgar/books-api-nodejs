import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./index";
import swaggerDocs from "./utils/swagger";

// env variables
dotenv.config();
const PORT = 3000;

// connect to the database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/books-api";

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});
