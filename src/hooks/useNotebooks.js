import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { callMyAPI } from "../requests/backend";
import { getNotebook } from "../requests/exports";

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
  }, [instance, accounts]);

  return notebooks;
};

export const useUserNotebooks = () => {
  const [notebooks, setNotebooks] = useState([]);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (!instance || !accounts[0]) return;
    getNotebook(instance, accounts[0])
      .then((response) => {
        return setNotebooks(response);
      })
      .catch((err) => console.error(err));
  }, [instance, accounts]);

  return notebooks;
};
