import {
  createExpense,
  deleteExpenseById,
  getExpenses,
  getSingleExpense,
  updateExpenseById,
} from "../controllers/expenses";
import express from "express";

const expenseRouter = express.Router();

expenseRouter.post("/expenses", createExpense);
expenseRouter.get("/expenses", getExpenses);
expenseRouter.get("/expenses/:id", getSingleExpense);
expenseRouter.put("/expenses/:id", updateExpenseById);
expenseRouter.delete("/expenses/:id", deleteExpenseById);

export default expenseRouter;
