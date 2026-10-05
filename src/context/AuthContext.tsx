import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserDTO, AuthLoginRequest } from '../../contracts';
import { api, tokenStorage } from '../services/api';

interface AuthContextType {
  user: UserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.get();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const currentUser = await api.auth.me();
        setUser(currentUser);
      } catch {
        tokenStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials: AuthLoginRequest) => {
    setIsLoading(true);
    try {
      const res = await api.auth.login(credentials);
      tokenStorage.set(res.token);
      setUser(res.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // Ignored
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
