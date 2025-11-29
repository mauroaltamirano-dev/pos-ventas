import { create } from "zustand";
import {
  SearchProducts,
  ShowProducts,
  DeleteProducts,
  InsertProducts,
  EditProducts,
  CodeGenerator,
} from "../index.js";

export const useProductsStore = create((set, get) => ({
  refetchs: null,

  searcher: "",
  setSearch: (p) => {
    set({ searcher: p });
  },

  productsData: [],
  productsItemSelect: [],
  params: {},

  showProducts: async (p) => {
    console.log("LLEGA refetchs:", p.refetchs);
    const response = await ShowProducts(p);
    set({ params: p });
    set({ productsData: response });
    set({ productsItemSelect: response[0] });
    if (typeof p.refetchs === "function") {
      set({ refetchs: p.refetchs });
    }
    return response;
  },

  selectProducts: (p) => {
    set({ productsItemSelect: p });
  },

  insertProducts: async (p) => {
    const response = await InsertProducts(p);
    const { showProducts } = get();
    const { params } = get();
    set(showProducts(params));
    return response;
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

  searchProducts: async (p) => {
    const response = await SearchProducts(p);
    set({ productsData: response });
    return response;
  },

  generatedCode: 0,
  codeGeneratorProd: () => {
    const response = CodeGenerator({ id: 2 });
    set({ generatedCode: response });
  },
}));
