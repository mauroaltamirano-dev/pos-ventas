import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "suppliers_clients";

export async function InsertSuppliersClients(p) {
  // Asegúrate de retornar el error para que el Store lo vea
  const { data, error } = await supabase.rpc("insertsuppliersclients", p);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function ShowSuppliersClients(p) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id_company", p.id_company)
    .eq("type", p.type);

  if (error) {
    return;
  }

  return data;
}

export async function SearchSuppliersClients(p) {
  // Cambiamos p.searcher por p.search para que coincida con el componente
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id_company", p.id_company)
    .eq("type", p.type)
    .ilike("name", `%${p.search}%`); // <--- AQUÍ ESTÁ EL CAMBIO

  if (error) {
    console.error("Error en búsqueda:", error.message);
    return [];
  }

  return data;
}

export async function DeleteSuppliersClients(p) {
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

export async function EditSuppliersClients(p) {
  const { error } = await supabase.rpc("editsuppliersclients", p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: error.message,
      text: error.message,
    });
    return;
  }
}
