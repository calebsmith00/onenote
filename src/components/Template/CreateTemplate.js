import { useState } from "react";
import TemplateCreated from "./TemplateCreated";
import "./Template.scss";
import CreateTemplateForm from "./CreateTemplateForm";

export default function CreateTemplate() {
  const [templateCreated, setTemplateCreated] = useState(false);

  const handleTemplateCreation = (created) => {
    setTemplateCreated(created || false);
  };

  return (
    <div>
      <h1>This is where templates are created</h1>
      <p>
        A template is a set of data that outlines what training a new-hire needs
        to take to complete the onboarding process.
      </p>

      {templateCreated ? (
        <TemplateCreated />
      ) : (
        <CreateTemplateForm updateCreationStatus={handleTemplateCreation} />
      )}
    </div>
  );
}
