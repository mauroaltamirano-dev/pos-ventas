import { create } from "zustand";
import { supabase, showUsers } from "../index.js";

export const useAuthStore = create((set) => ({
  loginGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("data user", data);
    // if (data) {
    //   await showUsers({ id_auth: data });
    // }
  },

  logoutSession: async () => {
    await supabase.auth.signOut();
  },
}));
