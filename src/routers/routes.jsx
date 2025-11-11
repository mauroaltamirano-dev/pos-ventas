import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  UserAuth,
  ProtectedRoutes,
  Configs,
  Categories,
  useUserStore,
  Spinner1,
  useCompanyStore,
} from "../index.js";
import { useQuery } from "@tanstack/react-query";

export function MyRoutes() {
  const { user } = UserAuth();
  const { users, showUsers } = useUserStore();
  const { showCompany, companyData } = useCompanyStore();
  const { isLoading, error } = useQuery({
    queryKey: "Show Users",
    queryFn: showUsers,
  });
  const {} = useQuery({
    queryKey: ["Show Company", users?.id],
    queryFn: () => showCompany({ _id_user: users?.id }),
    enabled: !!users,
  });

  if (isLoading) return <Spinner1 />;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Routes>
      <Route element={<ProtectedRoutes user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configs" element={<Configs />} />
        <Route path="/configs/categories" element={<Categories />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
