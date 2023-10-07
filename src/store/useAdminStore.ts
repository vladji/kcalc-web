import { create } from "zustand";

interface UseAdminStore {
  token: string;
  setToken: (token: string) => void;
}

export const useAdminStore = create<UseAdminStore>((set) => ({
  token: "",
  setToken: (token) => set({ token })
}));
