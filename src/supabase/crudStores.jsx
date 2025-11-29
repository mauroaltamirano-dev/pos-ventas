import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "store";

export async function InsertStockStore(p) {
  const { error } = await supabase.from(table).insert(p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
}

export async function ShowStockStoreForBranch(p) {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_branch", p.id_branch)
    .eq("id_product", p.id_product)
    .maybeSingle();

  return data;
}

export async function DeleteStockStore(p) {
  const { error } = await supabase.from(table).delete().eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Este registro no se permite modificar ya que es valor por defecto.",
      footer: '<a href="">...</a>',
    });
    return;
  }
}
