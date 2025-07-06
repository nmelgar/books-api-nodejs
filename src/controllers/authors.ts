import { Request, Response } from "express";
import Author from "../models/authors";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
