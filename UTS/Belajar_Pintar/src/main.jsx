import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import 'sweetalert2/dist/sweetalert2.min.css';

import './App.css';

import AuthLayout from "@/Layouts/AuthLayout";
import AdminLayout from "@/Layouts/AdminLayout";
import ProtectedRoute from "@/Components/ProtectedRoute";

import Login from "@/Pages/Auth/Login";
import Dashboard from "@/Pages/Admin/Dashboard";
import Modul from "@/Pages/Admin/Modul/Modul";
import PageNotFound from "@/Pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "modul",
        children: [
          {
            index: true,
            element: <Modul />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

<React.StrictMode>
  <Toaster position="top-right" />
  <RouterProvider router={router} />
</React.StrictMode>