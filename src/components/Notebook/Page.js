import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNotebookInSession } from "../../hooks/useNotebooksInSession";
import { getPage } from "../../requests/onenote/page";

export default function Page() {
  const { userId, pid } = useParams();
  const sessionNotebooks = useNotebookInSession(pid);

  useEffect(() => {
    getPage({
      userId,
      pid,
    });
  });

  return (
    <>
      <h1>{sessionNotebooks.length}</h1>
    </>
  );
}
