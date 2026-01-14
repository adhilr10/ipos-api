"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUnitById = exports.updateUnitById = exports.getSingleUnit = exports.getUnits = exports.createUnit = void 0;
const db_1 = require("../db/db");
const createUnit = async (req, res) => {
    try {
        const { name, abbreviation, slug } = req.body;
        const existingUnit = await db_1.db.unit.findUnique({
            where: { slug },
        });
        if (existingUnit) {
            res.status(409).json({
                error: `Unit ${name} already exists`,
                data: null,
            });
            return;
        }
        const newUnit = await db_1.db.unit.create({
            data: { name, slug, abbreviation },
        });
        res.status(201).json({
            data: newUnit,
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
exports.createUnit = createUnit;
const getUnits = async (req, res) => {
    try {
        const units = await db_1.db.unit.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({
            data: units,
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
exports.getUnits = getUnits;
const getSingleUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUnit = await db_1.db.unit.findUnique({
            where: { id },
        });
        if (!existingUnit) {
            res.status(404).json({
                data: null,
                error: "Unit does not exist",
            });
            return;
        }
        res.status(200).json({
            data: existingUnit,
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
exports.getSingleUnit = getSingleUnit;
const updateUnitById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, abbreviation, slug } = req.body;
        // Existing user
        const existingUnit = await db_1.db.unit.findUnique({
            where: {
                id,
            },
        });
        if (!existingUnit) {
            res.status(404).json({
                data: null,
                error: "Unit not found",
            });
            return;
        }
        if (slug && slug !== existingUnit.slug) {
            const existingUnitBySlug = await db_1.db.unit.findUnique({
                where: { slug },
            });
            if (existingUnitBySlug) {
                res.status(409).json({
                    data: null,
                    error: "Unit already exists",
                });
                return;
            }
        }
        //Update unit
        const updatedUnit = await db_1.db.unit.update({
            where: {
                id,
            },
            data: {
                name,
                abbreviation,
                slug,
            },
        });
        res.status(200).json({
            data: updatedUnit,
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
exports.updateUnitById = updateUnitById;
const deleteUnitById = async (req, res) => {
    const { id } = req.params;
    try {
        const unit = await db_1.db.unit.findUnique({
            where: {
                id,
            },
        });
        if (!unit) {
            res.status(404).json({
                data: null,
                error: "Unit not found",
            });
            return;
        }
        await db_1.db.unit.delete({
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
exports.deleteUnitById = deleteUnitById;
