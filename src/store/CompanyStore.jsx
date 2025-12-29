import { create } from "zustand";
import {
  InsertCompany,
  ShowCompanyForIdUser,
  UpdateCompany,
  UpdateMoneyCompany,
} from "../index.js";

export const useCompanyStore = create((set) => ({
  companyData: [],

  showCompany: async (p) => {
    const response = await ShowCompanyForIdUser(p);
    set({ companyData: response });
    return response;
  },

  insertCompany: async (p) => {
    const response = await InsertCompany(p);
    console.log("Respuesta empresa: ", response);
  },

  editCompany: async (p, fileOld, fileNew) => {
    await UpdateCompany(p, fileOld, fileNew);
  },

  editMoney: async (p) => {
    await UpdateMoneyCompany(p);
  },
}));
