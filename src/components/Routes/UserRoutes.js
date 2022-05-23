import Notebooks from "../Notebook/Notebooks";
import Notebook from "../Notebook/Notebooks";
import Section from "../Section";
import { Route, Routes } from "react-router-dom";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path=":userId">
        <Route path="onenote/notebooks" element={<Notebooks />}>
          <Route path="notebook/:notebook" element={<Notebook />}>
            <Route path=":section" element={<Section />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
