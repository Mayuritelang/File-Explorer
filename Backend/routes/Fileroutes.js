import express from "express";
import { getFiles } from "../controllers/Filecontroller.js";

const router = express.Router();

router.get("/", getFiles);

export default router;