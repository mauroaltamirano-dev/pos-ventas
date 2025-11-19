/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { InsertStockStore } from "../index.js";

export const useStoreStore = create((set) => ({
  insertStockStore: async (p) => {
    await InsertStockStore(p);
  },
}));
