import { useMsal, AuthenticatedTemplate } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { callMyAPI } from "../requests/backend/index.js";

export default function Homepage() {
  const { instance, accounts } = useMsal();
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    if (!accounts[0]) return;

    setUserId(accounts[0].localAccountId);
  }, [instance, accounts]);

  return (
    <div>
      <h1>Home</h1>

      <AuthenticatedTemplate>
        <Link to={`user/${userId}/onenote/notebooks`}>Notebooks</Link>

        <button
          onClick={() => {
            callMyAPI({
              userId,
              endpoint: `api/user/${userId}/retrieve-notebooks`,
            })
              .then((data) => data.json())
              .then((response) => console.log(response));
          }}
        >
          Call it
        </button>
      </AuthenticatedTemplate>
    </div>
  );
}
