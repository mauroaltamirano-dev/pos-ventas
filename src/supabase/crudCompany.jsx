import Swal from "sweetalert2";
import { supabase } from "../index.js";

const table = "company";

export async function InsertCompany(p) {
  const { data, error } = await supabase
    .from(table)
    .insert(p)
    .select()
    .maybeSingle();

  if (error) {
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: error.message,
    // });
    return;
  }

  return data;
}

export async function ShowCompanyForIdUser(p) {
  const { data } = await supabase.rpc("showcompanyforiduser", p).maybeSingle();
  return data;
}

export async function UpdateMoneyCompany(p) {
  const { error } = await supabase.from(table).update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error al editar la moneda",
      text: error.message,
    });
    return;
  }
}

export async function UpdateLogoCompany(p) {
  const { error } = await supabase.from(table).update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error al editar el logo",
      text: error.message,
    });
    return;
  }
}

export async function UpdateCompany(p, fileOld, fileNew) {
  const { error } = await supabase.from(table).update(p).eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error al editar la empresa",
      text: error.message,
    });
    return;
  }

  if (fileNew != "-" && fileNew.size != undefined) {
    if (fileOld != "-") {
      await EditIconStorage(p.id, fileNew);
    } else {
      const dataImage = await UploadImageStorage(p.id, fileNew);
      const pEditLogo = {
        logo: dataImage.publicUrl,
        id: p.id,
      };

      await UpdateLogoCompany(pEditLogo);
    }
  }
}

export async function EditIconStorage(id, file) {
  const route = "company/" + id;
  await supabase.storage.from("images").update(route, file, {
    cacheControl: "0",
    upsert: true,
  });
}

async function UploadImageStorage(idCompany, file) {
  const route = "company/" + idCompany;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(route, file, {
      cacheControl: "0",
      upsert: true,
    });

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error al subir la imagen",
      text: error.message,
    });
    return;
  }

  if (data) {
    const { data: urlImage } = await supabase.storage
      .from("images")
      .getPublicUrl(route);

    return urlImage;
  }
}
