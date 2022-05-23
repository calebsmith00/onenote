import Template from "../Template/Template";
import AddTraining from "../Template/AddTraining";
import CreateNotebook from "../Notebook/CreateNotebook";
import { Routes, Route } from "react-router-dom";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="onenote/template">
        <Route path="create" element={<Template />} />
        <Route path="add/trainings" element={<AddTraining />} />
      </Route>

      <Route path="onenote/notebook">
        <Route path="create" element={<CreateNotebook />} />
      </Route>
    </Routes>
  );
}
