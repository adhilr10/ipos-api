import { createCustomer, getCustomers, getSingleCustomer } from "@/controllers/customers";
import express from "express"
const customerRouter = express.Router()

customerRouter.post("/customers", createCustomer);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getSingleCustomer);



export default customerRouter