import express from "express";
import customerRouter from "./routes/customer";
import userRouter from "./routes/user";

require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());


app.use("/api/v1", customerRouter)
app.use("/api/v1", userRouter)

app.listen(PORT, () => {
  console.log("Server is Running..");
});
