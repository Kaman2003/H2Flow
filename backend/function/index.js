// Use either CommonJS (recommended for Firebase) or ES Modules, not both
// CommonJS version (recommended):

const dotenv = require('dotenv');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const net = require('net');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');

// Environment Configuration
dotenv.config();
const PORT = process.env.PORT || 3000;

// Express App Setup
const app = express();

// Firebase Admin Initialization
const initializeFirebase = () => {
  try {
    const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: privateKey.includes('BEGIN PRIVATE KEY') 
          ? privateKey 
          : `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`
      }),
      databaseURL: process.env.DATABASE_URL,
      // storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log('✅ Firebase Admin initialized');
  } catch (error) {
    console.error('🔥 Firebase initialization error:', error);
    process.exit(1);
  }
};

// initializeFirebase();


// Enhanced Security Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', import.meta.env.VITE_CLIENT_URL || 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// CORS Configuration
const allowedOrigins = [
  'https:www.h2-flow.com',
  'https:h2-flow.com',
  'http://localhost:3000', 
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

//Import and use auth routes
// const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Error Handling
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

exports.api = functions.https.onRequest(app);
  // .runWith({
  //   memory: '1GB',
  //   timeoutSeconds: 60,
  //   minInstances: 0,
  //   maxInstances: 3
  // })
  // .https.onRequest(app);

// For local testing (emulator)
if (process.env.FUNCTIONS_EMULATOR === 'true') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on port ${PORT}`);
    console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
  });
}