import Notebooks from "../Notebook/Notebooks";
import Notebook from "../Notebook/Notebook";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Template from "../Template/Template";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path=":userId" element={<p>User... </p> && <Outlet />}>
        <Route path="onenote/notebooks" element={<Notebooks />} />
        <Route path="onenote/notebook/:notebook" element={<Notebook />} />
        <Route
          path="onenote/retrieve-template/:templateName"
          element={<Template />}
        />
      </Route>
    </Routes>
  );
}
