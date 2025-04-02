const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyDq2a_2dZs5wVwcLb8ENx8f_5eeuNLJPd8",
    authDomain: "h2flow-4ab96.firebaseapp.com",
    databaseURL: "https://h2flow-4ab96-default-rtdb.firebaseio.com",
    projectId: "h2flow-4ab96",
    storageBucket: "h2flow-4ab96.firebasestorage.app",
    messagingSenderId: "213685018499",
    appId: "1:213685018499:web:f932223d0e3b203e00a0b6",
    measurementId: "G-V7MQ9ZMS6L"
  };

// Firebase initialization with error handling
let firebaseApp;
try {
  firebaseApp = admin.initializeApp({
    ...firebaseConfig,
    credential: admin.credential.applicationDefault()
  });
  console.log('✅ Firebase Admin initialized');
} catch (err) {
  console.error('🔥 Firebase init error:', err);
  process.exit(1);
}

const app = express();

// Enhanced CORS configuration
app.use(cors({ 
  origin: [
    'https://h2-flow.com',
    'https://www.h2-flow.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// For local development only - port fallback handling
if (process.env.NODE_ENV === 'development') {
  function startServer(port = 5001) {
    const server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} busy, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });
  }
  
  startServer();
} else {
  // Production - export as Firebase HTTP Function
  exports.api = functions.https.onRequest(app);
}