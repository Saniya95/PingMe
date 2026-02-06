import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import AuthCard from "../components/AuthCard.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return; // simple guard, optionally show message
    await register({ name, email, phone, password });
    navigate("/home", { replace: true });
  };
  return (
    <AuthLayout>
      <AuthCard>
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-300 via-sky-300 to-pink-300 shadow-inner" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">Create your account</h2>
          <p className="mt-1 text-sm text-gray-600">Join PingMe</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input name="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input name="phone" type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input name="confirm" type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <Button type="submit">Create Account</Button>
          <div className="text-center text-sm text-gray-600">
            <Link className="text-sky-700 hover:underline" to="/login">Already have an account? Login</Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
