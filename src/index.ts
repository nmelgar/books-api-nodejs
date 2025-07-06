import express from "express";
import swaggerDocs from "./utils/swagger";
import booksRoutes from "./routes/routes";
import outhorRoutes from "./routes/author";

const app = express();
app.use(express.json());

// port of the app
const PORT = 3000;

// routes
app.use("/", booksRoutes);
app.use("/authors", outhorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});
