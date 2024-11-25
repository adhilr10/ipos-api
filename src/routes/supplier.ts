import { createSupplier, getSingleSupplier, getSuppliers } from "@/controllers/suppliers";
import express from "express"
const supplierRouter = express.Router()

// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
supplierRouter.post("/suppliers", createSupplier);
supplierRouter.get("/suppliers",  getSuppliers);
supplierRouter.get("/suppliers/:id", getSingleSupplier);



export default supplierRouter