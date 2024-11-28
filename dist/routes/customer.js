"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customers_1 = require("@/controllers/customers");
const express_1 = __importDefault(require("express"));
const customerRouter = express_1.default.Router();
// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
// as express.RequestHandler remove Error
customerRouter.post("/customers", customers_1.createCustomer);
customerRouter.get("/customers", customers_1.getCustomers);
customerRouter.get("/customers/:id", customers_1.getSingleCustomer);
exports.default = customerRouter;
