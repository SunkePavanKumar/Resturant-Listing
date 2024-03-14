import express from "express";
import {
  deleteReview,
  getReviewByID,
  getReviews,
  review,
  updateReview,
} from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, review);
router.get("/", getReviews);
router.get("/:id", getReviewByID);
router.patch("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;
