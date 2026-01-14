"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCustomer = exports.getCustomers = exports.createCustomer = void 0;
const db_1 = require("../db/db");
const createCustomer = async (req, res) => {
    const { customerType, firstName, lastName, phone, country, location, maxCreditLimit, maxCreditDays, taxPin, dob, email, NIN, } = req.body;
    try {
        // Check if phone, email, and NIN are unique
        const existingCustomerByPhone = await db_1.db.customer.findUnique({
            where: { phone },
        });
        if (existingCustomerByPhone) {
            res.status(409).json({
                error: `Phone number ${phone} is already in use`,
            });
            return;
        }
        if (email) {
            const existingCustomerByEmail = await db_1.db.customer.findUnique({
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
            const existingCustomerByNin = await db_1.db.customer.findUnique({
                where: { NIN },
            });
            if (existingCustomerByNin) {
                res.status(409).json({
                    error: `NIN ${NIN} is already in use`,
                });
                return;
            }
        }
        const newCustomer = await db_1.db.customer.create({
            data: {
                customerType,
                firstName,
                lastName,
                phone,
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
};
exports.createCustomer = createCustomer;
const getCustomers = async (req, res) => {
    try {
        const customers = await db_1.db.customer.findMany({
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
};
exports.getCustomers = getCustomers;
const getSingleCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await db_1.db.customer.findUnique({
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
};
exports.getSingleCustomer = getSingleCustomer;
