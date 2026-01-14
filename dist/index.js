"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const customer_1 = __importDefault(require("./routes/customer"));
const user_1 = __importDefault(require("./routes/user"));
const shop_1 = __importDefault(require("./routes/shop"));
const supplier_1 = __importDefault(require("./routes/supplier"));
const login_1 = __importDefault(require("./routes/login"));
const unit_1 = __importDefault(require("./routes/unit"));
const brand_1 = __importDefault(require("./routes/brand"));
const category_1 = __importDefault(require("./routes/category"));
const product_1 = __importDefault(require("./routes/product"));
const dotenv = __importStar(require("dotenv"));
const sale_1 = __importDefault(require("./routes/sale"));
const payee_1 = __importDefault(require("./routes/payee"));
const expense_category_1 = __importDefault(require("./routes/expense-category"));
const expense_1 = __importDefault(require("./routes/expense"));
const notification_1 = __importDefault(require("./routes/notification"));
const adjustment_1 = __importDefault(require("./routes/adjustment"));
const purchase_1 = __importDefault(require("./routes/purchase"));
dotenv.config();
const app = (0, express_1.default)();
// Middleware
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
const generalLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: "You are making too many requests. Please try again later.",
        });
    },
});
app.use(generalLimiter);
const strictLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: "You are making too many requests. Please try again later.",
        });
    },
});
app.use("/api/v1/sales", strictLimiter);
app.use("/api/v1/users", strictLimiter);
app.use("/api/v1/auth", strictLimiter);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use("/api/v1", customer_1.default);
app.use("/api/v1", user_1.default);
app.use("/api/v1", shop_1.default);
app.use("/api/v1", supplier_1.default);
app.use("/api/v1", login_1.default);
app.use("/api/v1", unit_1.default);
app.use("/api/v1", brand_1.default);
app.use("/api/v1", category_1.default);
app.use("/api/v1", product_1.default);
app.use("/api/v1", sale_1.default);
app.use("/api/v1", payee_1.default);
app.use("/api/v1", expense_category_1.default);
app.use("/api/v1", expense_1.default);
app.use("/api/v1", notification_1.default);
app.use("/api/v1", adjustment_1.default);
app.use("/api/v1", purchase_1.default);
// Handle 404
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "production" ? undefined : err.message
    });
});
// Start server
const PORT = parseInt(process.env.PORT || "8000", 10);
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`✓ Server is running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV}`);
});
// Handle graceful shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});
process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});
exports.default = app;
