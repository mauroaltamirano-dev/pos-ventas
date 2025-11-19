/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { supabase, ShowUsers } from "../index.js";

export const useAuthStore = create((set) => ({
  loginGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  },

  logoutSession: async () => {
    await supabase.auth.signOut();
  },
}));
