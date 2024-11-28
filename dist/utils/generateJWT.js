"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DEFAULT_SIGN_OPTION = {
    expiresIn: "1h",
};
function generateAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
    const secret = process.env.SECRET_KEY;
    // Use this command to generate SECRET_KEY: openssl rand -base64 32
    //node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    return token;
}
