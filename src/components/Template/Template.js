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

  useEffect(() => {
    getNotebook(instance, accounts[0], templateName).then((notebook) => {
      if (!notebook[0]) return;
      const sections = notebook[0].sections;

      sections.map((section) => {
        if (section.displayName !== templateName) return;
        getSectionPages(instance, accounts[0], section.id);
      });
    });
  }, [instance, accounts, templateName]);

  return <div>ff</div>;
}
