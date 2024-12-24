import {
  createExpenseCategory,
  deleteExpenseCategoryById,
  getExpenseCategories,
  getSingleExpenseCategory,
  updateExpenseCategoryById,
} from "../controllers/expense-categories";
import express from "express";

const expenseCategoryRouter = express.Router();

expenseCategoryRouter.post("/expense-categories", createExpenseCategory);
expenseCategoryRouter.get("/expense-categories", getExpenseCategories);
expenseCategoryRouter.get("/expense-categories/:id", getSingleExpenseCategory);
expenseCategoryRouter.put("/expense-categories/:id", updateExpenseCategoryById);
expenseCategoryRouter.delete("/expense-categories/:id", deleteExpenseCategoryById);

export default expenseCategoryRouter;
