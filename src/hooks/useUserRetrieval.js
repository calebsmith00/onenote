import { useEffect, useState } from "react";
import { getUsers } from "../requests/exports.js";
import { useMsal } from "@azure/msal-react";

export const useUserRetrieval = () => {
  const [users, setUsers] = useState([]);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    getUsers(instance, accounts[0])
      .then((response) => setUsers(response))
      .catch((err) => console.error(err));
  }, [instance, accounts]);

  return users;
};
