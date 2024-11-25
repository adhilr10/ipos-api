import { createCustomer, getCustomers, getSingleCustomer } from "@/controllers/customers";
import express from "express"
const customerRouter = express.Router()

// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
customerRouter.post("/customers", createCustomer);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getSingleCustomer);



export default customerRouter