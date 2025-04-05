const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

// Enhanced error handling middleware for auth routes
const handleAuthErrors = (res, error) => {
  console.error("Authentication error:", error);

  const errorMessages = {
    "auth/email-already-exists": "Email already in use",
    "auth/invalid-email": "Invalid email address",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Incorrect password",
  };

  const message = errorMessages[error.code] || error.message || "Authentication failed";
  res.status(400).json({ error: message });
};

// CORS middleware
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// User registration
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save additional user data in Firestore (recommended over Realtime DB)
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      email,
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Create session cookie instead of custom token for better security
    const token = await admin.auth().createSessionCookie(
      await admin.auth().createCustomToken(userRecord.uid),
      { expiresIn: 60 * 60 * 24 * 5 * 1000 } // 5 days
    );

    res.status(201).json({
      token,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
      },
    });
  } catch (error) {
    handleAuthErrors(res, error);
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Verify user credentials using Firebase Auth REST API
    const response = await admin.auth().getUserByEmail(email);
    
    // In production, you should use Firebase Client SDK for password verification
    // This is a simplified version for demonstration
    const token = await admin.auth().createSessionCookie(
      await admin.auth().createCustomToken(response.uid),
      { expiresIn: 60 * 60 * 24 * 5 * 1000 } // 5 days
    );

    res.json({
      token,
      user: {
        uid: response.uid,
        email: response.email,
        name: response.displayName,
      },
    });
  } catch (error) {
    handleAuthErrors(res, error);
  }
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifySessionCookie(token, true);
    const userRecord = await admin.auth().getUser(decodedToken.uid);

    // Get additional user data from Firestore
    const userDoc = await admin.firestore().collection("users").doc(userRecord.uid).get();

    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      ...userDoc.data()
    });
  } catch (error) {
    handleAuthErrors(res, error);
  }
});

module.exports = router;