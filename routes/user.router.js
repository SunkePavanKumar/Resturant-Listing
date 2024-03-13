import express from "express";
import { login, register } from "../controllers/user.controller.js";
const router = express.Router();

// test router
router.get("/test", (req, res) => {
  res.json({
    success: "true",
    message: "Route is working fin",
  });
});

router.post("/register", register);
router.post("/login", login);

export default router;
