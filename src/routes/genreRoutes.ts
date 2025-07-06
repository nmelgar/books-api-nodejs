import express from "express";
const router = express.Router();

import {
  postGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genreControllers";

// create a new genre
router.post("/", postGenre);
// get all genres
router.get("/", getGenres);
// get genre by ID
router.get("/:id", getGenreById);
// update genre by ID
router.put("/:id", updateGenre);
// delete genre by ID
router.delete("/:id", deleteGenre);

export default router;
