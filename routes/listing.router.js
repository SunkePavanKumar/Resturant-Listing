import express from "express";
import { listing } from "../controllers/listing.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, listing);

export default router;
