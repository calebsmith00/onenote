import { useMsal, AuthenticatedTemplate } from "@azure/msal-react";
import { getPage } from "../requests/exports";

function Page() {
  const { instance, accounts } = useMsal();

  return (
    <>
      <button onClick={() => getPage(instance, accounts)}>
        Request page(s)
      </button>
    </>
  );
}

export default function Section() {
  return (
    <AuthenticatedTemplate>
      <div>
        <h1>Section</h1>
        <Page />
      </div>
    </AuthenticatedTemplate>
  );
}
