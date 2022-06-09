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

    // Asynchronous function to update notebooks state.
    const updateNotebooks = async () => {
      const response = await callMyAPI(options);
      const json = await response.json();

      if (!response || !json)
        throw new Error("[ERROR]: The request could not be completed.");

      setNotebooks(json);
      sessionStorage.setItem("notebooks", JSON.stringify(json));
    };

    // Call function to update the notebooks state.
    updateNotebooks();
  }, [instance, accounts]);

  return notebooks;
};

export const useUserNotebooks = () => {
  const [notebooks, setNotebooks] = useState([]);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (!instance || !accounts[0]) return;

    // Asynchronous function to update all notebooks pertaining to the individual user.
    const updateNotebooks = async () => {
      const response = await getNotebook(instance, accounts[0]);
      if (!response)
        throw new Error("[ERROR]: The request could not be completed.");
      setNotebooks(response);
    };

    // Call function to update the notebooks state.
    updateNotebooks();
  }, [instance, accounts]);

  return notebooks;
};
