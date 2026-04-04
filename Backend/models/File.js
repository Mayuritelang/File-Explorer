import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["file", "folder"],
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    default: null,
  },
});

export default mongoose.model("File", fileSchema);