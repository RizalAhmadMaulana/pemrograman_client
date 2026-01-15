import React from "react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Button from "@/Components/Button";
import Link from "@/Components/Link";
import Card from "@/Components/Card";
import Heading from "@/Components/Heading";
import Form from "@/Components/Form";
import { toastSuccess, toastError } from "@/Utils/Helper/ToastHelpers";

import { dummyUser } from "@/Data/Dummy";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      window.location.href = "/admin";
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
      <Card className="max-w-md">
        <Heading as="h2">Login</Heading>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Masukkan email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" placeholder="Masukkan password" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </Form>
      </Card>
  );
};


const handleSubmit = (e) => {
  e.preventDefault();
  const { email, password } = form;

  if (email === dummyUser.email && password === dummyUser.password) {
    localStorage.setItem("user", JSON.stringify(dummyUser));
    toastSuccess("Login berhasil!");
    navigate("/admin/dashboard");
  } else {
    toastError("Email atau password salah!");
  }
};

export default Login;