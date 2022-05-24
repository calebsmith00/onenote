import React from "react";
import { useNotebooks } from "../../hooks/useNotebooks.js";

export default function Notebook() {
  const notebooks = useNotebooks();

  const displayNotebooks = () => {
    if (notebooks.length < 1) return;

    // Map through sections
    const getSections = (displayName, sections) => {
      return sections.map((section) => {
        return (
          <li key={section.id}>
            {displayName} - {section.displayName}
          </li>
        );
      });
    };

    // Map through notebooks
    const notebookElements = notebooks.map((notebook) => {
      return (
        <React.Fragment key={notebook.id}>
          {getSections(notebook.displayName, notebook.sections)}
        </React.Fragment>
      );
    });

    return notebookElements;
  };

  return (
    <>
      <ul>{displayNotebooks()}</ul>
    </>
  );
}
