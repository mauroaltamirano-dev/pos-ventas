/* eslint-disable react-refresh/only-export-components */
import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "users";

export async function showUsers(p) {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_auth", p.id_auth)
    .maybeSingle();

  return data;
}

export async function InsertAdmin(p) {
  const { data, error } = await supabase
    .from(table)
    .insert(p)
    .select("*")
    .single();

  if (error) {
    console.error("InsertAdmin error:", error.message);
    return null;
  }

  return data;
}

export async function getIdUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session != null) {
    const { user } = session;
    const idAuth = user.id;

    return idAuth;
  }
}
