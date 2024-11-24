import { db } from "@/db/db";
import { Request, Response } from "express";

export async function createShop(req: Request, res: Response) {
  try {
    //Get all data
    const { name, slug, location, adminId, attendantIds } = req.body;
    //Shop already exists
    const existingShop = await db.shop.findUnique({
      where: {
        slug,
      },
    });
    if (existingShop) {
      return res.status(409).json({
        error: `Shop ${name} already existing`,
        data: null,
      });
    }
    // Create the shop
    const newShop = await db.shop.create({
      data: {
        name,
        slug,
        location,
        adminId,
        attendantIds,
      },
    });
    //Return created shop
    return res.status(201).json({
      data: newShop,
      error: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}

export async function getShops(req: Request, res: Response) {
  try {
    const shops = await db.shop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      data: shops,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}

export async function getShopAttendants(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existingShop = await db.shop.findUnique({
      where: {
        id,
      },
    });
    if (!existingShop) {
      return res.status(404).json({
        data: null,
        error: "Shop does not exist",
      });
    }

    // get users whose ids are equal to existing shop attendantsIds
    const attendants = await db.user.findMany({
      where: {
        id: {
          in: existingShop.attendantIds,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        image: true,
        phone: true,
        email: true,
      },
    });

    return res.status(200).json({
      data: attendants,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}

export async function getSingleShop(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existingShop = await db.shop.findUnique({
      where: {
        id,
      },
    });
    if (!existingShop) {
      return res.status(404).json({
        data: null,
        error: "Shop does not exist",
      });
    }

 
    return res.status(200).json({
      data: existingShop,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}
