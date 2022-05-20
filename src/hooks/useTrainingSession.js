import { useEffect, useState } from "react";

export const useTrainingSession = (activeTemplate) => {
  const [training, setTraining] = useState([]);

  useEffect(() => {
    let template = sessionStorage.getItem("template");
    if (!template) return;
    template = JSON.parse(template);
    template = template.filter((found) => {
      return found["template-title"] === activeTemplate;
    });

    setTraining(template[0]);
  }, [activeTemplate]);

  return training;
};
