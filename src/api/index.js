const API_URL = "http://localhost:5000/api/auth";

const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include", // Important for cookies/sessions
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Request failed");
  }

  return response.json();
};

export const register = async (email, password, name) => {
  try {
    return await fetchWithAuth(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    return await fetchWithAuth(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getCurrentUser = async (token) => {
  try {
    return await fetchWithAuth(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};
