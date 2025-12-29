import { create } from "zustand";
import {
  InsertStockStore,
  ShowStockStoreForBranch,
  DeleteStockStore,
  EditUseInventoryProducts,
  ShowStoreForBranch,
} from "../index.js";

export const useStoreStore = create((set, get) => ({
  dataStore: [],
  dataStoreForBranchForProduct: [],

  showStore: async (p) => {
    const response = await ShowStockStoreForBranch(p);
    set({ dataStore: response });
    return response;
  },

  showStoreForBranch: async (p) => {
    const response = await ShowStoreForBranch(p);
    set({ dataStoreForBranchForProduct: response });
    const { dataStoreForBranchForProduct } = get();
    return dataStoreForBranchForProduct;
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
