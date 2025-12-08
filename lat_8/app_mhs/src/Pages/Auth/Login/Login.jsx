import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";
import Link from "@/Pages/Layouts/Components/Link";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Form from "@/Pages/Layouts/Components/Form";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

// 1. IMPORT DARI CONTEXT DAN API
import { login as apiLogin } from "@/Utils/Apis/AuthApi"; 
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  
  // 2. AMBIL USER DAN SETTER DARI CONTEXT
  const { user, setUser } = useAuthStateContext();

  // 3. REDIRECT JIKA SUDAH LOGIN
  if (user) return <Navigate to="/admin/dashboard" replace />;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      // 4. PANGGIL API LOGIN
      const userData = await apiLogin(email, password);
      
      // 5. UPDATE CONTEXT (PENTING!)
      setUser(userData); 
      
      toastSuccess("Login berhasil");
      
      // Beri sedikit jeda agar Context terupdate sebelum navigasi
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 10);
      
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <Card className="max-w-md">
      <Heading as="h2">Login</Heading>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
          />
        </div>
        <div className="flex justify-between items-center">
            {/* ... checkbox ... */}
            <Link href="#" className="text-sm">Lupa password?</Link>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </Form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun? <Link href="/register">Daftar</Link>
      </p>
    </Card>
  );
};

export default Login;