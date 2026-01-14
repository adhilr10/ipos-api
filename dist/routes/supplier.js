"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const suppliers_1 = require("../controllers/suppliers");
const express_1 = __importDefault(require("express"));
const supplierRouter = express_1.default.Router();
/**
 * @swagger
 * /api/v1/suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     description: Creates a new supplier in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 */
supplierRouter.post("/suppliers", suppliers_1.createSupplier);
/**
 * @swagger
 * /api/v1/suppliers:
 *   get:
 *     summary: Retrieve a list of suppliers
 *     tags: [Suppliers]
 *     description: Retrieve a list of suppliers from the database.
 *     responses:
 *       200:
 *         description: A list of suppliers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
supplierRouter.get("/suppliers", suppliers_1.getSuppliers);
/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   get:
 *     summary: Retrieve a single supplier by ID
 *     tags: [Suppliers]
 *     description: Retrieve a single supplier from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The supplier ID
 *     responses:
 *       200:
 *         description: A single supplier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
 */
supplierRouter.get("/suppliers/:id", suppliers_1.getSingleSupplier);
exports.default = supplierRouter;
