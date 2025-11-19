import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "users";

export async function ShowUsers(p) {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_auth", p.id_auth)
    .maybeSingle();

  return data;
}

export async function InsertAdmin(p) {
  await supabase.from(table).insert(p);
}

export async function GetIdUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session != null) {
    const { user } = session;
    const idAuth = user.id;

    return idAuth;
  }
}
