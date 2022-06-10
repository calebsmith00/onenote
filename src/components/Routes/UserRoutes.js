import Notebooks from "../Notebook/Notebooks";
import Notebook from "../Notebook/Notebook";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Template from "../Template/Template";
import Page from "../Notebook/Page";

// Store a list of paths as an object
const paths = {
  userId: {
    url: ":userId",
    element: <Outlet />,
  },
  retrieveTemplate: {
    url: ":userId/onenote/retrieve-template/:templateName",
    element: <Template />,
  },
  notebooks: {
    url: ":userId/onenote/notebooks",
    element: <Notebooks />,
  },
  notebook: {
    url: ":userId/onenote/notebook/:nid",
    element: <Notebook />,
  },
  page: {
    url: ":userId/onenote/page/:pid",
    element: <Page />,
  },
};

// Loops through each object included in paths constant and returns
// a <Route> component
const getUserRoutes = () => {
  const userPaths = Object.keys(paths);
  return userPaths.map((userPath, index) => {
    return (
      <Route
        key={index}
        path={paths[userPath]["url"]}
        element={paths[userPath]["element"]}
      />
    );
  });
};

export default function UserRoutes() {
  return <Routes>{getUserRoutes()}</Routes>;
}
