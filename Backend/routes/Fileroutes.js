import express from "express";
import { getFiles, createFile } from "../controllers/Filecontroller.js";

const router = express.Router();

router.get("/", getFiles);
router.post("/", createFile);

export default router;