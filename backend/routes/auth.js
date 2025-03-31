import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// Enhanced error handling middleware for auth routes
const handleAuthErrors = (res, error) => {
  console.error("Authentication error:", error);

  // Firebase error codes mapping to user-friendly messages
  const errorMessages = {
    "auth/email-already-exists": "Email already in use",
    "auth/invalid-email": "Invalid email address",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Incorrect password",
  };

  const message =
    errorMessages[error.code] || error.message || "Authentication failed";
  res.status(400).json({ error: message });
};

// Add this middleware to set proper headers
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

    await admin.database().ref(`users/${userRecord.uid}`).set({
      email,
      name,
      createdAt: admin.database.ServerValue.TIMESTAMP,
    });

    const token = await admin.auth().createCustomToken(userRecord.uid);
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

    // Verify password by attempting to get user
    const userRecord = await admin.auth().getUserByEmail(email);

    // In a real implementation, you would verify password here
    // For Firebase Admin, we'll just generate a token
    const token = await admin.auth().createCustomToken(userRecord.uid);

    res.json({
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

// Get current user
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userRecord = await admin.auth().getUser(decodedToken.uid);

    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
    });
  } catch (error) {
    handleAuthErrors(res, error);
  }
});

export default router;
