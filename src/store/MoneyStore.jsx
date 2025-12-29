import { create } from "zustand";

export const useMoneyStore = create((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  // Renombré la variable a "selectedCountry" para coincidir con la lógica del componente
  selectedCountry: null,
  setSelectedCountry: (p) => set({ selectedCountry: p }),
}));
