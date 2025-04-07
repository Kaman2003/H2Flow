// Use either CommonJS (recommended for Firebase) or ES Modules, not both
// CommonJS version (recommended):
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Environment Configuration
dotenv.config();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin (only if not already initialized)
if (!admin.apps.length) {
    try {
        admin.initializeApp();
        console.log('✅ Firebase Admin initialized');
    } catch (error) {
        console.error('🔥 Firebase initialization error:', error);
    }
} else {
    console.log('⚠️ Firebase Admin already initialized');
}

// Express App Setup
const app = express();

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://www.h2-flow.com',
    'https://h2-flow.com',
    'https://h2-flow.netlify.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Body Parser Configuration
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', apiLimiter);

// Import and use auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);

    if (err.message.includes('CORS')) {
        return res.status(403).json({ error: 'Forbidden by CORS' });
    }

    if (err.code && err.code.startsWith('auth/')) {
        return res.status(401).json({ error: err.message });
    }

    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'Something went wrong!'
            : err.message
    });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    console.log('✅ Health check endpoint accessed');
    res.json({
        status: 'working',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Root Endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'SmartSip API is running',
        endpoints: [
            '/api/auth/create',
            '/api/auth/login',
            '/api/auth/me',
            '/api/health'
        ]
    });
});

exports.api = functions.https.onRequest(app);
