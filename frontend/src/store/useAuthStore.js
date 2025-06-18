import { create } from 'zustand';

const useAuthStore = create((set) => ({
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  setCredentials: (userData) => {
    set({ userInfo: userData });
    localStorage.setItem('userInfo', JSON.stringify(userData));
  },

  logout: () => {
    set({ userInfo: null });
    localStorage.removeItem('userInfo');
  },
}));

const useAuth = () => {
  const { userInfo, setCredentials, logout } = useAuthStore();
  return { userInfo, setCredentials, logout };
};

export { useAuth };
