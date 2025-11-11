import { useQuery } from "@tanstack/react-query";
import {
  CategoriesTemplate,
  useCategoriesStore,
  useCompanyStore,
} from "../index.js";

export function Categories() {
  const { showCategories } = useCategoriesStore();
  const { companyData } = useCompanyStore();
  const {} = useQuery({
    queryKey: ["showCategories", companyData?.id],
    queryFn: () => showCategories({ id_company: companyData?.id }),
  });
  return <CategoriesTemplate />;
}
