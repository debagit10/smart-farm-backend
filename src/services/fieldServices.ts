import { Field } from "../models/fieldModel";
import { Request, Response } from "express";

export const addField = async (req: Request, res: Response) => {
  const fieldData = req.body;

  try {
    const fieldExists = await Field.findOne({
      farmerID: fieldData.farmerID,
      address: fieldData.address,
      crop: fieldData.crop,
    });

    if (fieldExists) {
      return res.status(500).json({ error: "Field exists for Farmer" });
    }

    const field = await Field.create({ ...fieldData });

    if (!field) {
      return res.status(500).json({ error: "Failed to add field" });
    }

    res.status(201).json({ success: "Field added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const editField = async (req: Request, res: Response) => {
  const fieldData = req.body;

  try {
    try {
      const fieldExists = await Field.findOne({ _id: fieldData.fieldID });

      if (!fieldExists) {
        return res
          .status(404)
          .json({ error: "Field does not exist for farmer" });
      }

      const field = await Field.findOneAndUpdate(
        { _id: fieldData.fieldID },
        fieldData,
        { new: true, runValidators: true }
      );

      if (!field) {
        return res.status(500).json({ error: "Failed to update field" });
      }

      return res
        .status(200)
        .json({ success: "Field updated successfully", field });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteField = async (req: Request, res: Response) => {
  const { fieldID } = req.body;

  try {
    const field = await Field.findByIdAndDelete(fieldID);

    if (!field) {
      return res.status(404).json({ error: "Field does not exist for farmer" });
    }

    return res.status(200).json({ success: "Field deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const fieldDetail = async (req: Request, res: Response) => {
  const { fieldID } = req.body;

  try {
    const field = await Field.findById(fieldID);

    if (!field) {
      return res.status(500).json({ error: "Field does not exist" });
    }

    res.status(200).json({ success: field });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
