/* eslint-disable react-refresh/only-export-components */
import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "company";

export async function InsertCompany(p) {
  const { data, error } = await supabase
    .from(table)
    .insert(p)
    .select()
    .maybeSingle();

  if (error) {
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: error.message,
    // });
    return;
  }

  return data;
}

export async function showCompanyForIdUser(p) {
  const { data } = await supabase.rpc("showcompanyforiduser", p).maybeSingle();
  return data;
}
