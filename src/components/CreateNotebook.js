import { getUsers } from "../graphRequests";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
//import { templates } from "../templates";
import { useTemplateSession } from "../hooks/useTemplateSession";
import "../styles/Form.scss";
import { createNotebook } from "../backendRequests";

export default function CreateNotebook() {
  const { instance, accounts } = useMsal();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");
  const templates = useTemplateSession();

  useEffect(() => {
    if (templates.length <= 0) return;
    getUsers(instance, accounts[0])
      .then((response) => setUsers(response))
      .catch((err) => console.error(err));

    setActiveTemplate(templates[0]["template-title"]);
  }, [instance, accounts, templates]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedTemplate = templates.filter(
      (template) => template["template-title"] === activeTemplate
    );
    if (selectedTemplate.length <= 0) return;

    createNotebook(user, selectedTemplate);
  };

  const handleChange = (e) => {
    setActiveTemplate(e.target.value);
  };

  const activeUser = (e) => {
    setUser(e.target.value);
  };

  return (
    <>
      <h1>Notebook Creation</h1>

      <form onSubmit={handleSubmit}>
        {/* USER SELECTION */}
        <span>
          <label htmlFor="users">Select a user: </label>
          <select name="users" id="users" onChange={activeUser}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName} ({user.mail})
              </option>
            ))}
          </select>
        </span>

        <br />

        {/* TEMPLATE SELECTION */}
        <span>
          <label htmlFor="templates">Select a template: </label>
          <select name="templates" id="templates" onChange={handleChange}>
            {templates.map((template, index) => (
              <option key={index}>{template["template-title"]}</option>
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
