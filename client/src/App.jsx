import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx";
import PingMeChat from "./pages/PingMeChat.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Alias for any '/register' links */}
      <Route path="/register" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<PingMeChat />} />
      <Route path="/chat/:aiType" element={<PingMeChat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
