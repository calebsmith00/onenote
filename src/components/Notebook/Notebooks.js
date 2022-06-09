import React from "react";
import { useNotebooks } from "../../hooks/useNotebooks.js";

export default function Notebook() {
  const notebooks = useNotebooks();

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
  return (
    <>
      <ul>{displayNotebooks()}</ul>
    </>
  );
}
