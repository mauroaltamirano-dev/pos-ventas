import { supabase } from "../index.js";

const table = "documenttype";

export async function ShowDocumentType({ id_company }) {
  const { data } = await supabase
    .from(table)
    .select("*")
    .eq("id_company", id_company);

  return data;
}
