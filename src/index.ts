import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";

import customerRouter from "./routes/customer";
import userRouter from "./routes/user";
import shopRouter from "./routes/shop";
import supplierRouter from "./routes/supplier";
import loginRouter from "./routes/login";
import unitRouter from "./routes/unit";
import brandRouter from "./routes/brand";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import * as dotenv from "dotenv";
import saleRouter from "./routes/sale";
import payeeRouter from "./routes/payee";
import expenseCategoryRouter from "./routes/expense-category";
import expenseRouter from "./routes/expense";
import notificationRouter from "./routes/notification";
import adjustmentRouter from "./routes/adjustment";
import purchaseRouter from "./routes/purchase";

dotenv.config();

const app = express();

// Middleware
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
 
const generalLimiter = rateLimit({
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

const strictLimiter = rateLimit({
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

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1", customerRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", shopRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", unitRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", saleRouter);
app.use("/api/v1", payeeRouter);
app.use("/api/v1", expenseCategoryRouter);
app.use("/api/v1", expenseRouter);
app.use("/api/v1", notificationRouter);
app.use("/api/v1", adjustmentRouter);
app.use("/api/v1", purchaseRouter);

// Handle 404
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export default app;
