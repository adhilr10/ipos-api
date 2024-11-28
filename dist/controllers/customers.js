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
exports.getSingleCustomer = exports.getCustomers = exports.createCustomer = void 0;
const db_1 = require("@/db/db");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerType, firstName, lastName, phone, gender, country, location, maxCreditLimit, maxCreditDays, taxPin, dob, email, NIN, } = req.body;
    try {
        // Check if phone, email, and NIN are unique
        const existingCustomerByPhone = yield db_1.db.customer.findUnique({
            where: { phone },
        });
        if (existingCustomerByPhone) {
            res.status(409).json({
                error: `Phone number ${phone} is already in use`,
            });
            return;
        }
        if (email) {
            const existingCustomerByEmail = yield db_1.db.customer.findUnique({
                where: { email },
            });
            if (existingCustomerByEmail) {
                res.status(409).json({
                    error: `Email ${email} is already in use`,
                });
                return;
            }
        }
        if (NIN) {
            const existingCustomerByNin = yield db_1.db.customer.findUnique({
                where: { NIN },
            });
            if (existingCustomerByNin) {
                res.status(409).json({
                    error: `NIN ${NIN} is already in use`,
                });
                return;
            }
        }
        const newCustomer = yield db_1.db.customer.create({
            data: {
                customerType,
                firstName,
                lastName,
                phone,
                gender,
                country,
                location,
                maxCreditLimit,
                maxCreditDays,
                taxPin,
                dob,
                email,
                NIN,
            },
        });
        res.status(201).json({
            data: newCustomer,
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
exports.createCustomer = createCustomer;
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield db_1.db.customer.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json({
            data: customers,
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
exports.getCustomers = getCustomers;
const getSingleCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const customer = yield db_1.db.customer.findUnique({
            where: { id },
        });
        if (!customer) {
            res.status(404).json({
                data: null,
                error: "Customer not found",
            });
            return;
        }
        res.status(200).json({
            data: customer,
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
exports.getSingleCustomer = getSingleCustomer;
