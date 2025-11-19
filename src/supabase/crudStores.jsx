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

// export async function FindProducts(p) {
//   const { data } = await supabase
//     .from(table)
//     .select()
//     .eq("id_company", p.id_company)
//     .ilike("name", "%" + p.Products + "%");
//   return data;
// }

// export async function DeleteProducts(p) {
//   const { error } = await supabase.from(table).delete().eq("id", p.id);

//   if (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: error.message,
//     });
//     return;
//   }
// }

// export async function EditProducts(p) {
//   const { error } = await supabase.rpc("editproducts", p);
//   if (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: error.message,
//     });
//     return;
//   }
// }
