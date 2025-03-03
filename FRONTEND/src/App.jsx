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
import RootLayout from "./components/layouts/RootLayout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <Home />
            </RootLayout>
          }
        />
        <Route
          path="/login"
          element={
            <RootLayout>
              <Login />
            </RootLayout>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <RootLayout>
              <Signup />
            </RootLayout>
          }
        ></Route>

        <Route
          path="/product"
          element={
            <RootLayout>
              <Product />
            </RootLayout>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <RootLayout>
              <Checkout />
            </RootLayout>
          }
        ></Route>
        <Route path="/success" element={<Success />}></Route>

        {/* admin routes */}
        <Route
          path="/admin/login"
          element={
            <RootLayout>
              <AdminLogin />
            </RootLayout>
          }
        ></Route>

        {/* Error route */}
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </div>
  );
};

export default App;
