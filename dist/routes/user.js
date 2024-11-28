"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("@/controllers/user");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.post("/users", user_1.createUser);
userRouter.get("/users", user_1.getUser);
userRouter.get("/attendants", user_1.getAttendants);
userRouter.get("/users/:id", user_1.getUserById);
userRouter.put("/users/:id", user_1.updateUserById);
userRouter.put("/users/update-password/:id", user_1.updateUserPasswordById);
userRouter.delete("/users/:id", user_1.deleteUserById);
exports.default = userRouter;
