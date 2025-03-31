import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase/config";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { register, login, getCurrentUser } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const signup = async (email, password, name) => {
    try {
      const data = await register(email, password, name);
      const userCredential = await signInWithCustomToken(auth, data.token);

      setCurrentUser({
        ...userCredential.user,
        name: data.user.name,
      });

      // Return both user and a flag indicating successful registration
      return {
        user: userCredential.user,
        isNewUser: true,
      };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      const userCredential = await signInWithCustomToken(auth, data.token);

      setCurrentUser({
        ...userCredential.user,
        name: data.user.name,
      });

      // Return user data
      return {
        user: userCredential.user,
        isNewUser: false,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get fresh token
          const token = await user.getIdToken();
          // Fetch additional user data
          const userData = await getCurrentUser(token);
          setCurrentUser({
            ...user,
            name: userData.name,
          });
        } catch (error) {
          console.error("Auth state error:", error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login: loginUser,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
