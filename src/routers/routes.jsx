import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Login,
  Sales,
  ProtectedRoutes,
  Configs,
  Categories,
  Products,
  Layout,
  PageNot,
  Users,
  Company,
  ConfigsBasic,
  ConfigsMoney,
  SuppliersClients,
} from "../index.js";

export function MyRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoutes accessBy={"no-authenticated"}>
            <Login />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/pos"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <Sales />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/configs"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <Configs />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/configs/categories"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <Categories />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/configs/products"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/configs/suppliers"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <SuppliersClients />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/configs/clients"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <SuppliersClients />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/configs/users"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/configs/company"
        element={
          <ProtectedRoutes accessBy={"authenticated"}>
            <Layout>
              <Company />
            </Layout>
          </ProtectedRoutes>
        }
      >
        <Route index element={<Navigate to="info-basic" />} />
        <Route path="info-basic" element={<ConfigsBasic />} />
        <Route path="info-money" element={<ConfigsMoney />} />
      </Route>

      <Route path="*" element={<PageNot />} />
    </Routes>
  );
}
