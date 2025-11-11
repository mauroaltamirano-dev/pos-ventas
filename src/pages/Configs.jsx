import { useQuery } from "@tanstack/react-query";
import { ConfigsTemplate, Spinner1, useModuleStore } from "../index.js";

export function Configs() {
  const { showModules } = useModuleStore();
  const { data, isLoading, error } = useQuery({
    queryKey: "show modules",
    queryFn: showModules,
  });

  if (isLoading) return <Spinner1 />;
  if (error) return <span>Error: {error.message}</span>;

  return <ConfigsTemplate />;
}
