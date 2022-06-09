import { useState, useEffect } from "react";
import { getNotebook, getPage, getSectionPages } from "../requests/exports";
import { useMsal } from "@azure/msal-react";

const separateHTML = (content, category) => {
  if (!category) return;
  const collection = content.getElementsByTagName(category);
  const collectionSize = collection.length;
  const elements = [];

  if (collectionSize < 1) return;
  for (let i = 0; i < collectionSize; i++) {
    if (!collection[i].innerHTML) continue;

    elements.push({
      id: i,
      category,
      value: collection[i].innerHTML,
    });
  }

  return elements;
};

export const useOneNoteTemplate = () => {
  const { instance, accounts } = useMsal();
  const [html, setHtml] = useState({});
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

    getTemplate("joaierfoij").then((response) => {
      const elements = ["table", "thead", "tbody", "td", "tr", "th"];
      const htmlContent = {};
      elements.forEach((element) => {
        htmlContent[element] = separateHTML(response, element);
      });

      setHtml(htmlContent);
    });
  }, [instance, account]);

  return html;
};
