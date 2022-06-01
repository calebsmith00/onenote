import "./Training.scss";
import { tableHeaders } from "./trainingTable";

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

export function Trainings({ activeTemplate, trainingList }) {
  if (trainingList.length < 1) return;

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

export function SubmitTrainings({ trainingList }) {
  if (trainingList.length < 1) return;

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
