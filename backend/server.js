import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ─── GZIP Compression (reduces server response size by 60–80%) ───────────────
app.use(compression({
  level: 6,           // compression level (1=fastest, 9=best; 6 is a good balance)
  threshold: 1024,    // only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// ─── Security & Performance Headers (Helmet) ─────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // disable so React app can load external scripts
  crossOriginEmbedderPolicy: false,
}));

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ["https://letnexttechnologies.com", "http://localhost:5173"],
  methods: ["GET", "POST"],
  optionsSuccessStatus: 200,
}));

app.use(express.json({ limit: "10kb" }));  // Limit payload to reduce parsing time

// ─── Static Files with Browser Cache (1 year for assets) ─────────────────────
app.use("/uploads", express.static("uploads", {
  maxAge: "1y",       // browser cache — 1 year for uploaded assets
  etag: true,         // enable ETags — allows 304 Not Modified responses
  lastModified: true,
}));

// ─── API Response Cache Header Helper ────────────────────────────────────────
// Adds Cache-Control: public, max-age=60 for GET API responses (1 min)
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.set("Cache-Control", "public, max-age=60");
  }
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/contact", contactRoutes);
app.use("/api/chatbot", chatbotRoutes);

// ─── Server ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

