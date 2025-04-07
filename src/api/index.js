// 1. Replace hardcoded URL with environment variable
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://127.0.0.1:5001/h2flow-4ab96/us-central1/api' 
  : 'https://us-central1-h2flow-4ab96.cloudfunctions.net/api';


const fetchWithAuth = async (url, options = {}) => {
  // 2. Handle both relative and absolute paths
  const requestUrl = url.startsWith('/') 
  ? `${API_BASE_URL}${url}`
  : `${API_BASE_URL}/${url}`;

  const response = await fetch(requestUrl, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    }
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
    return await fetchWithAuth('/auth/create', {
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
    return await fetchWithAuth('/auth/login', {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "Login failed");
  }
};


// export const login = async (email, password) => {
  
//     const functionUrl = process.env.NODE_ENV === 'production'
//       ? 'https://api-bifgokfjcq-uc.a.run.app'
//       : 'http://localhost:5001/h2flow-4ab96/us-central1/api';
//   try{
//     const response = await fetch(`${functionUrl}/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });
//     if (!response.ok) throw new Error('Login failed');
//     return await response.json();
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

export const getCurrentUser = async (token) => {
  try {
    return await fetchWithAuth('/auth/me', {
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
