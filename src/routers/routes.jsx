import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Sales,
  ProtectedRoutes,
  Configs,
  Categories,
  Products,
  Layout,
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
    </Routes>
  );
}
