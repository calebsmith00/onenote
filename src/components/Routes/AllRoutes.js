import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import Homepage from "../Homepage";
import { Routes, Route } from "react-router-dom";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      <Route path="*" element={<p>404: PAGE NOT FOUND</p>} />
    </Routes>
  );
}
