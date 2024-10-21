import { Router } from "express";
import { loginFarmer, registerFarmer } from "../services/farmerServices";

export const farmerRoute = Router();

farmerRoute.post("/register", registerFarmer);
farmerRoute.post("/login", loginFarmer);
