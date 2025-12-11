import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

// --- AUTH & LAYOUTS ---
import AuthLayout from "@/Pages/Layouts/AuthLayout";
import AdminLayout from "@/Pages/Layouts/AdminLayout";
import ProtectedRoute from "@/Pages/Layouts/Components/ProtectedRoute";

//Impor AuthProvider DARI FILE AuthContext.jsx
import { AuthProvider } from "@/Utils/Contexts/AuthContext"; 

import Login from "@/Pages/Auth/Login/Login";
import Register from "@/Pages/Auth/Register/Register";
import Dashboard from "@/Pages/Admin/Dashboard/Dashboard";
import Mahasiswa from "@/Pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "@/Pages/Admin/MahasiswaDetail/MahasiswaDetail";
import PageNotFound from "@/Pages/PageNotFound";
import Dosen from "@/Pages/Admin/Dosen/Dosen";
import MataKuliah from "@/Pages/Admin/MataKuliah/MataKuliah";
import DosenDetail from "@/Pages/Admin/Dosen/DosenDetail"; 
import MatkulDetail from "@/Pages/Admin/MataKuliah/MatkulDetail";
import Kelas from "@/Pages/Admin/Kelas/Kelas";
import KelasDetail from "@/Pages/Admin/Kelas/KelasDetail";
import RencanaStudi from "@/Pages/Admin/RencanaStudi/RencanaStudi";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />, 
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
        path: "mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />,
          },
          {
            path: ":id",
            element: <MahasiswaDetail />,
          },
        ],
      },
      {
        path: "dosen",
        children: [
          { index: true, element: <Dosen /> },
          { path: ":id", element: <DosenDetail /> },
        ],
      },
      {
        path: "matakuliah",
        children: [
          { index: true, element: <MataKuliah /> },
          { path: ":id", element: <MatkulDetail /> },
        ],
      },
      {
        path: "kelas",
        children: [
          { index: true, element: <Kelas /> },
          { path: ":id", element: <KelasDetail /> },
        ],
      },
      {
        path: "rencana-studi",
        element: <RencanaStudi />,
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
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);