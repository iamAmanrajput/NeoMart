import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/AdminLogin";
import Error from "./pages/Error";
import Success from "./pages/Success";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import AllProducts from "./Admin/AllProducts";
import Analytics from "./Admin/Analytics";
import CreateProduct from "./Admin/CreateProduct";
import Orders from "./Admin/Orders";
import Settings from "./Admin/Settings";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import MyProfile from "./pages/MyProfile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootLayout>
                <Home />
              </RootLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <RootLayout>
                <Login />
              </RootLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <RootLayout>
                <Signup />
              </RootLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/product/:productName"
          element={
            <RootLayout>
              <Product />
            </RootLayout>
          }
        ></Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <RootLayout>
                <MyProfile />
              </RootLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <RootLayout>
                <Checkout />
              </RootLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <RootLayout>
                <MyOrders />
              </RootLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route path="/success" element={<Success />}></Route>

        {/* admin routes */}
        <Route
          path="/admin/login"
          element={
            <ProtectedRoute>
              <RootLayout>
                <AdminLogin />
              </RootLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <CreateProduct></CreateProduct>
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard/all-products"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AllProducts />
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard/analytics"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Analytics />
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard/orders"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Orders />
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/dashboard/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>

        {/* Error route */}
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </div>
  );
};

export default App;
