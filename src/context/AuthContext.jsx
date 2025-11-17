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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session?.user) {
          setUser(null);
        } else {
          setUser(session.user);
          insertData(session.user.id, session.user.email);
        }
      }
    );

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  const insertData = async (id_auth, email) => {
    try {
      // 1️⃣ Verificar si el usuario ya existe
      const existingUser = await showUsers({ id_auth });

      if (existingUser) {
        console.log("El usuario ya tiene asignado esta compañía.");
        return;
      }

      // 2️⃣ Crear compañía
      const company = await InsertCompany({ id_auth });

      // Si falló la creación de company
      if (!company || !company.id) {
        console.warn("No se pudo crear la compañía. Deteniendo proceso.");
        return; // ⛔ Evita errores posteriores
      }

      // 3️⃣ Esperar el trigger
      await new Promise((r) => setTimeout(r, 1500));

      // 4️⃣ Obtener documentType de manera segura
      const documentType = await showDocumentType({ id_company: company.id });

      if (!documentType?.[0]?.id) {
        console.warn("No se encontró documentType válido.");
        return;
      }

      // 5️⃣ Obtener rol superadmin
      const rol = await showRolForName({ name: "superadmin" });
      if (!rol?.id) {
        console.warn("No se encontró rol superadmin.");
        return;
      }

      // 6️⃣ Insertar usuario admin
      const paramsUser = {
        id_documenttype: documentType[0].id,
        id_rol: rol.id,
        email,
        registrationdate: new Date().toISOString().split("T")[0],
        id_auth,
      };

      const userResponse = await InsertAdmin(paramsUser);
      console.log("Usuario insertado:", userResponse);
    } catch (error) {
      console.error("Error durante insertData:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
