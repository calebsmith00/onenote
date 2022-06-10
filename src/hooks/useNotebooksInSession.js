import { useState, useEffect } from "react";

export const useNotebookInSession = (notebookId) => {
  const [sessionNotebooks, setSessionNotebooks] = useState([]);

  useEffect(() => {
    const session = sessionStorage.getItem("notebooks");
    const parsedSession = JSON.parse(session);

    if (parsedSession.length < 1) return;

    const foundReferencedNotebook = parsedSession.filter(
      (notebook) => notebook.id === notebookId
    );

    if (foundReferencedNotebook.length < 1) return;
    setSessionNotebooks(foundReferencedNotebook);
  }, [notebookId]);

  return sessionNotebooks;
};
