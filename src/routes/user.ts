import {
  createUser,
  deleteUserById,
  getAttendants,
  getUser,
  getUserById,
  updateUserById,
  updateUserPasswordById,
} from "@/controllers/user";
import express, { RequestHandler } from "express";

const userRouter = express.Router();

userRouter.post("/users", createUser as RequestHandler);
userRouter.get("/users", getUser as RequestHandler);
userRouter.get("/attendants", getAttendants as RequestHandler);
userRouter.get("/users/:id", getUserById as RequestHandler);
userRouter.put("/users/:id", updateUserById);
userRouter.put("/users/update-password/:id", updateUserPasswordById);
userRouter.delete("/users/:id", deleteUserById);

export default userRouter;
