import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/members" element={<Members />} />

      <Route path="/add-member" element={<AddMember />} />

      <Route path="/reports" element={<Reports />} />

    </Routes>
  );
}