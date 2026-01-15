import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-x-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminLayout;