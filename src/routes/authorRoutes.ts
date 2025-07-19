import express from "express";
const router = express.Router();

import {
  postAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorControllers"; // Assuming authorControllers.ts exists

//create a new author
router.post("/", postAuthor);
// get all authors
router.get("/", getAuthors);
// get an author by ID
router.get("/:id", getAuthorById);
// update an author by ID
router.put("/:id", updateAuthor);
// delete an author by ID
router.delete("/:id", deleteAuthor);

export default router;
