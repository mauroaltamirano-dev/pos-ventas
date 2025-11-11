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
  setSearch: (p) => {
    set({ search: p });
  },
  dataCategories: [],
  categoriesItemSelect: [],
  params: {},
  showCategories: async (p) => {
    const response = await showCategories(p);
    set({ params: p });
    set({ dataCategories: response });
    set({ categoriesItemSelect: response[0] || [] });
    return response;
  },

  selectCategory: (p) => {
    set({ categoriesItemSelect: p });
  },

  insertCategories: async (p, file) => {
    await InsertCategories(p, file);
    const { showCategories } = get();
    const { params } = get();
    set(showCategories(params));
  },

  deleteCategories: async (p) => {
    await deleteCategories(p);
    const { showCategories } = get();
    const { params } = get();
    set(showCategories(params));
  },

  editCategory: async (p, fileold, filenew) => {
    await editCategories(p, fileold, filenew);
    const { showCategories } = get();
    const { params } = get();
    set(showCategories(params));
  },

  searchCategories: async (p) => {
    const response = await searchCategories(p);
    set({ dataCategories: response });
    return response;
  },
}));
