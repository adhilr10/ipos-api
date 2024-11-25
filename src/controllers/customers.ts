import { RequestHandler } from "express";
import { db } from "@/db/db";

export const createCustomer: RequestHandler = async (req, res) => {
  const {
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
  } = req.body;
  
  try {
    // Check if phone, email, and NIN are unique
    const existingCustomerByPhone = await db.customer.findUnique({
      where: { phone },
    });
    
    if (existingCustomerByPhone) {
      res.status(409).json({
        error: `Phone number ${phone} is already in use`,
      });
      return;
    }

    if (email) {
      const existingCustomerByEmail = await db.customer.findUnique({
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
      const existingCustomerByNin = await db.customer.findUnique({
        where: { NIN },
      });
      
      if (existingCustomerByNin) {
        res.status(409).json({
          error: `NIN ${NIN} is already in use`,
        });
        return;
      }
    }

    const newCustomer = await db.customer.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
};

export const getCustomers: RequestHandler = async (req, res) => {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    res.status(200).json({
      data: customers,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
};

export const getSingleCustomer: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await db.customer.findUnique({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
};
