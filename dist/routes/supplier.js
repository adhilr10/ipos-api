"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const suppliers_1 = require("@/controllers/suppliers");
const express_1 = __importDefault(require("express"));
const supplierRouter = express_1.default.Router();
// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
supplierRouter.post("/suppliers", suppliers_1.createSupplier);
supplierRouter.get("/suppliers", suppliers_1.getSuppliers);
supplierRouter.get("/suppliers/:id", suppliers_1.getSingleSupplier);
exports.default = supplierRouter;
