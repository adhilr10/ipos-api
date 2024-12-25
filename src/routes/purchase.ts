import express from "express";
import {
  createPurchaseOrder,
  getPurchaseOrders,
} from "../controllers/purchases";

const purchaseRouter = express.Router();

purchaseRouter.post("/purchases", createPurchaseOrder);
purchaseRouter.get("/purchases", getPurchaseOrders);

export default purchaseRouter;
