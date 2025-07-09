import express, { Router, Request, Response } from "express";
import { Review } from "../models/reviewModel";

// create a new review
export const postReview = async (req: Request, res: Response) => {
  try {
    const review = new Review({
      bookId: req.body.bookId,
      // reviewerName: req.body.reviewerName,
      // rating: req.body.rating,
      comment: req.body.comment,
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Error adding review", error });
  }
};

// get all reviews
export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// get a review by ID
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch review", error });
  }
};

// update a review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error });
  }
};

// delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};
