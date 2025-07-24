import express from "express";
import dotenv from "dotenv";
import swaggerDocs from "./utils/swagger";
import bookRoutes from "./routes/bookRoutes";
import genreRoutes from "./routes/genreRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import authorRoutes from "./routes/authorRoutes";
import authRoutes from "./routes/authRoutes";
import homeRoutes from "./routes/homeRoutes";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./controllers/loginController";
import "./config/passportSetup";

dotenv.config();
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const app = express();
app.set("trust proxy", true);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://book-management-api-oz2l.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.set("view engine", "ejs");

// session middleware
app.use(
  session({
    secret: clientSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

//styles
app.use(express.static("public"));

// routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/genres", genreRoutes);
app.use("/reviews", reviewRoutes);

// Export the app for testing
export default app;
