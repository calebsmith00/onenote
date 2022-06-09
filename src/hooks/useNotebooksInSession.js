import { useState, useEffect } from "react";

export const useNotebookInSession = (notebookTitle) => {
  const [sessionNotebooks, setSessionNotebooks] = useState([]);

  useEffect(() => {
    const session = sessionStorage.getItem("notebooks");
    const parsedSession = JSON.parse(session);

    if (parsedSession.length < 1) return;

    const foundReferencedNotebook = parsedSession.filter(
      (notebook) =>
        notebook.displayName.toLowerCase() === notebookTitle.toLowerCase()
    );

    if (foundReferencedNotebook.length < 1) return;
    setSessionNotebooks(foundReferencedNotebook);
  }, [notebookTitle]);

  return sessionNotebooks;
};
