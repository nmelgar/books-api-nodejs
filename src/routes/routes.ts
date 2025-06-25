import express from "express";
import { getHome } from "../controllers/booksController";

const router = express.Router();

// home route
router.get("/", getHome);

export default router;
