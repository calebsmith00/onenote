import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNotebookInSession } from "../../hooks/useNotebooksInSession";
import { getPage } from "../../requests/onenote/page";

export default function Page() {
  const { userId, pid } = useParams();
  const sessionNotebooks = useNotebookInSession(pid);
  const [tableHtml, setTableHtml] = useState([]);

  const convertTableDataToHTML = (elements) => {
    let foundElements = [];
    Object.values(elements).map((element) => {
      foundElements = element.filter((data) => data.category === "td");
    });

    const tableData = foundElements.map((element) => {
      return element.value;
    });

    setTableHtml([...tableHtml, ...tableData]);
  };

  useEffect(() => {
    const retrievePageElements = async () => {
      const response = await getPage({ userId, pid });
      const json = await response.json();

      convertTableDataToHTML(json);
    };

    retrievePageElements();
  }, []);

  const renderHtml = () => {
    if (tableHtml.length < 1) return;

    return (
      <table>
        <tbody>
          {tableHtml.map((data, index) => {
            return [
              <tr key={index}>
                <td>{data}</td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1>{sessionNotebooks.length}</h1>
      {renderHtml()}
    </>
  );
}
