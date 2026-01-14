"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shops_1 = require("../controllers/shops");
const express_1 = __importDefault(require("express"));
const shopRouter = express_1.default.Router();
/**
 * @swagger
 * /api/v1/shops:
 *   post:
 *     summary: Create a new shop
 *     tags: [Shops]
 *     description: Creates a new shop in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 */
shopRouter.post("/shops", shops_1.createShop);
/**
 * @swagger
 * /api/v1/shops:
 *   get:
 *     summary: Retrieve a list of shops
 *     tags: [Shops]
 *     description: Retrieve a list of shops from the database.
 *     responses:
 *       200:
 *         description: A list of shops.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 */
shopRouter.get("/shops", shops_1.getShops);
/**
 * @swagger
 * /api/v1/shops/{id}:
 *   get:
 *     summary: Retrieve a single shop by ID
 *     tags: [Shops]
 *     description: Retrieve a single shop from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
 *     responses:
 *       200:
 *         description: A single shop.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found
 */
shopRouter.get("/shops/:id", shops_1.getSingleShop);
/**
 * @swagger
 * /api/v1/attendants/shop/{id}:
 *   get:
 *     summary: Retrieve a list of attendants for a shop
 *     tags: [Shops]
 *     description: Retrieve a list of attendants for a specific shop.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shop ID
 *     responses:
 *       200:
 *         description: A list of attendants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Shop not found
 */
shopRouter.get("/attendants/shop/:id", shops_1.getShopAttendants);
exports.default = shopRouter;
