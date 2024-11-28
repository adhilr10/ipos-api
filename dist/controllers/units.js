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
exports.deleteUnitById = exports.updateUnitById = exports.getSingleUnit = exports.getUnits = exports.createUnit = void 0;
const db_1 = require("@/db/db");
const createUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, abbreviation, slug } = req.body;
        const existingUnit = yield db_1.db.unit.findUnique({
            where: { slug },
        });
        if (existingUnit) {
            res.status(409).json({
                error: `Unit ${name} already exists`,
                data: null,
            });
            return;
        }
        const newUnit = yield db_1.db.unit.create({
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
});
exports.createUnit = createUnit;
const getUnits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const units = yield db_1.db.unit.findMany({
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
});
exports.getUnits = getUnits;
const getSingleUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingUnit = yield db_1.db.unit.findUnique({
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
});
exports.getSingleUnit = getSingleUnit;
const updateUnitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, abbreviation, slug } = req.body;
        // Existing user
        const existingUnit = yield db_1.db.unit.findUnique({
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
            const existingUnitBySlug = yield db_1.db.unit.findUnique({
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
        const updatedUnit = yield db_1.db.unit.update({
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
});
exports.updateUnitById = updateUnitById;
const deleteUnitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const unit = yield db_1.db.unit.findUnique({
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
        yield db_1.db.unit.delete({
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
exports.deleteUnitById = deleteUnitById;
