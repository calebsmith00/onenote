import { useEffect, useState } from "react";

export const useTrainingSession = (activeTemplate) => {
  const [training, setTraining] = useState([]);

  useEffect(() => {
    let template = sessionStorage.getItem("template") || "";
    template = JSON.parse(template);
    template = template.filter((found) => {
      return found["template-title"] === activeTemplate && found["trainings"];
    });

    if (template.length < 1) return setTraining(false);
    setTraining(template[0].trainings);
  }, [activeTemplate]);

  return training;
};
