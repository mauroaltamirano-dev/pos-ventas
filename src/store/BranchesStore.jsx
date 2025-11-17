import { create } from "zustand";
import { ShowBranches } from "../index.js";

export const useBranchesStore = create((set) => ({
  branchesItemSelect: [],
  selectBranch: (p) => {
    set({ branchesItemSelect: p });
  },
  branches: [],

  showBranches: async (p) => {
    const response = await ShowBranches(p);
    set({ branches: response });
    set({ branchesItemSelect: response[0] });
    return response;
  },
}));
