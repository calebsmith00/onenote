import Notebooks from "../Notebook/Notebooks";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Template from "../Template/Template";
import Page from "../Notebook/Page";

const paths = {
  retrieveTemplate: {
    url: "onenote/retrieve-template/:templateName",
    element: <Template />,
  },
  notebooks: {
    url: "onenote/notebooks",
    element: <Notebooks />,
  },
  userId: {
    url: ":userId",
    element: (
      <>
        <p>User... </p>
        <Outlet />
      </>
    ),
  },
  page: {
    url: "onenote/page/:pid",
    element: <Page />,
  },
};

export default function UserRoutes() {
  return (
    <Routes>
      {/* GET /api/user/:userId */}
      <Route path={paths.userId.url} element={paths.userId.element}>
        {/* GET /api/user/:userId/notebooks */}
        <Route path={paths.notebooks.url} element={paths.notebooks.element} />

        {/* GET /api/user/:userId/retrieve-template/:templateName */}
        <Route
          path={paths.retrieveTemplate.url}
          element={paths.retrieveTemplate.element}
        />

        {/* GET /api/user/:userId/page/:pid */}
        <Route path={paths.page.url} element={paths.page.element} />
      </Route>
    </Routes>
  );
}
