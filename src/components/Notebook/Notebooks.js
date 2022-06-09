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

  const displayNotebooks = () => {
    if (notebooks.length < 1) return;

    // Map through sections and returns an array of <li /> elements
    const getSections = (displayName, sections) => {
      return sections.map((section) => {
        return (
          <li key={section.id}>
            {displayName} - {section.displayName}
          </li>
        );
      });
    };

    // Map through notebooks and return an array of <React.Fragment /> elements
    // so that we can retrieve all sections
    const notebookElements = notebooks.map((notebook) => {
      return (
        <React.Fragment key={notebook.id}>
          {getSections(notebook.displayName, notebook.sections)}
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
    <ul>{displayNotebooks()}</ul>
  );
}
