import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    farmName: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

export const Farmer = mongoose.model("farmer", farmerSchema);
