import express from "express";
import {
  createPayee,
  deletePayeeById,
  getPayees,
  getSinglePayee,
  updatePayeeById,
} from "../controllers/payee";

const payeeRouter = express.Router();

payeeRouter.post("/payees", createPayee);
payeeRouter.get("/payees", getPayees);
payeeRouter.get("/payees/:id", getSinglePayee);
payeeRouter.put("/payees/:id", updatePayeeById);
payeeRouter.delete("/payees/:id", deletePayeeById);

export default payeeRouter;
