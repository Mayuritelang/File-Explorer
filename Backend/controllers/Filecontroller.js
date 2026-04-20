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

export const createFile = async (req, res) => {
  try {
    const { name, type, parentId } = req.body;

    const newFile = new File({
      name,
      type,
      parentId: parentId || null,
    });

    const saved = await newFile.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};