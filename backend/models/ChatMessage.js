import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    from: { type: String, enum: ["user", "bot"], required: true },
    text: { type: String, required: true },
    sessionId: { type: String, required: true },
    isVoice: { type: Boolean, default: false },
    fileName: { type: String, default: null },
    voicePath: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
