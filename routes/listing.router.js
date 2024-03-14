import express from "express";
import {
  listing,
  getListings,
  getListingById,
  updateListing,
} from "../controllers/listing.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, listing);
router.get("/", getListings);
router.get("/:id", getListingById);
router.patch("/:id", authMiddleware, updateListing);
export default router;
