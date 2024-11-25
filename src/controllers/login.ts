import { Request, Response } from "express";
import { db } from "@/db/db";
import bcrypt from "bcrypt";
import { generateAccessToken } from "@/utils/generateJWT";

export async function authorizeUser(req: Request, res: Response) {
  const { email, username, password } = req.body;

  try {
    let existingUser = null;
    if (email) {
      existingUser = await db.user.findUnique({
        where: {
          email,
        },
      });
    }
    if (username) {
      existingUser = await db.user.findUnique({
        where: {
          username,
        },
      });
    }
    if (!existingUser) {
      return res.status(403).json({ error: "User not found" });
    }

    //check if password is correct
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(403).json({ error: "Wrong credentials" });
    }

    // Destructure out the password from the existing user
    const { password: userPassword, ...userWithoutPassword } = existingUser;
    const accessToken = generateAccessToken(userWithoutPassword);
    const result = {
      ...userWithoutPassword,
      accessToken,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to authorize user" });
  }
}
