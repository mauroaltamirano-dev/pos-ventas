import { create } from "zustand";
import {
  DeleteSuppliersClients,
  EditSuppliersClients,
  InsertSuppliersClients,
  SearchSuppliersClients,
  ShowSuppliersClients,
  useCompanyStore,
} from "../index.js";

export const useSuppliersClientsStore = create((set, get) => ({
  type: "",
  setType: (p) => set({ type: p }),
  search: "",
  setSearch: (p) => set({ search: p }),
  dataSuppliersClients: [],
  suppliersClientsItemSelect: [],
  params: {},

  showSuppliersClients: async (p) => {
    const response = await ShowSuppliersClients(p);
    set({ params: p });
    set({ dataSuppliersClients: response });
    return response;
  },

  selectSuppliersClients: (p) => set({ suppliersClientsItemSelect: p }),

  insertSuppliersClients: async (p) => {
    await InsertSuppliersClients(p);
    const { showSuppliersClients, type } = get();
    const { companyData } = useCompanyStore.getState();
    await showSuppliersClients({
      id_company: companyData.id,
      type,
    });
  },

  deleteSuppliersClients: async (p) => {
    await DeleteSuppliersClients(p);
    const { showSuppliersClients, params } = get();
    await showSuppliersClients(params);
  },

  editSuppliersClients: async (p, fileold, filenew) => {
    await EditSuppliersClients(p, fileold, filenew);
    const { showSuppliersClients, params } = get();
    await showSuppliersClients(params);
  },

  searchSuppliersClients: async (p) => {
    const response = await SearchSuppliersClients(p);
    set({
      dataSuppliersClients: response,
    });
    return response;
  },
}));
