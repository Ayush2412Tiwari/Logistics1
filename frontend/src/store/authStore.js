import { create } from 'zustand';
import { authAPI } from '../api';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  // Check if user is already logged in (on app load)
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const { data } = await authAPI.getMe();
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await authAPI.login(credentials);
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await authAPI.register(userData);
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
