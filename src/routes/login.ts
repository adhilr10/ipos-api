import { authorizeUser, changePassword, forgetPassword, verifyToken } from "../controllers/login";
import express, { RequestHandler } from "express";

const loginRouter = express.Router();

loginRouter.post("/auth/login", authorizeUser);
loginRouter.put("/auth/forget-password", forgetPassword);
loginRouter.get("/auth/verify-token/:resetToken", verifyToken);
loginRouter.put("/auth/change-password/:resetToken", changePassword);

export default loginRouter;
