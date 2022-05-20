import { getUsers } from "../graphRequests";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { templates } from "../templates";
import "../styles/Form.scss";

export default function CreateNotebook() {
  const { instance, accounts } = useMsal();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(instance, accounts[0])
      .then((response) => setUsers(response))
      .catch((err) => console.error(err));
  }, [instance, accounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>Notebook Creation</h1>

      <form onSubmit={handleSubmit}>
        <span>
          <label htmlFor="users">Select a user: </label>
          <select name="users" id="users">
            {users.map((user) => (
              <option key={user.id}>
                {user.displayName} ({user.mail})
              </option>
            ))}
          </select>
        </span>

        <br />

        <span>
          <label htmlFor="templates">Select a template: </label>
          <select name="templates" id="templates">
            {templates.map((template) => (
              <option key={template.id}>{template.group}</option>
            ))}
          </select>
        </span>

        <button type="submit" className="btn-submit">
          Create Notebook
        </button>
      </form>
    </>
  );
}
