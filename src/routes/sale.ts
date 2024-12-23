import express from 'express';

import { createSale, createSaleItem, getSales, getShopSales, getShopsSales } from '../controllers/sales';

const saleRouter = express.Router();


saleRouter.post('/sales', createSale);
saleRouter.post('/sales/item', createSaleItem);
saleRouter.get('/sales', getSales);
saleRouter.get('/sales/shop/:shopId', getShopSales);
saleRouter.get('/sales/all-shops', getShopsSales);


export default saleRouter;