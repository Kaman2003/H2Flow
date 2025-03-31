const express = require("express");
const admin = require("firebase-admin");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

// Initialize Firebase Admin (use environment variables)
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Your existing routes (auth.js)
const authRouter = require("./backend/routes/auth");
app.use("/api/auth", authRouter);

module.exports.handler = serverless(app);