import mongoose from "mongoose";
import File from "../models/File.js";

export const getFiles = async (req, res) => {
  try {
    const parentId = req.query.parentId;

    const query = parentId
      ? { parentId: new mongoose.Types.ObjectId(parentId) }
      : { parentId: null };

    const files = await File.find(query);

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};