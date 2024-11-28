import express from "express";
import cors from "cors";
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

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is working!' });
});

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

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Handle 404
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Only listen in development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express app
export default app;
