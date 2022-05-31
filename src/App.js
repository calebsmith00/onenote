import { UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import AllRoutes from "./components/Routes/AllRoutes";
import { useNotebooks } from "./hooks/useNotebooks";

function SignInButton() {
  const { instance } = useMsal();

  return <button onClick={() => instance.loginPopup()}>Sign In</button>;
}

function App() {
  const notebooks = useNotebooks();

  useEffect(() => {
    console.log(notebooks);
  }, [notebooks]);

  return (
    <div>
      <AllRoutes />

      <UnauthenticatedTemplate>
        <p>
          Welcome to the OneNote project. Please <SignInButton /> to continue
          with your project.
        </p>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
