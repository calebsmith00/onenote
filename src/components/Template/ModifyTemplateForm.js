import "./Template.scss";
import { tableHeaders } from "./trainingTable";
import { Link } from "react-router-dom";

/*
  TABLE HEADER
*/

function Headers() {
  const retrieveTableHeaders = () => {
    return tableHeaders.map((header, index) => <th key={index}>{header}</th>);
  };

  return (
    <thead className="training-headers">
      {/* Gather headers from an array of headers */}
      <tr>{retrieveTableHeaders()}</tr>
    </thead>
  );
}

/*
  TABLE BODY
*/

function Body({ trainingList }) {
  const retrieveTrainingData = (training) => {
    return Object.values(training).map((value, index) => (
      <td key={index} className="training-content">
        {value !== "" ? value : new Date().toLocaleDateString()}
      </td>
    ));
  };

  return (
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
  );
}

/*
  TABLE OF TRAININGS
*/

function Trainings({ activeTemplate, trainingList }) {
  if (!trainingList) return;

  return (
    <>
      <h1>{activeTemplate}</h1>
      <table className="training-table">
        <Headers />
        <Body trainingList={trainingList} />
      </table>
    </>
  );
}

/*
  TABLE SUBMIT
*/

function SubmitTrainings({ trainingList }) {
  if (!trainingList) return;

  return (
    <>
      <p>
        When you are satisfied with the trainings appended to your template, go
        ahead and submit below.
      </p>
      <button type="submit">Submit</button>
    </>
  );
}

/*
  OVERALL FORM
*/

export default function ModifyTemplateForm({
  activeTemplate,
  trainingList,
  finished,
  updateFinished,
}) {
  const modifyTemplate = (e) => {
    e.preventDefault();

    const currentTemplates = JSON.parse(sessionStorage.getItem("template"));
    const newTemplates = currentTemplates.map((template) => {
      const title = template["template-title"];
      if (title !== activeTemplate) return template;

      return {
        ...template,
        trainings: trainingList,
      };
    });

    sessionStorage.setItem("template", JSON.stringify(newTemplates));

    updateFinished(true);
  };

  return (
    <>
      {/* GET TABLE FOR USER TO VISUALIZE TRAINING DATA */}
      {finished ? (
        <p>
          Your entries have been added! You can continue to add training, or
          go&nbsp;
          <Link to="/">back home</Link>
        </p>
      ) : (
        <form onSubmit={modifyTemplate}>
          <Trainings
            activeTemplate={activeTemplate}
            trainingList={trainingList}
          />

          <SubmitTrainings trainingList={trainingList} />
        </form>
      )}
    </>
  );
}
