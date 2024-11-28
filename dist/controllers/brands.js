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
exports.deleteBrandById = exports.updateBrandById = exports.getSingleBrand = exports.getBrands = exports.createBrand = void 0;
const db_1 = require("@/db/db");
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, abbreviation, slug } = req.body;
        const existingBrand = yield db_1.db.brand.findUnique({
            where: { slug },
        });
        if (existingBrand) {
            res.status(409).json({
                error: `Brand ${name} already exists`,
                data: null,
            });
            return;
        }
        const newBrand = yield db_1.db.brand.create({
            data: { name, slug },
        });
        res.status(201).json({
            data: newBrand,
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
exports.createBrand = createBrand;
const getBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield db_1.db.brand.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({
            data: brands,
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
exports.getBrands = getBrands;
const getSingleBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingBrand = yield db_1.db.brand.findUnique({
            where: { id },
        });
        if (!existingBrand) {
            res.status(404).json({
                data: null,
                error: "Brand does not exist",
            });
            return;
        }
        res.status(200).json({
            data: existingBrand,
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
exports.getSingleBrand = getSingleBrand;
const updateBrandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, abbreviation, slug } = req.body;
        const existingBrand = yield db_1.db.brand.findUnique({
            where: {
                id,
            },
        });
        if (!existingBrand) {
            res.status(404).json({
                data: null,
                error: "Brand not found",
            });
            return;
        }
        if (slug && slug !== existingBrand.slug) {
            const existingBrandBySlug = yield db_1.db.brand.findUnique({
                where: { slug },
            });
            if (existingBrandBySlug) {
                res.status(409).json({
                    data: null,
                    error: "Brand already exists",
                });
                return;
            }
        }
        const updatedBrand = yield db_1.db.brand.update({
            where: {
                id,
            },
            data: {
                name,
                slug,
            },
        });
        res.status(200).json({
            data: updatedBrand,
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
exports.updateBrandById = updateBrandById;
const deleteBrandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const brand = yield db_1.db.brand.findUnique({
            where: {
                id,
            },
        });
        if (!brand) {
            res.status(404).json({
                data: null,
                error: "Brand not found",
            });
            return;
        }
        yield db_1.db.brand.delete({
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
exports.deleteBrandById = deleteBrandById;
