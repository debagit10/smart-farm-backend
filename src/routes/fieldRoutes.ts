import { Router } from "express";
import {
  addField,
  deleteField,
  editField,
  fieldDetail,
} from "../services/fieldServices";

export const fieldRoute = Router();

fieldRoute.post("/add", addField);
fieldRoute.patch("/edit", editField);
fieldRoute.delete("/delete", deleteField);
fieldRoute.get("/detail", fieldDetail);
