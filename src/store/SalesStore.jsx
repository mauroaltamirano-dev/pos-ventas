import { create } from "zustand";
import { InsertSales } from "../index.js";

export const useSalesStore = create((set) => ({
  idSale: 0,

  insertSales: async (p) => {
    const result = await InsertSales(p);
    set({ idSale: result?.id });
  },
}));
