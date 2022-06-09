import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useParams } from "react-router-dom";
import { getNotebook, getSectionPages, getPage } from "../requests/exports.js";

/*
 * PURPOSE: gather the list of templates from session storage,
 * then return that as part of our custom hook.
 */

export const useTemplateSession = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const sessionTemplate = sessionStorage.getItem("template");
    if (!sessionTemplate) return;

    setTemplates(JSON.parse(sessionTemplate));
  }, []);

  const createTemplate = (template) => {
    const title = "template-title";
    const foundTemplate = templates.filter((currentTemplate) => {
      if (!currentTemplate) return;
      return currentTemplate[title] === template[title];
    });

    if (foundTemplate.length < 1)
      sessionStorage.setItem(
        "template",
        JSON.stringify([...templates, template])
      );
  };

  const updateTemplates = (template) => {
    if (!template) return;
    if (!template["trainings"]) template["trainings"] = [];

    const newTemplates = templates.map((currentTemplate) => {
      if (currentTemplate["template-title"] !== template["template-title"])
        return currentTemplate;

      if (!currentTemplate["trainings"]) currentTemplate["trainings"] = [];

      const trainings = [...currentTemplate.trainings, ...template.trainings];
      return {
        ...template,
        trainings,
      };
    });

    if (newTemplates.length < 1)
      return sessionStorage.setItem("template", JSON.stringify([template]));
    sessionStorage.setItem("template", JSON.stringify(newTemplates));
  };

  return { templates, createTemplate, updateTemplates };
};

/*
 * PURPOSE: Gather HTML from template page within OneNote
 */

export const useTemplateHTML = () => {
  const { instance, accounts } = useMsal();
  const { templateName } = useParams();
  const [templateHTML, setTemplateHTML] = useState();

  useEffect(() => {
    const getSectionId = (sections) => {
      const filteredSections = sections.filter((section) => {
        if (section.displayName !== templateName) return false;
        return section;
      });

      if (filteredSections.length > 0) return filteredSections[0].id;
    };

    const getPageId = (pages) => {
      const filteredPages = pages.filter((page) => {
        if (page.title !== "Trainings") return false;
        return page;
      });

      if (filteredPages.length > 0) return filteredPages[0].id;
    };

    const getElements = async () => {
      try {
        const notebook = await getNotebook(instance, accounts[0], templateName);
        const pages = await getSectionPages(
          instance,
          accounts[0],
          getSectionId(notebook.sections)
        );
        const page = await getPage(instance, accounts[0], getPageId(pages));

        setTemplateHTML(page);
      } catch (err) {
        console.error(`ERROR: ${err}`);
      }
    };

    getElements();
  }, [instance, accounts, templateName]);

  return templateHTML;
};
