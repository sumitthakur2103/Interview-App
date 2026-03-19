import express from "express";
import { generateInterview } from "../controllers/interview.js";

const router = express.Router();

router.get("/generate", generateInterview);

export default router;