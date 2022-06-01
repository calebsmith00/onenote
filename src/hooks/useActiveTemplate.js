import { useState, useEffect } from "react";
import { useTemplateSession } from "./useTemplateSession";

export const useActiveTemplate = (activeTemplate = undefined) => {
  const [template, setTemplate] = useState({});
  const { templates } = useTemplateSession();
  const updateActiveTemplate = (activeTemplate) => {
    const foundTemplate = templates.filter(
      (found) => found["template-title"] === activeTemplate
    );
    if (foundTemplate.length < 1) return false;

    sessionStorage.setItem("activeTemplate", JSON.stringify(foundTemplate[0]));
    return setTemplate(foundTemplate[0]);
  };

  useEffect(() => {
    const activeTemplateSession =
      sessionStorage.getItem("activeTemplate") || JSON.stringify("");
    setTemplate(activeTemplateSession);
  }, []);

  return { template, updateActiveTemplate };
};
