"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProductById = exports.getSingleProduct = exports.getProducts = exports.createProduct = void 0;
const db_1 = require("@/db/db");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, batchNumber, barcode, image, tax, alertQty, stockQty, price, buyingPrice, sku, productCode, slug, supplierId, unitId, brandId, categoryId, expiryDate, } = req.body;
        //Check if product already exists
        const existingProductBySlug = yield db_1.db.product.findUnique({
            where: { slug },
        });
        if (existingProductBySlug) {
            res.status(409).json({
                error: `Product ${name} already exists`,
                data: null,
            });
            return;
        }
        const existingProductBySKU = yield db_1.db.product.findUnique({
            where: { sku },
        });
        if (existingProductBySKU) {
            res.status(409).json({
                error: `Product SKU ${sku} already exists`,
                data: null,
            });
            return;
        }
        const existingProductByProductCode = yield db_1.db.product.findUnique({
            where: { sku },
        });
        if (existingProductByProductCode) {
            res.status(409).json({
                error: `Product Code ${productCode} already exists`,
                data: null,
            });
            return;
        }
        if (barcode) {
            const existingProductByBarcode = yield db_1.db.product.findUnique({
                where: { barcode },
            });
            if (existingProductByBarcode) {
                res.status(409).json({
                    error: `Product Barcode ${barcode} already exists`,
                    data: null,
                });
                return;
            }
        }
        const newProduct = yield db_1.db.product.create({
            data: {
                name,
                description,
                batchNumber,
                barcode,
                image,
                tax,
                alertQty,
                stockQty,
                price,
                buyingPrice,
                sku,
                productCode,
                slug,
                supplierId,
                unitId,
                brandId,
                categoryId,
                expiryDate,
            },
        });
        res.status(201).json({
            data: newProduct,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            data: null,
            error: "Something went wrong",
        });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_1.db.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({
            data: products,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            data: null,
            error: "Something went wrong",
        });
    }
});
exports.getProducts = getProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingProduct = yield db_1.db.product.findUnique({
            where: { id },
        });
        if (!existingProduct) {
            res.status(404).json({
                data: null,
                error: "Product does not exist",
            });
            return;
        }
        res.status(200).json({
            data: existingProduct,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            data: null,
            error: "Something went wrong",
        });
    }
});
exports.getSingleProduct = getSingleProduct;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, batchNumber, barcode, image, tax, alertQty, stockQty, price, buyingPrice, sku, productCode, slug, supplierId, unitId, brandId, categoryId, expiryDate, } = req.body;
        const existingProduct = yield db_1.db.product.findUnique({
            where: {
                id,
            },
        });
        if (!existingProduct) {
            res.status(404).json({
                data: null,
                error: "Product not found",
            });
            return;
        }
        // if slug,barcode,sku,productCode are unique
        if (slug && slug !== existingProduct.slug) {
            const existingProductBySlug = yield db_1.db.product.findUnique({
                where: { slug },
            });
            if (existingProductBySlug) {
                res.status(409).json({
                    data: null,
                    error: `Product ${name} already exists`,
                });
                return;
            }
        }
        if (sku && sku !== existingProduct.sku) {
            const existingProductBySKU = yield db_1.db.product.findUnique({
                where: { sku },
            });
            if (existingProductBySKU) {
                res.status(409).json({
                    data: null,
                    error: `Product SKU ${sku} already exists`,
                });
                return;
            }
        }
        if (barcode && barcode !== existingProduct.barcode) {
            const existingProductByBarcode = yield db_1.db.product.findUnique({
                where: { barcode },
            });
            if (existingProductByBarcode) {
                res.status(409).json({
                    data: null,
                    error: `Product Barcode ${barcode} already exists`,
                });
                return;
            }
        }
        if (productCode && productCode !== existingProduct.productCode) {
            const existingProductByProductCode = yield db_1.db.product.findUnique({
                where: { productCode },
            });
            if (existingProductByProductCode) {
                res.status(409).json({
                    data: null,
                    error: `Product Code ${productCode} already exists`,
                });
                return;
            }
        }
        const updatedProduct = yield db_1.db.product.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                batchNumber,
                barcode,
                image,
                tax,
                alertQty,
                stockQty,
                price,
                buyingPrice,
                sku,
                productCode,
                slug,
                supplierId,
                unitId,
                brandId,
                categoryId,
                expiryDate,
            },
        });
        res.status(200).json({
            data: updatedProduct,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong",
            data: null,
        });
    }
});
exports.updateProductById = updateProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield db_1.db.product.findUnique({
            where: {
                id,
            },
        });
        if (!product) {
            res.status(404).json({
                data: null,
                error: "Product not found",
            });
            return;
        }
        yield db_1.db.product.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            success: true,
            error: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Something went wrong",
            data: null,
        });
    }
});
exports.deleteProductById = deleteProductById;
