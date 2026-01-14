"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryById = exports.updateCategoryById = exports.getSingleCategory = exports.getCategories = exports.createCategory = void 0;
const db_1 = require("../db/db");
const createCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const existingCategory = await db_1.db.category.findUnique({
            where: { slug },
        });
        if (existingCategory) {
            res.status(409).json({
                error: `Category ${name} already exists`,
                data: null,
            });
            return;
        }
        const newCategory = await db_1.db.category.create({
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
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    try {
        const categories = await db_1.db.category.findMany({
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
};
exports.getCategories = getCategories;
const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const existingCategory = await db_1.db.category.findUnique({
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
};
exports.getSingleCategory = getSingleCategory;
const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug } = req.body;
        const existingCategory = await db_1.db.category.findUnique({
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
            const existingCategoryBySlug = await db_1.db.category.findUnique({
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
        const updatedCategory = await db_1.db.category.update({
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
};
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await db_1.db.category.findUnique({
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
        await db_1.db.category.delete({
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
};
exports.deleteCategoryById = deleteCategoryById;
