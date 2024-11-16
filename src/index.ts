import express, { Request, Response } from "express";

require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/customers", (req: Request, res: Response) => {
  const customers = [
    {
      name: "Adhil",
      email: "adhil@gmail.com",
      phone: 9878121212,
    },
    {
      name: "Rahman",
      email: "rahman@gmail.com",
      phone: 99999999,
    },
  ];
  res.status(200).json(customers);
});

app.listen(PORT, () => {
  console.log("Server is Running..");
});
