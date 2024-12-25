import express from "express";
import { createAdjustment, getAdjustments } from "../controllers/adjustments";

const adjustmentRouter = express.Router();

adjustmentRouter.post("/adjustments", createAdjustment);
adjustmentRouter.get("/adjustments", getAdjustments);

export default adjustmentRouter;
