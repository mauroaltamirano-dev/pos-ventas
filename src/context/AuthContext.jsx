import { createContext, useContext, useEffect, useState } from "react";
import {
  supabase,
  showUsers,
  InsertCompany,
  InsertAdmin,
  showDocumentType,
  showRolForName,
} from "../index.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user === null) {
        setUser(null);
      } else {
        setUser(session?.user);
        insertData(session?.user.id, session?.user.email);
      }
    });
    return () => {
      data.subscription;
    };
  }, []);

  const insertData = async (id_auth, email) => {
    // 1️⃣ Buscar si el usuario ya existe
    const existingUser = await showUsers({ id_auth });
    if (existingUser && existingUser.length > 0) {
      console.log("El usuario ya existe, no se crea nuevamente.");
      return;
    }

    // 2️⃣ Crear compañía
    const company = await InsertCompany({
      id_auth,
    });
    if (!company?.id) {
      console.error("No se pudo crear la compañía.");
      return;
    }

    // 3️⃣ Esperar a que el trigger cree el documenttype (puede tardar unos ms)
    await new Promise((r) => setTimeout(r, 1500));

    const documentType = await showDocumentType({ id_company: company.id });
    if (!documentType?.[0]) {
      console.error(
        "No se encontró documenttype para la compañía:",
        company.id
      );
      return;
    }

    // 4️⃣ Obtener rol "superadmin"
    const rol = await showRolForName({ name: "superadmin" });
    if (!rol?.id) {
      console.error("No se encontró el rol superadmin");
      return;
    }

    console.log({
      company,
      documentType,
      rol,
    });

    // 5️⃣ Crear el usuario
    const paramsUser = {
      id_documenttype: documentType[0].id,
      id_rol: rol.id,
      email,
      registrationdate: new Date().toISOString().split("T")[0],
      id_auth,
    };

    console.log("paramsUser =>", paramsUser);

    const userResponse = await InsertAdmin(paramsUser);
    console.log("Usuario insertado:", userResponse);
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
