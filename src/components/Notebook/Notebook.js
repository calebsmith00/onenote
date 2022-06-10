import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNotebookInSession } from "../../hooks/useNotebooksInSession";
import { Link } from "react-router-dom";

const getSectionsFromNotebook = (sections) => {
  return sections.map((section) => {
    return (
      <Link key={section.id} to="/" className="notebook-link">
        {section.displayName}
      </Link>
    );
  });
};

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

  return loading ? (
    <p>We are loading your sections, one moment please!</p>
  ) : (
    <div className="notebook-links">{getSectionsFromNotebook(sections)}</div>
  );
};

export default Notebook;
