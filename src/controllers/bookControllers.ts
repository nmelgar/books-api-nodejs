import express, { Router, Request, Response } from "express";
import { Book } from "../models/bookModel";

// home route
// export const getHome = (req: Request, res: Response) => {
//   try {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("This is the home page");
//   } catch (error) {
//     res.status(500).json({ message: "Home failed to load." });
//   }
// };

// create a new book
export const postBook = async (req: Request, res: Response) => {
  const book = new Book({
    title: req.body.title,
    authoId: req.body.authoId,
    genreId: req.body.authoId,
    publishedYear: req.body.publishedYear,
    isbn: req.body.isbn,
    pageCount: req.body.pageCount,
    description: req.body.description,
    reviews: req.body.reviews,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: "Error adding new book" });
  }
};

// to get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

// get book by id
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

// update book by id
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update book" });
  }
};

// delete book by id
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);
    if (book) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
};
