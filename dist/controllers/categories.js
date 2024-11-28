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
exports.deleteCategoryById = exports.updateCategoryById = exports.getSingleCategory = exports.getCategories = exports.createCategory = void 0;
const db_1 = require("@/db/db");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, slug } = req.body;
        const existingCategory = yield db_1.db.category.findUnique({
            where: { slug },
        });
        if (existingCategory) {
            res.status(409).json({
                error: `Category ${name} already exists`,
                data: null,
            });
            return;
        }
        const newCategory = yield db_1.db.category.create({
            data: { name, slug },
        });
        res.status(201).json({
            data: newCategory,
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
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield db_1.db.category.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({
            data: categories,
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
exports.getCategories = getCategories;
const getSingleCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingCategory = yield db_1.db.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            res.status(404).json({
                data: null,
                error: "Category does not exist",
            });
            return;
        }
        res.status(200).json({
            data: existingCategory,
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
exports.getSingleCategory = getSingleCategory;
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, slug } = req.body;
        const existingCategory = yield db_1.db.category.findUnique({
            where: {
                id,
            },
        });
        if (!existingCategory) {
            res.status(404).json({
                data: null,
                error: "Category not found",
            });
            return;
        }
        if (slug && slug !== existingCategory.slug) {
            const existingCategoryBySlug = yield db_1.db.category.findUnique({
                where: { slug },
            });
            if (existingCategoryBySlug) {
                res.status(409).json({
                    data: null,
                    error: "Category already exists",
                });
                return;
            }
        }
        const updatedCategory = yield db_1.db.category.update({
            where: {
                id,
            },
            data: {
                name,
                slug,
            },
        });
        res.status(200).json({
            data: updatedCategory,
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
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield db_1.db.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            res.status(404).json({
                data: null,
                error: "Category not found",
            });
            return;
        }
        yield db_1.db.category.delete({
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
exports.deleteCategoryById = deleteCategoryById;
