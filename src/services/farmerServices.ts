import { Farmer } from "../models/farmerModel";
import { Request, Response } from "express";
import { hashPassword, verifyPassword } from "../config/password";
import { encryptToken, generateToken } from "../config/token";

export const registerFarmer = async (req: Request, res: Response) => {
  const farmerData = req.body;

  try {
    const farmerExists = await Farmer.findOne({ email: farmerData.email });

    if (!farmerExists) {
      const token = generateToken(farmerData.email);

      const register = await Farmer.create({
        ...farmerData,
        password: await hashPassword(farmerData.password),
        token,
      });

      if (register) {
        res
          .status(201)
          .json({ success: "Farmer registered successfully", register, token });
      } else {
        res.status(500).json({ error: "Failed to register farmer" });
      }
    } else {
      res.status(409).json({ error: "Farmer already registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginFarmer = async (req: Request, res: Response) => {
  const farmerData = req.body;

  try {
    const user = await Farmer.findOne({ email: farmerData.email });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const success = await verifyPassword(user.password, farmerData.password);

    if (!success) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = generateToken(user.email);

    // Update farmer with token
    await Farmer.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({
      success: "Login successful",
      user,
      token: encryptToken(token), // Ensure encryptToken returns the correct value
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
