import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on load
  useEffect(() => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (response) => {
    if (
      response?.payload?.access_token &&
      response?.payload?.refresh_token &&
      response?.payload?.user_database
    ) {
      localStorage.setItem('accessToken', response.payload.access_token);
      localStorage.setItem('refreshToken', response.payload.refresh_token);
      localStorage.setItem(
        'user',
        JSON.stringify(response.payload.user_database),
      );
      setIsAuthenticated(true);
    } else {
      console.error('Login failed: Missing required payload properties.');
      // Optionally handle the error, e.g., show a message to the user
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout], // Add login and logout to the dependency array
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
