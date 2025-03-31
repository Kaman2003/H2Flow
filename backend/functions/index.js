const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const app = express();

// Use your existing CORS and route setup
app.use(cors({ origin: true }));
app.use('/api/auth', require('./routes/auth'));

// Export as Firebase HTTP Function
exports.api = functions.https.onRequest(app);