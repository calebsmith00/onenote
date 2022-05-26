import {
  getNotebook,
  getSectionPages,
  getPage,
} from "../../requests/exports.js";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Template() {
  const { instance, accounts } = useMsal();
  const { templateName } = useParams();

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

      return page;
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  useEffect(() => {
    getElements().then((doc) => doc);
  }, [instance, accounts]);

  return <div>ff</div>;
}
