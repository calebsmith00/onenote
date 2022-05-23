import { UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import AllRoutes from "./components/Routes/AllRoutes";

function SignInButton() {
  const { instance } = useMsal();

  return <button onClick={() => instance.loginPopup()}>Sign In</button>;
}

function App() {
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
