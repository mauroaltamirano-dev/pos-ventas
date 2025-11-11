import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "modules";

export async function showModules() {
  const { data, error } = await supabase.from(table).select();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
  return data;
}
