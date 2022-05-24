import Notebooks from "../Notebook/Notebooks";
import Notebook from "../Notebook/Notebook";
import Section from "../Section";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path=":userId" element={<p>User... </p> && <Outlet />}>
        <Route path="onenote/notebooks" element={<Notebooks />} />
        <Route path="onenote/notebook/:notebook" element={<Notebook />} />
        <Route path="onenote/section/:section" element={<Section />} />
        <Route path="test" element={<p>Just a testin</p>} />
      </Route>
    </Routes>
  );
}
