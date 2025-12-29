import { create } from "zustand";
import {
  DeleteDetailSales,
  InsertDetailsSales,
  ShowDetailsSales,
} from "../index.js";

export const useDetailsSalesStore = create((set, get) => ({
  dataDetailsSales: [],
  paramsDetailsSales: {},
  total: 0,

  insertDetailsSales: async (p) => {
    await InsertDetailsSales(p);
    // const { paramsDetailsSales } = get();
    // const response = await get().showDetailsSales(paramsDetailsSales);
    // set({ dataDetailsSales: response });
  },

  showDetailsSales: async (p) => {
    const response = await ShowDetailsSales(p);
    set({ paramsDetailsSales: p });
    set({ dataDetailsSales: response });

    let total = 0;
    response.forEach((item) => {
      const array = Object.values(item);
      total += array[array.length - 1];
    });
    set({ total: total });

    return response;
  },

  deleteDetailSales: async (p) => {
    await DeleteDetailSales(p);
    const { paramsDetailsSales } = get();
    const response = await get().showDetailsSales(paramsDetailsSales);
    set({ dataDetailsSales: response });
  },
}));
