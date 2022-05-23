import { useTemplateSession } from "../../hooks/useTemplateSession";
import { useUserRetrieval } from "../../hooks/useUserRetrieval";
import { useState, useEffect } from "react";
import { createNotebook, createSection } from "../../backendRequests";
import { useMsal } from "@azure/msal-react";
import UserSelect from "./UserSelect";
import TemplateSelect from "./TemplateSelect";

export default function CreateNotebookForm() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");
  const templates = useTemplateSession();
  const users = useUserRetrieval();

  useEffect(() => {
    if (templates.length <= 0) return;
    setActiveTemplate(templates[0]["template-title"]);
  }, [instance, accounts, templates]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedTemplate = templates.filter(
      (template) => template["template-title"] === activeTemplate
    );
    if (selectedTemplate.length <= 0) return;

    const response = await createNotebook(user, selectedTemplate);
    const data = await response.json();

    if (!data.id) return "Invalid response";

    createSection(user, data.id, selectedTemplate);
  };

  const updateTemplate = (e) => {
    setActiveTemplate(e.target.value);
  };

  const updateUser = (e) => {
    setUser(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserSelect users={users} updateUser={updateUser} />
      <br />
      <TemplateSelect updateTemplate={updateTemplate} />

      <button type="submit" className="btn-submit">
        Create Notebook
      </button>
    </form>
  );
}
