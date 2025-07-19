import { Request, Response } from "express";
import { Author } from "../models/authorModel";

// create a new author
export const postAuthor = async (req: Request, res: Response) => {
  const author = new Author({
    name: req.body.name,
    biography: req.body.biography,
    dateOfBirth: req.body.dateOfBirth,
    books: req.body.books,
  });
  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: "Error adding new author" });
  }
};

// get all authors
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch authors" });
  }
};

// get author by ID
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch author" });
  }
};

// update author by ID
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByIdAndUpdate(authorId, req.body, {
      new: true,
      runValidators: true,
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update author" });
  }
};

// delete author by ID
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByIdAndDelete(authorId);
    if (author) {
      res.status(200).json({ message: "Author deleted successfully" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete author" });
  }
};
