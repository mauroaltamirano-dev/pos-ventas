import { create } from "zustand";
import { showModules } from "../index.js";

export const useModuleStore = create((set) => ({
  modules: [],
  showModules: async () => {
    const response = await showModules();
    set({ modules: response });
    return response;
  },
}));
