import { create } from "zustand";
import { getIdUser, showUsers } from "../index.js";

export const useUserStore = create((set) => ({
  users: [],
  showUsers: async () => {
    const idAuth = await getIdUser();

    const response = await showUsers({ id_auth: idAuth });
    set({ users: response });
    return response;
  },
}));
