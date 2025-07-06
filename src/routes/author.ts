import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authors";

const router = express.Router();

// RESTful routes for authors
router.get("/", getAllAuthors);             // GET /authors
router.get("/:id", getAuthorById);         // GET /authors/:id
router.post("/", createAuthor);            // POST /authors
router.put("/:id", updateAuthor);          // PUT /authors/:id
router.delete("/:id", deleteAuthor);       // DELETE /authors/:id

export default router;
