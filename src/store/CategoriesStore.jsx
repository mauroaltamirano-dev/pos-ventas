import { create } from "zustand";
import {
  deleteCategories,
  editCategories,
  InsertCategories,
  searchCategories,
  showCategories,
} from "../index.js";

export const useCategoriesStore = create((set, get) => ({
  search: "",
  dataCategories: [],
  categoriesItemSelect: [],
  params: {},

  setSearch: (p) => set({ search: p }),

  showCategories: async (p) => {
    const response = await showCategories(p);
    set({
      params: p,
      dataCategories: response,
      categoriesItemSelect: response[0] || [],
    });
    return response;
  },

  selectCategory: (p) => set({ categoriesItemSelect: p }),

  insertCategories: async (p, file) => {
    try {
      await InsertCategories(p, file);
      const { showCategories, params } = get();
      if (params) await showCategories(params);
    } catch (err) {
      console.error("Error al insertar categoría:", err);
    }
  },

  deleteCategories: async (p) => {
    try {
      await deleteCategories(p);
      const { showCategories, params } = get();
      if (params) await showCategories(params);
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
    }
  },

  editCategory: async (p, fileold, filenew) => {
    try {
      await editCategories(p, fileold, filenew);
      const { showCategories, params } = get();
      if (params) await showCategories(params);
    } catch (err) {
      console.error("Error al editar categoría:", err);
    }
  },

  searchCategories: async (p) => {
    try {
      const response = await searchCategories(p);
      set({ dataCategories: response });
      return response;
    } catch (err) {
      console.error("Error al buscar categorías:", err);
      return [];
    }
  },
}));
