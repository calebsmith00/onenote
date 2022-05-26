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

  return templates;
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
