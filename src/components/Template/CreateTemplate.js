import { useState } from "react";
import TemplateCreated from "./TemplateCreated";
import "./Template.scss";
import CreateTemplateForm from "./CreateTemplateForm";

export default function CreateTemplate() {
  const [templateCreated, setTemplateCreated] = useState(false);

  const handleTemplateCreation = (created) => {
    setTemplateCreated(created || false);
  };

  return templateCreated ? (
    <TemplateCreated />
  ) : (
    <CreateTemplateForm updateCreationStatus={handleTemplateCreation} />
  );
}
