import React, { useEffect, useState } from "react";
import { useNotebooks } from "../../hooks/useNotebooks.js";

export default function Notebook() {
  const notebooks = useNotebooks();
  const [loading, setLoading] = useState(true);

  // Runs when useNotebooks() hook is complete
  // Update UI state to indicate that the request is loading
  useEffect(() => {
    if (notebooks.length < 1) return;

    setLoading(false);
  }, [notebooks]);

  const copyToClipboard = async (text) => {
    try {
      console.log(`Copied ID (${text}) to your clipboard!`);
      return await navigator.clipboard.writeText(text.toString());
    } catch (err) {
      throw new Error(`[ERROR]: ${err}`);
    }
  };

  const displayNotebooks = () => {
    if (notebooks.length < 1) return;

    // Map through sections and returns an array of <li /> elements
    const getSections = (notebookId, displayName, sections) => {
      return sections.map((section) => {
        return (
          <li key={section.id}>
            <b onClick={() => copyToClipboard(notebookId)}>{displayName}</b> -{" "}
            <i onClick={() => copyToClipboard(section.id)}>
              {section.displayName}
            </i>
          </li>
        );
      });
    };

    // Map through notebooks and return an array of <React.Fragment /> elements
    // so that we can retrieve all sections
    const notebookElements = notebooks.map((notebook) => {
      return (
        <React.Fragment key={notebook.id}>
          {getSections(notebook.id, notebook.displayName, notebook.sections)}
        </React.Fragment>
      );
    });

    return notebookElements;
  };

  // Returns list of notebooks displayed as:
  // {NOTEBOOK_NAME} - {SECTION_NAME}

  return loading ? (
    <p>We are loading your data, just a moment please!</p>
  ) : (
    <>
      <span>
        P.S: you can click on the notebook or section title to copy the ID to
        your clipboard!
      </span>
      <ul>{displayNotebooks()}</ul>
      <>
        <i>Hint</i>: /user/userId/onenote/section/sectionId
      </>
    </>
  );
}
