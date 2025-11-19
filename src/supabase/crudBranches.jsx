import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "branches";

export async function ShowBranches(p) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id_company", p.id_company);

  // if (error) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: error.message,
  //   });
  //   return;
  // }
  return data;
}
