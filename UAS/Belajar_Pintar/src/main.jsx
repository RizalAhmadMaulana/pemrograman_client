import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { AppProvider } from "@/Utils/Contexts/AppContext"; 
import 'sweetalert2/dist/sweetalert2.min.css';
import './App.css';

import AuthLayout from "@/Layouts/AuthLayout";
import AdminLayout from "@/Layouts/AdminLayout";
import ProtectedRoute from "@/Components/ProtectedRoute";

import Login from "@/Pages/Auth/Login";
import Dashboard from "@/Pages/Admin/Dashboard";
import Modul from "@/Pages/Admin/Modul/Modul";
import PageNotFound from "@/Pages/PageNotFound";

import QuizDashboard from "@/Pages/Admin/Quiz/QuizDashboard";
import QuizRoom from "@/Pages/Admin/Quiz/QuizRoom";
import Forum from "@/Pages/Admin/Forum/Forum";
import Achievements from "@/Pages/Admin/Achievements/Achievements";
import InstructorDashboard from "@/Pages/Admin/Instructor/InstructorDashboard";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "modul", element: <Modul /> },
      { path: "quiz", element: <QuizDashboard /> },
      { path: "quiz/room/:id", element: <QuizRoom /> },
      { path: "forum", element: <Forum /> },
      { path: "pencapaian", element: <Achievements /> },
      { path: "instruktur", element: <InstructorDashboard /> }, 
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);