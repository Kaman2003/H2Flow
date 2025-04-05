const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Initialize Firebase
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Import your routes
const authRouter = require('../routes/auth');
app.use('/auth', authRouter);

// Export as Vercel serverless function
module.exports = app;

// Also export as Firebase function
exports.api = functions.https.onRequest(app);