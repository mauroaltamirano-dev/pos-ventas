/* eslint-disable no-empty-pattern */
import { useQuery } from "@tanstack/react-query";
import {
  ProductsTemplate,
  Spinner1,
  useProductsStore,
  useCompanyStore,
  useBranchesStore,
  useCategoriesStore,
} from "../index.js";

export function Products() {
  const { showProducts, searchProducts, searcher, setRefetch } =
    useProductsStore();
  const { showBranches } = useBranchesStore();
  const { companyData } = useCompanyStore();
  const { showCategories } = useCategoriesStore();
  const { isLoading, error, refetch } = useQuery({
    queryKey: ["Mostrar productos", companyData?.id],
    queryFn: () =>
      showProducts({ id_company: companyData?.id, refetchs: refetch }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["Buscar Productos", searcher],
    queryFn: () =>
      searchProducts({ id_company: companyData?.id, searcher: searcher }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  // show branches
  useQuery({
    queryKey: ["Mostrar sucursales", companyData?.id],
    queryFn: () => showBranches({ id_company: companyData?.id }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  // show categories
  useQuery({
    queryKey: ["Mostrar categories", companyData?.id],
    queryFn: () => showCategories({ id_company: companyData?.id }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner1 />;

  if (error) return <span>{"Error:" + error.message}</span>;

  return <ProductsTemplate />;
}
