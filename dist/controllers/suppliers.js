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
exports.getSingleSupplier = exports.getSuppliers = exports.createSupplier = void 0;
const db_1 = require("@/db/db");
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { supplierType, name, contactPerson, phone, email, location, country, website, taxPin, registrationNumber, bankAccountNumber, bankName, paymentTerms, logo, rating, notes, } = req.body;
    try {
        // Check if phone and email are unique
        const existingSupplierByPhone = yield db_1.db.supplier.findUnique({
            where: { phone },
        });
        if (existingSupplierByPhone) {
            res.status(409).json({
                error: `Phone number ${phone} is already in use`,
            });
            return;
        }
        if (email) {
            const existingSupplierByEmail = yield db_1.db.supplier.findUnique({
                where: { email },
            });
            if (existingSupplierByEmail) {
                res.status(409).json({
                    error: `Email ${email} is already in use`,
                });
                return;
            }
        }
        if (registrationNumber) {
            const existingSupplierByRegNo = yield db_1.db.supplier.findUnique({
                where: { registrationNumber },
            });
            if (existingSupplierByRegNo) {
                res.status(409).json({
                    error: `Registration number ${registrationNumber} is already in use`,
                });
                return;
            }
        }
        // Create the supplier
        const newSupplier = yield db_1.db.supplier.create({
            data: {
                supplierType,
                name,
                contactPerson,
                phone,
                email,
                location,
                country,
                website,
                taxPin,
                registrationNumber,
                bankAccountNumber,
                bankName,
                paymentTerms,
                logo,
                rating,
                notes,
            },
        });
        res.status(201).json(newSupplier);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create supplier" });
    }
});
exports.createSupplier = createSupplier;
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suppliers = yield db_1.db.supplier.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json(suppliers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch suppliers" });
    }
});
exports.getSuppliers = getSuppliers;
const getSingleSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const supplier = yield db_1.db.supplier.findUnique({
            where: {
                id,
            },
        });
        if (!supplier) {
            res.status(404).json({ error: "Supplier not found" });
            return;
        }
        res.status(200).json(supplier);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch supplier" });
    }
});
exports.getSingleSupplier = getSingleSupplier;
