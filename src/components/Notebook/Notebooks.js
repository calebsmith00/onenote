import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNotebooks } from "../../hooks/useNotebooks.js";

export default function Notebook() {
  const notebooks = useNotebooks();
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  // Runs when useNotebooks() hook is complete
  // Update UI state to indicate that the request is loading
  useEffect(() => {
    if (notebooks.length < 1) return;

    setLoading(false);
  }, [notebooks]);

  const displayNotebooks = () => {
    if (notebooks.length < 1) return;

    // Map through sections and returns an array of <li /> elements
    const getSections = (notebookId, displayName, sections) => {
      return sections.map((section) => {
        return (
          <span key={section.id} className="notebook-links">
            {/* Link to notebook */}
            <Link
              to={`/user/${userId}/onenote/notebook/${notebookId}`}
              className="notebook-link"
            >
              {displayName}
            </Link>

            {/* Link to section */}
            <Link to="/" className="notebook-link">
              {section.displayName}
            </Link>
          </span>
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
    <div>{displayNotebooks()}</div>
  );
}
