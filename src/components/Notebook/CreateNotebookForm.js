import { useTemplateSession } from "../../hooks/useTemplateSession";
import { useUserRetrieval } from "../../hooks/useUserRetrieval";
import { useState, useEffect } from "react";
import {
  createNotebook,
  createSection,
  createPage,
} from "../../requests/exports.js";
import { useMsal } from "@azure/msal-react";
import UserSelect from "./UserSelect";
import TemplateSelect from "../Template/TemplateSelect";

export default function CreateNotebookForm() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("");
  const { templates } = useTemplateSession();
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

    const notebook = await createNotebook(user, selectedTemplate);
    if (!notebook.id) return "Invalid response";

    const section = await createSection(user, notebook.id, selectedTemplate);
    const sectionData = await section.json();
    if (!sectionData.id) return "Invalid response";

    await createPage(user, sectionData.id, selectedTemplate);
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
