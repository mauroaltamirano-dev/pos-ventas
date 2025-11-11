import { supabase } from "../index.js";

const table = "roles";

export async function showRolForName(p) {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("name", p.name)
    .maybeSingle();

  return data;
}
