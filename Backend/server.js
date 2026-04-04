import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileRoutes from "./routes/Fileroutes.js";

dotenv.config();

const app = express();

// FIXED CORS
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/files", fileRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));