import express from "express";
const router = express.Router();

import {
  postReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/reviewContollers";

// post a new review
router.post("/", postReview);
// get all reviews
router.get("/", getReviews);
// get review by id
router.get("/:id", getReviewById);
// update review by id
router.put("/:id", updateReview);
// delete review by id
router.delete("/:id", deleteReview);

export default router;
