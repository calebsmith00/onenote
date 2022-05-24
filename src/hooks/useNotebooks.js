import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { callMyAPI } from "../requests/backend";

export const useNotebooks = () => {
  const [notebooks, setNotebooks] = useState([]);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (!instance || !accounts[0]) return;
    const userId = accounts[0].localAccountId;

    const options = {
      userId,
      endpoint: `api/user/${userId}/retrieve-notebooks`,
    };

    callMyAPI(options)
      .then((response) => response.json())
      .then((notebooks) => setNotebooks(notebooks))
      .catch((err) => console.error(err));
  }, [notebooks, instance, accounts]);

  return notebooks;
};
