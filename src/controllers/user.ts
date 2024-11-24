import { Request, Response } from "express";
import { db } from "@/db/db";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
    role,
  } = req.body;

  try {
    // Check if user already exists(username, email, phone)
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    const existingUserByPhone = await db.user.findUnique({
      where: {
        phone,
      },
    });
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUserByEmail) {
      res.status(401).json({
        error: `Email (${email}) is already taken`,
        data: null,
      });
      return;
    }
    if (existingUserByPhone) {
      res.status(401).json({
        error: `Phone Number (${phone}) is already taken`,
        data: null,
      });
      return;
    }
    if (existingUserByUsername) {
      res.status(401).json({
        error: `Username (${username}) is already taken`,
        data: null,
      });
      return;
    }
    // Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    //Crete user
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        role,
        image: image
          ? image
          : "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
      },
    });
    //Modify returned user
    const { password: savedPassword, ...others } = newUser;

    res.status(201).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const filteredUser = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUser,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        data: null,
        error: "User not found",
      });
    }
    const { password, ...others } = user;
    res.status(200).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}

export async function updateUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      email,
      username,
      firstName,
      lastName,
      password, 
      phone,
      dob,
      gender,
      image,
    } = req.body;

    // Existing user
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        data: null,
        error: "User not found",
      });
    }

    // If email, username, phone are unique
    if (email && email !== existingUser.email) {
      const existingUserByEmail = await db.user.findUnique({
        where: {
          email,
        },
      });
      if (existingUserByEmail) {
        return res.status(401).json({
          error: `Email (${email}) is already taken`,
          data: null,
        });
      }
    }

    if (phone && phone !== existingUser.phone) {
      const existingUserByPhone = await db.user.findUnique({
        where: {
          phone,
        },
      });
      if (existingUserByPhone) {
        return res.status(401).json({
          error: `Phone Number (${phone}) is already taken`,
          data: null,
        });
      }
    }

    if (username && username !== existingUser.username) {
      const existingUserByUsername = await db.user.findUnique({
        where: {
          username,
        },
      });
      if (existingUserByUsername) {
        return res.status(401).json({
          error: `Username (${username}) is already taken`,
          data: null,
        });
      }
    }

    // Hash password if it exists
    let hashedPassword = existingUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    //Update user
    const updateUser = await db.user.update({
      where: {
        id,
      },
      data: {
        email,
        username,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        image,
        password: hashedPassword
      },
    });

    //return update user without password
    const { password:userPass, ...others } = updateUser;
    return res.status(200).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}

export async function updateUserPasswordById(req: Request, res: Response) {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        data: null,
        error: "User not found",
      });
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const updateUser = await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    const { password: savedPassword, ...others } = updateUser;
    return res.status(200).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        data: null,
        error: "User not found",
      });
    }
    const updateUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    await db.user.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}

export async function getAttendants(req: Request, res: Response) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "ATTENDANT",
      },
    });
    const filteredUser = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUser,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
}
