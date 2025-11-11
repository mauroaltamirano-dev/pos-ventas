import { create } from "zustand";
import { InsertCompany, showCompanyForIdUser } from "../index.js";

export const useCompanyStore = create((set) => ({
  companyData: [],

  showCompany: async (p) => {
    const response = await showCompanyForIdUser(p);
    set({ companyData: response });
    return response;
  },

  insertCompany: async (p) => {
    const response = await InsertCompany(p);
    console.log("Respuesta empresa: ", response);
  },
}));
