import { createContext, useContext, useEffect, useState } from "react";
import {
  supabase,
  ShowUsers,
  InsertCompany,
  InsertAdmin,
  ShowDocumentType,
  ShowRolForName,
} from "../index.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session == null) {
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
    const response = await ShowUsers({ id_auth: id_auth });
    if (response) {
      return;
    } else {
      const responseCompany = await InsertCompany({ id_auth: id_auth });
      const responseDoc = await ShowDocumentType({
        id_company: responseCompany.id,
      });
      const responseRol = await ShowRolForName({ name: "superadmin" });

      const paramsUser = {
        id_documenttype: responseDoc[0].id,
        id_rol: responseRol.id,
        email: email,
        registrationdate: new Date(),
        id_auth: id_auth,
      };
      await InsertAdmin(paramsUser);
    }
  };

  // const insertData = async (id_auth) => {
  //   try {
  //     // 1️⃣ Verificar si el usuario ya existe
  //     const response = await showUsers({ id_auth });

  //     if (existingUser) {
  //       console.log("El usuario ya tiene asignado esta compañía.");
  //       return;
  //     }

  //     // 2️⃣ Crear compañía
  //     const company = await InsertCompany({ id_auth });

  //     // Si falló la creación de company
  //     if (!company || !company.id) {
  //       console.warn("No se pudo crear la compañía. Deteniendo proceso.");
  //       return; // ⛔ Evita errores posteriores
  //     }

  //     // 3️⃣ Esperar el trigger
  //     await new Promise((r) => setTimeout(r, 1500));

  //     // 4️⃣ Obtener documentType de manera segura
  //     const documentType = await ShowDocumentType({ id_company: company.id });

  //     if (!documentType?.[0]?.id) {
  //       console.warn("No se encontró documentType válido.");
  //       return;
  //     }

  //     // 5️⃣ Obtener rol superadmin
  //     const rol = await ShowRolForName({ name: "superadmin" });
  //     if (!rol?.id) {
  //       console.warn("No se encontró rol superadmin.");
  //       return;
  //     }

  //     // 6️⃣ Insertar usuario admin
  //     const paramsUser = {
  //       id_documenttype: documentType[0].id,
  //       id_rol: rol.id,
  //       email,
  //       registrationdate: new Date().toISOString().split("T")[0],
  //       id_auth,
  //     };

  //     const userResponse = await InsertAdmin(paramsUser);
  //     console.log("Usuario insertado:", userResponse);
  //   } catch (error) {
  //     console.error("Error durante insertData:", error);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
