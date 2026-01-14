"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../controllers/login");
const express_1 = __importDefault(require("express"));
const loginRouter = express_1.default.Router();
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authorize user
 *     tags: [Auth]
 *     description: Authorize a user and generate a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
loginRouter.post("/auth/login", login_1.authorizeUser);
/**
 * @swagger
 * /api/v1/auth/forget-password:
 *   put:
 *     summary: Forget password
 *     tags: [Auth]
 *     description: Request a password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPassword'
 *     responses:
 *       200:
 *         description: Password reset requested
 */
loginRouter.put("/auth/forget-password", login_1.forgetPassword);
/**
 * @swagger
 * /api/v1/auth/verify-token/{resetToken}:
 *   get:
 *     summary: Verify reset token
 *     tags: [Auth]
 *     description: Verify the password reset token.
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset token
 *     responses:
 *       200:
 *         description: Token verified
 *       404:
 *         description: Token not found
 */
loginRouter.get("/auth/verify-token/:resetToken", login_1.verifyToken);
/**
 * @swagger
 * /api/v1/auth/change-password/{resetToken}:
 *   put:
 *     summary: Change password
 *     tags: [Auth]
 *     description: Change the user's password using the reset token.
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *         description: The reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password changed
 *       404:
 *         description: Token not found
 */
loginRouter.put("/auth/change-password/:resetToken", login_1.changePassword);
exports.default = loginRouter;
