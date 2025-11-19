import { create } from "zustand";
import { GetIdUser, ShowUsers } from "../index.js";

export const useUserStore = create((set) => ({
  users: [],
  showUsers: async () => {
    const idAuth = await GetIdUser();

    const response = await ShowUsers({ id_auth: idAuth });
    set({ users: response });
    return response;
  },
}));
