import { create } from "zustand";
import {
  ShowSalesForBranch,
  DeleteSalesUncompleted,
  InsertSales,
} from "../index.js";

export const useSalesStore = create((set, get) => ({
  idSale: 0,
  dataSales: [],

  resetSales: () => {
    set({ idSale: 0 });
  },

  insertSales: async (p) => {
    const result = await InsertSales(p);
    set({ idSale: result?.id });
    return result;
  },

  deleteSalesUncompleted: async (p) => {
    await DeleteSalesUncompleted(p);
    set({ idSale: 0 });
  },

  showSalesForBranch: async (p) => {
    const result = await ShowSalesForBranch(p);
    set({ dataSales: result });
    set({ idSale: result?.id ? result?.id : 0 });
    return result;
  },
}));
