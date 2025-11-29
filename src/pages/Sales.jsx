import { useQuery } from "@tanstack/react-query";
import { SalesTemplate, useCompanyStore, useProductsStore } from "../index.js";

export function Sales() {
  const { companyData } = useCompanyStore();
  const { searchProducts, searcher } = useProductsStore();

  const {} = useQuery({
    queryKey: ["Buscar Productos", searcher],
    queryFn: () =>
      searchProducts({ id_company: companyData?.id, searcher: searcher }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  return <SalesTemplate />;
}
