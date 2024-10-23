import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    farmerID: { type: String, required: true },
    fieldName: { type: String, required: true },
    address: { type: String, required: true },
    crop: { type: String, required: true },
  },
  { timestamps: true }
);

export const Field = mongoose.model("field", fieldSchema);
