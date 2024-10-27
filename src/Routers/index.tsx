import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PublicRoute } from "./PublicRoutes";
import { PrivateRoute } from "./PrivateRoute";
import {
  Dashboard,
  Login,
  Personal,
  Products,
  Users,
  Update,
  Data,
  Create,
  UpdateProducts,
  Record,
} from "../Pages";

import { Home } from "../Home";
import { CCol, CContainer, CRow } from "@coreui/react";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <CContainer fluid>
                <CRow>
                  <CCol md={12}>
                    <Login />
                  </CCol>
                </CRow>
              </CContainer>
            </PublicRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Home>
                <Dashboard />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Personal"
          element={
            <PrivateRoute>
              <Home>
                <Personal />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Personal/Crear"
          element={
            <PrivateRoute>
              <Home>
                <Users />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Personal/Update/:userId"
          element={
            <PrivateRoute>
              <Home>
                <Update />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Personal/Data/:userId/:name/:surName"
          element={
            <PrivateRoute>
              <Home>
                <Data />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Producto"
          element={
            <PrivateRoute>
              <Home>
                <Products />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Producto/Crear"
          element={
            <PrivateRoute>
              <Home>
                <Create />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Producto/Editar/:productsId"
          element={
            <PrivateRoute>
              <Home>
                <UpdateProducts />
              </Home>
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard/Registro"
          element={
            <PrivateRoute>
              <Home>
                <Record />
              </Home>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};
