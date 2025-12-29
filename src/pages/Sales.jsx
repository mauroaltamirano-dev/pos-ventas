import { useQuery } from "@tanstack/react-query";
import {
  SalesTemplate,
  Spinner1,
  Spinner2,
  useBranchesStore,
  useCompanyStore,
  useProductsStore,
  useSalesStore,
  useStoreStore,
} from "../index.js";

export function Sales() {
  const { companyData } = useCompanyStore();
  const { searchProducts, searcher } = useProductsStore();
  const { showStoreForBranch } = useStoreStore();
  const { branchesItemSelectAssigns } = useBranchesStore();
  const { showSalesForBranch } = useSalesStore();

  useQuery({
    queryKey: ["Buscar Productos", searcher],
    queryFn: () =>
      searchProducts({ id_company: companyData?.id, searcher: searcher }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  const { isLoading, error } = useQuery({
    queryKey: ["Mostrar Store por Branch", branchesItemSelectAssigns.id_branch],
    queryFn: () =>
      showStoreForBranch({
        id_branch: branchesItemSelectAssigns.id_branch,
      }),
    enabled: !!branchesItemSelectAssigns?.id_branch,
  });

  if (isLoading) return <Spinner2 text="Cargando ventas..." />;

  if (error) return <span>Hubo un error: {error.message}</span>;

  return <SalesTemplate />;
}
