import express from "express";
import customerRouter from "./routes/customer";
import userRouter from "./routes/user";
import shopRouter from "./routes/shop";
import supplierRouter from "./routes/supplier";
import loginRouter from "./routes/login";
import unitRouter from "./routes/unit";
import brandRouter from "./routes/brand";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/v1', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use("/api/v1", customerRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", shopRouter);
app.use("/api/v1", supplierRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", unitRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", productRouter);

// Remove app.listen for Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log("Server is Running..");
  });
}

// Export the Express app
export default app;
