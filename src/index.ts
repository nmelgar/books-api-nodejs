import express from "express";
import swaggerDocs from "./utils/swagger";
import bookRoutes from "./routes/bookRoutes";
import genreRoutes from "./routes/genreRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import authorRoutes from "./routes/authorRoutes";

const app = express();
app.use(express.json());

// routes
app.use("/books", bookRoutes);
app.use("/genres", genreRoutes);
app.use("/reviews", reviewRoutes);
app.use("/authors", authorRoutes);

// Export the app for testing
export default app;
