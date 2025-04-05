// 1. Replace hardcoded URL with environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const fetchWithAuth = async (url, options = {}) => {
  // 2. Handle both relative and absolute paths
  const requestUrl = url.startsWith('/') ? `${API_URL}${url}` : url;

  const response = await fetch(requestUrl, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    } // 3. Removed trailing comma here
  });

  // 4. Improved error handling
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: `HTTP error! status: ${response.status}` };
    }
    throw new Error(errorData.error || "Request failed");
  }

  return response.json();
};

// 5. Updated API methods to use relative paths
export const register = async (email, password, name) => {
  try {
    return await fetchWithAuth('/register', {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.message || "Registration failed");
  }
};

export const login = async (email, password) => {
  try {
    return await fetchWithAuth('/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "Login failed");
  }
};

export const getCurrentUser = async (token) => {
  try {
    return await fetchWithAuth('/me', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    throw new Error(error.message || "Failed to fetch user data");
  }
};