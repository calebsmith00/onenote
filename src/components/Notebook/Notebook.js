import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNotebookInSession } from "../../hooks/useNotebooksInSession";
import { Link } from "react-router-dom";

const Notebook = () => {
  const { userId, nid } = useParams();
  const sessionNotebooks = useNotebookInSession(nid);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionNotebooks.length < 1) return;

    setSections(sessionNotebooks[0].sections);
    setLoading(false);
  }, [sessionNotebooks]);

  const getSectionsFromNotebook = () => {
    return sections.map((section) => {
      return (
        <Link
          key={section.id}
          to={`/user/${userId}/onenote/notebook/${nid}/section/${section.id}`}
          className="notebook-link"
        >
          {section.displayName}
        </Link>
      );
    });
  };

  return loading ? (
    <p>We are loading your sections, one moment please!</p>
  ) : (
    <div className="notebook-links">
      {getSectionsFromNotebook(sections, nid)}
    </div>
  );
};

export default Notebook;
