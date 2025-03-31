// Import required packages
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import { createRequire } from "module";

// Configure dotenv
dotenv.config();

// Initialize Firebase Admin SDK
const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  ),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Create Express app
const app = express();

// ✅ Enhanced CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5179",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5176",
    "http://localhost:5174",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies and credentials
};

// Enable CORS with pre-flight support
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes

// ✅ Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Import and use routes
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ✅ Define the PORT and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
