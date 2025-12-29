import { useQuery } from "@tanstack/react-query";
import {
  SuppliersClientsTemplate,
  useCompanyStore,
  useSuppliersClientsStore,
} from "../index.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function SuppliersClients() {
  const location = useLocation();
  const { companyData } = useCompanyStore();
  const {
    searchSuppliersClients,
    showSuppliersClients,
    setType,
    type,
    search, // El valor del input que viene del store
  } = useSuppliersClientsStore();

  // 1. Efecto para definir el tipo según la URL
  useEffect(() => {
    if (!companyData?.id) return;
    const newType =
      location.pathname === "/configs/clients" ? "client" : "supplier";
    setType(newType);
  }, [location.pathname, companyData?.id]);

  // 2. UNA SOLA QUERY que maneja carga inicial Y búsqueda
  const { isLoading } = useQuery({
    // Agregamos 'search' a la queryKey para que react-query sepa que debe re-ejecutarse al escribir
    queryKey: ["suppliers-clients", companyData?.id, type, search],
    queryFn: () => {
      const params = {
        id_company: companyData?.id,
        type: type,
        searcher: search,
      };

      // Si hay texto en el buscador, usamos la función de búsqueda
      if (search && search.trim() !== "") {
        return searchSuppliersClients(params);
      }

      // Si no hay búsqueda, mostramos todos
      return showSuppliersClients(params);
    },
    // Solo se ejecuta si tenemos la data básica
    enabled: !!companyData?.id && !!type,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <span>Cargando...</span>;

  return <SuppliersClientsTemplate />;
}
