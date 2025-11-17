import { create } from "zustand";
import { ShowModules } from "../index.js";

export const useModuleStore = create((set) => ({
  modules: [],
  showModules: async () => {
    const response = await ShowModules();
    set({ modules: response });
    return response;
  },
}));
