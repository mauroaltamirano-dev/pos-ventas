import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "sales";

export async function InsertSales(p) {
  const { data, error } = await supabase
    .from(table)
    .insert(p)
    .select()
    .maybeSingle();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  console.log("RESULT INSERT SALES:", data, error);

  return data;
}

export async function DeleteSalesUncompleted(p) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("state", "NEW")
    .eq("id_user", p.id_user);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
}

export async function ShowSalesForBranch(p) {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_branch", p.id_branch)
    .eq("state", "NEW")
    .maybeSingle();

  return data;
}

// export async function EditUseInventoryProducts(p) {
//   const { error } = await supabase.from(table).update(p).eq("id", p.id);

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
