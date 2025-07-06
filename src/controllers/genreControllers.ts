import { Request, Response } from "express";
import { Genre } from "../models/genreModel";

// create a new genre
export const postGenre = async (req: Request, res: Response) => {
  const genre = new Genre({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: "Error adding new genre" });
  }
};

// get all genres
export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch genres" });
  }
};

// get genre by ID
export const getGenreById = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch genre" });
  }
};

// update genre by ID
export const updateGenre = async (req: Request, res: Response) => {
  try {
    const genreId = req.params.id;
    const genre = await Genre.findByIdAndUpdate(genreId, req.body, {
      new: true,
      runValidators: true,
    });
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update genre" });
  }
};

// Delete genre by ID
export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const genreId = req.params.id;
    const genre = await Genre.findByIdAndDelete(genreId);
    if (genre) {
      res.status(200).json({ message: "Genre deleted successfully" });
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete genre" });
  }
};
