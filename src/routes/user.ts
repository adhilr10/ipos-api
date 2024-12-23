import {
  createUser,
  deleteUserById,
  getAttendants,
  getUser,
  getUserById,
  updateUserById,
  updateUserPasswordById,
} from "../controllers/user";
import express, { RequestHandler } from "express";

const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getUser);
userRouter.get("/attendants", getAttendants);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUserById);
userRouter.put("/users/update-password/:id", updateUserPasswordById);
userRouter.delete("/users/:id", deleteUserById);

export default userRouter;
