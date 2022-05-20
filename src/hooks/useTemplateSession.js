import { useEffect, useState } from "react";

export const useTemplateSession = () => {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    const sessionTemplate = sessionStorage.getItem("template");
    if (!sessionTemplate) return;

    setTemplates(JSON.parse(sessionTemplate));
  }, []);

  return templates;
};
