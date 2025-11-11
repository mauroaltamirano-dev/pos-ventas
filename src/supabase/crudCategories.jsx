/* eslint-disable react-refresh/only-export-components */
import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "categories";

export async function InsertCategories(p, file) {
  const { error, data } = await supabase.rpc("insertcategories", p);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  const img = file.size;
  if (img != undefined) {
    const new_id = data;
    const imageUrl = await uploadImage(new_id, file);
    const pEditIcon = {
      icon: imageUrl.publicUrl,
      id: new_id,
    };

    await editIconCategories(pEditIcon);
  }
}

async function uploadImage(categoryId, file) {
  const route = "categories/" + categoryId;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(route, file, {
      cacheControl: "0",
      upsert: false,
    });

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  if (data) {
    const { data: imageUrl } = await supabase.storage
      .from("images")
      .getPublicUrl(route);
    return imageUrl;
  }
}

async function editIconCategories(p) {
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

export async function showCategories(p) {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_company", p.id_company)
    .order("id", { ascending: false });

  return data;
}

export async function searchCategories(p) {
  const { data } = await supabase
    .from("categories")
    .select()
    .eq("id_company", p.id_company)
    .ilike("name", "%" + p.description + "%");

  return data;
}

export async function deleteCategories(p) {
  const { error } = await supabase.from(table).delete().eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  if (p.icon != "-") {
    const route = "/categories/" + p.id;
    await supabase.storage.from("images").remove([route]);
  }
}

export async function editCategories(p, fileold, filenew) {
  const { error } = await supabase.rpc("editcategories", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  if (filenew != "-" && filenew.size != undefined) {
    if (fileold != "-") {
      await editIconStorage(p._id, filenew);
    } else {
      const imageUrl = await uploadImage(p._id, filenew);
      const pEditIcon = {
        icon: imageUrl.publicUrl,
        id: p._id,
      };

      await editIconCategories(pEditIcon);
    }
  }
}

export async function editIconStorage(id, file) {
  const route = "categories/" + id;
  await supabase.storage.from("images").update(route, file, {
    cacheControl: "0",
    upsert: true,
  });
}
