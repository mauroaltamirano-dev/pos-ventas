import { create } from "zustand";
import {
  FindProducts,
  ShowProducts,
  DeleteProducts,
  InsertProducts,
  EditProducts,
} from "../index.js";

export const useProductsStore = create((set, get) => ({
  search: "",
  setSearch: (p) => {
    set({ search: p });
  },
  productsData: [],
  productsItemSelect: [],
  params: {},

  showProducts: async (p) => {
    const response = await ShowProducts(p);
    set({ params: p });
    set({ productsData: response });
    set({ productsItemSelect: response[0] });
    return response;
  },

  selectProducts: (p) => {
    set({ productsItemSelect: p });
  },

  insertProducts: async (p, file) => {
    await InsertProducts(p, file);
    const { showProducts } = get();
    const { params } = get();
    set(showProducts(params));
  },

  deleteProducts: async (p) => {
    await DeleteProducts(p);
    const { showProducts } = get();
    const { params } = get();
    set(showProducts(params));
  },

  editProducts: async (p) => {
    await EditProducts(p);
    const { showProducts } = get();
    const { params } = get();
    set(showProducts(params));
  },

  findProducts: async (p) => {
    const response = await FindProducts(p);
    set({ productsData: response });
    return response;
  },
}));
