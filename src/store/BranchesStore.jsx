import { create } from "zustand";
import { ShowAssignBranchForUser, ShowBranches } from "../index.js";

export const useBranchesStore = create((set) => ({
  branchesItemSelect: [],
  selectBranch: (p) => {
    set({ branchesItemSelect: p });
  },
  branches: [],
  branchesAssigns: [],
  branchesItemSelectAssigns: [],

  showBranches: async (p) => {
    const response = await ShowBranches(p);
    set({ branches: response });
    set({ branchesItemSelect: response[0] });
    return response;
  },

  showBranchAssigns: async (p) => {
    const response = await ShowAssignBranchForUser(p);
    set({ branchesAssigns: response });
    set({ branchesItemSelectAssigns: response[0] });
    return response;
  },
}));
