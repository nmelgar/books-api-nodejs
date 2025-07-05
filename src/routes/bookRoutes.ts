import express from "express";
const router = express.Router();

import {
  //   getHome,
  postBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookControllers";

// create a new book
router.post("/", postBook);
// to get all books
router.get("/", getBooks);
// get book by id
router.get("/:id", getBookById);
// update book by id
router.put("/:id", updateBook);
// delete book by id
router.delete("/:id", deleteBook);

export default router;
