import express from "express";
import booksRoutes from "./routes/routes";

const app = express();
app.use(express.json());

// port of the app
const PORT = 3000;

// routes
app.use("/", booksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
