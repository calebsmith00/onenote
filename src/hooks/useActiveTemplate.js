import { useState, useEffect } from "react";
import { useTemplateSession } from "./useTemplateSession";
import { useTrainingSession } from "./useTrainingSession";

export const useActiveTemplate = (activeTemplate = undefined) => {
  const [template, setTemplate] = useState({});
  const { templates } = useTemplateSession();
  const training = useTrainingSession(activeTemplate);

  const updateActiveTemplate = (checkForTemplate = undefined) => {
    const foundTemplate = templates.filter(
      (found) => found["template-title"] === activeTemplate || checkForTemplate
    );
    if (foundTemplate.length < 1) return false;

    const modifiedTemplate = { ...foundTemplate[0], trainings: training };
    sessionStorage.setItem("activeTemplate", JSON.stringify(modifiedTemplate));
    setTemplate(modifiedTemplate);

    return modifiedTemplate;
  };

  useEffect(() => {
    const activeTemplateSession =
      JSON.parse(sessionStorage.getItem("activeTemplate")) || "";
    setTemplate(activeTemplateSession);
  }, [templates]);

  return { template, updateActiveTemplate };
};
