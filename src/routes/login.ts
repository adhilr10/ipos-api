import { authorizeUser } from "@/controllers/login";
import express, { RequestHandler } from "express";

const loginRouter = express.Router();

loginRouter.post("/auth/login", authorizeUser as RequestHandler);

export default loginRouter;
