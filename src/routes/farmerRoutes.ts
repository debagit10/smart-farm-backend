import { Router } from "express";
import {
  deleteFarmer,
  editFarmer,
  farmerField,
  loginFarmer,
  registerFarmer,
} from "../services/farmerServices";

export const farmerRoute = Router();

farmerRoute.post("/register", registerFarmer);
farmerRoute.post("/login", loginFarmer);
farmerRoute.patch("/edit", editFarmer);
farmerRoute.delete("/delete", deleteFarmer);
farmerRoute.get("/fields", farmerField);
