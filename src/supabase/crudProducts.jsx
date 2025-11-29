import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "products";

export async function ShowProducts(p) {
  const { data } = await supabase.rpc("showproducts", {
    _id_company: p.id_company,
  });
  return data;
}

export async function InsertProducts(p) {
  const { data, error } = await supabase.rpc("insertproduct", p);

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

export async function SearchProducts(p) {
  const { data } = await supabase.rpc("searchproduct", {
    _id_company: p.id_company,
    searcher: p.searcher,
  });
  return data;
}

export async function DeleteProducts(p) {
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

export async function EditUseInventoryProducts(p) {
  const { error } = await supabase.from(table).update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
}

export async function EditProducts(p) {
  const { error } = await supabase.rpc("editproducts", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
}
