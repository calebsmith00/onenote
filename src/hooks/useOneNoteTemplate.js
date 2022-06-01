import { useState, useEffect } from "react";
import { getNotebook, getPage, getSectionPages } from "../requests/exports";
import { useMsal } from "@azure/msal-react";

export const useOneNoteTemplate = () => {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  useEffect(() => {
    const getTemplate = async (templateName) => {
      const notebooks = await getNotebook(instance, account);
      const notebook = notebooks.filter(
        (notebook) => notebook.displayName === "Templates"
      )[0];

      const section = notebook.sections.filter(
        (section) => section.displayName === templateName
      )[0];
      const sectionPages = await getSectionPages(instance, account, section.id);

      const page = sectionPages.filter(
        (page) => page.title === "Training List"
      )[0];

      return await getPage(instance, account, page.id);
    };

    getTemplate("joaierfoij").then((response) => console.log(response));
  }, [instance, account]);

  return "Nothing";
};
