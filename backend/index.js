// Import required packages
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import { fileURLToPath } from 'url';
import path from 'path';

// Environment Configuration
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 🔥 Firebase Admin Initialization (Secure Method)
const initializeFirebase = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log('✅ Firebase Admin initialized');
  } catch (error) {
    console.error('🔥 Firebase initialization error:', error);
    process.exit(1); // Exit if Firebase fails
  }
};

initializeFirebase();

// 🚀 Express App Setup
const app = express();

// 🔒 Enhanced Security Middleware
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'H2-Flow');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// 🌐 CORS Configuration (Dynamic Origins)
const allowedOrigins = [
  ...process.env.ALLOWED_ORIGINS.split(','),
  ...['http://localhost:3000', 'http://localhost:5173']
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 📦 Body Parser Configuration
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// 🛡️ Rate Limiting (Example)
import rateLimit from 'express-rate-limit';
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);

// 🚦 Routes
app.use('/api/auth', authRoutes);

// ✅ Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString() 
  });
});

// 🚨 Error Handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  // Handle CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({ error: 'Forbidden by CORS' });
  }

  // Firebase-specific errors
  if (err.code && err.code.startsWith('auth/')) {
    return res.status(401).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 🚀 Server Startup
const PORT = process.env.PORT || 5003;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

export { app };