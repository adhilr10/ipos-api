"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verifyToken = exports.forgetPassword = exports.authorizeUser = void 0;
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJWT_1 = require("../utils/generateJWT");
const date_fns_1 = require("date-fns");
const generateEmailHTML_1 = require("../utils/generateEmailHTML");
const nodemailer_1 = __importDefault(require("nodemailer"));
const authorizeUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        let existingUser = null;
        if (email) {
            existingUser = await db_1.db.user.findUnique({
                where: {
                    email,
                },
            });
        }
        if (username) {
            existingUser = await db_1.db.user.findUnique({
                where: {
                    username,
                },
            });
        }
        if (!existingUser) {
            res.status(403).json({ error: "User not found" });
            return;
        }
        //check if password is correct
        const passwordMatch = await bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            res.status(403).json({ error: "Wrong credentials" });
            return;
        }
        // Destructure out the password from the existing user
        const { password: userPassword, ...userWithoutPassword } = existingUser;
        const accessToken = (0, generateJWT_1.generateAccessToken)(userWithoutPassword);
        const result = {
            ...userWithoutPassword,
            accessToken,
        };
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to authorize user" });
    }
};
exports.authorizeUser = authorizeUser;
const generateToken = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if user exists with this email
        const existingUser = await db_1.db.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            res.status(403).json({ error: "User not found" });
        }
        const resetToken = generateToken().toString();
        const resetTokenExpiry = (0, date_fns_1.addMinutes)(new Date(), 10);
        // Update user with reset token and expiry
        const updatedUser = await db_1.db.user.update({
            where: {
                email,
            },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });
        const emailHTML = (0, generateEmailHTML_1.generateEmailHTML)(resetToken);
        // Configure nodemailer transporter with TLS settings
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Only use during development/testing
            },
        });
        // Send email with nodemailer
        const mailOptions = {
            from: "asayn.com@gmail.com",
            to: email,
            subject: "Password Reset Request",
            html: emailHTML,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ error });
            }
            else {
                const result = {
                    userId: updatedUser.id,
                    emailId: info.messageId,
                };
                res.status(200).json({
                    message: `Password reset email sent to ${email}`,
                    data: result,
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to reset password", data: null });
    }
};
exports.forgetPassword = forgetPassword;
const verifyToken = async (req, res) => {
    try {
        const { resetToken } = req.params;
        //TODO: resetToken checking problem detected
        //check if user exist  with this email
        const existingToken = await db_1.db.user.findFirst({
            where: {
                resetToken,
                resetTokenExpiry: { gte: new Date() },
            },
        });
        if (!existingToken) {
            res
                .status(400)
                .json({ error: "Invalid or Expired Token", data: null });
        }
        res.status(200).json({ message: "Token verified successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to reset password", data: null });
    }
};
exports.verifyToken = verifyToken;
const changePassword = async (req, res) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    try {
        const user = await db_1.db.user.findFirst({
            where: {
                resetToken,
                resetTokenExpiry: { gte: new Date() },
            },
        });
        if (!user) {
            res.status(400).json({ message: "Invalid or expired token" });
            return;
        }
        // Hash the new password
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        // Update the user's password and clear the reset token and expiry
        await db_1.db.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        res.status(200).json({ message: "Password changed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
};
exports.changePassword = changePassword;
