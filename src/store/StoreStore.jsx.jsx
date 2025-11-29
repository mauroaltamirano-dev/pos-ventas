import { create } from "zustand";
import {
  InsertStockStore,
  ShowStockStoreForBranch,
  DeleteStockStore,
  EditUseInventoryProducts,
} from "../index.js";

export const useStoreStore = create((set) => ({
  dataStore: [],

  showStore: async (p) => {
    const response = await ShowStockStoreForBranch(p);
    set({ dataStore: response });
    return response;
  },

  insertStockStore: async (p) => {
    await InsertStockStore(p);
  },

  deleteStockStore: async (p) => {
    await DeleteStockStore(p);
  },

  editUseInventory: async (p) => {
    await EditUseInventoryProducts(p);
  },
}));
