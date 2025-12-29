import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "details_sale";

export async function InsertDetailsSales(p) {
  const { error } = await supabase.rpc("insertsalesdetails", p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
}

export async function ShowDetailsSales(p) {
  console.log("id_sale", p.id_sale);
  const { data, error } = await supabase.rpc("showdetailssale", {
    _id_sale: p.id_sale,
  });

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

// export async function SearchProducts(p) {
//   const { data } = await supabase.rpc("searchproduct", {
//     _id_company: p.id_company,
//     searcher: p.searcher,
//   });
//   return data;
// }

export async function DeleteDetailSales(p) {
  const { error } = await supabase.from(table).delete().eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
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
