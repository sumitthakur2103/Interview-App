import express from "express";
import { startInterview, nextStep, endInterview } from "../controllers/interview.js";

const router = express.Router();

router.get("/start", startInterview);
router.post("/next", nextStep);

router.get("/end", endInterview);
export default router;