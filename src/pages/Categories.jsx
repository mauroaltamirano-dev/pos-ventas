import { useQuery } from "@tanstack/react-query";
import {
  CategoriesTemplate,
  Spinner1,
  useCategoriesStore,
  useCompanyStore,
} from "../index.js";

export function Categories() {
  const { showCategories, searchCategories, search } = useCategoriesStore();
  const { companyData } = useCompanyStore();
  const { isLoading, error } = useQuery({
    queryKey: ["showCategories", companyData?.id],
    queryFn: () => showCategories({ id_company: companyData?.id }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });
  const {} = useQuery({
    queryKey: ["buscar categorías", search],
    queryFn: () =>
      searchCategories({ id_company: companyData?.id, description: search }),
    enabled: !!companyData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner1 />;

  if (error) return <span>{"Error:" + error.message}</span>;

  return <CategoriesTemplate />;
}
