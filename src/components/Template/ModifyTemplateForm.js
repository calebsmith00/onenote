import "./Template.scss";
import { tableHeaders } from "./trainingTable";
import { useTrainingSession } from "../../hooks/useTrainingSession";
import { useState, useEffect } from "react";

export default function ModifyTemplateForm({
  activeTemplate,
  trainingList,
  updateTrainingList,
}) {
  //const [trainingList, setTrainingList] = useState([]);
  const foundTrainingList = useTrainingSession(activeTemplate);

  const renderTrainings = () => {
    if (!trainingList) return;

    return (
      <>
        <h1>{activeTemplate}</h1>
        <table className="training-table">
          <thead className="training-headers">
            {/* Gather headers from an array of headers */}
            <tr>{retrieveTableHeaders()}</tr>
          </thead>

          <tbody className="training-body">
            {/* Goes through each training submitted by the user in that session */}
            {trainingList.map((training, index) => (
              <tr key={index} className="training-row">
                {/* Generates a disabled status button, purely for visual */}
                <td className="training-content">
                  <input type="checkbox" disabled />
                </td>

                {/* Generates a row containing the data entered by the user */}
                {retrieveTrainingData(training)}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const retrieveTableHeaders = () => {
    return tableHeaders.map((header, index) => <th key={index}>{header}</th>);
  };

  const retrieveTrainingData = (training) => {
    return Object.values(training).map((value, index) => (
      <td key={index} className="training-content">
        {value !== "" ? value : new Date().toLocaleDateString()}
      </td>
    ));
  };

  const modifyTemplate = (e) => {
    e.preventDefault();

    let currentTemplates = JSON.parse(sessionStorage.getItem("template"));
    currentTemplates = currentTemplates.map((template) => {
      if (template["template-title"] !== activeTemplate) return template;
      template["trainings"] = trainingList;

      console.log(template);
      return template;
    });

    sessionStorage.setItem("template", JSON.stringify(currentTemplates));
  };

  return (
    <>
      {/* GET TABLE FOR USER TO VISUALIZE TRAINING DATA */}
      <form onSubmit={modifyTemplate}>
        {renderTrainings()}
        {trainingList && (
          <>
            <p>
              When you are satisfied with the trainings appended to your
              template, go ahead and submit below.
            </p>
            <button type="submit">Submit</button>{" "}
          </>
        )}
      </form>
    </>
  );
}
