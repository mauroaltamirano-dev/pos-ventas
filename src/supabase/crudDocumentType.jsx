import { supabase } from "../index.js";

const table = "documenttype";

export async function showDocumentType({ id_company }) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id_company", id_company);

  if (error) {
    console.error("showDocumentType error:", error.message);
    return [];
  }

  console.log("showDocumentType data:", data);
  return data;
}
