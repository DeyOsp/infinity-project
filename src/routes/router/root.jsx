import { Route, Routes } from "react-router-dom";
import Home from "@routes/home/home.jsx";
import Dashboard from "../dashboard/dashboard";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
