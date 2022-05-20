import { useEffect, useState } from "react";
import { inputNeeded } from "./templateFields";
import { tableHeaders } from "./trainingTable";
import "./Template.scss";

export default function AddTraining() {
  const [training, setTraining] = useState({
    "template-request": "",
    requestDate: "",
    requestCompletionDate: "",
    "template-mentor": "",
    "template-prereq": "",
    "template-notes": "",
  });
  const [trainingList, setTrainingList] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const sessionTemplate = sessionStorage.getItem("template");
    if (!sessionTemplate) return;

    setTemplates(JSON.parse(sessionTemplate));
  }, []);

  const getInputFields = (handleChange) => {
    return inputNeeded.map((field) => (
      <input
        key={field.id}
        className="template-input"
        type="text"
        placeholder={field.placeholder}
        name={field.name}
        onChange={handleChange}
        value={training[field.name]}
        required
      />
    ));
  };

  const resetTraining = () => {
    let trainingCopy = { requestCompletionDate: "", requestDate: "" };
    inputNeeded.map((field) => {
      trainingCopy[field.name] = "";
    });

    return trainingCopy;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTrainingList([...trainingList, training]);
    setTraining(resetTraining());
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setTraining({
      ...training,
      [name]: value,
    });
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

  const renderTemplates = () => {
    return templates.map((template, index) => (
      <option key={index} value={template["template-title"]}>
        {template["template-title"]}
      </option>
    ));
  };

  const renderTrainings = () => {
    if (trainingList.length <= 0) return;

    return (
      <>
        <table className="training-table">
          <thead className="training-headers">
            <tr>{retrieveTableHeaders()}</tr>
          </thead>

          <tbody className="training-body">
            {trainingList.map((training, index) => (
              <tr key={index} className="training-row">
                <td className="training-content">
                  <input type="checkbox" disabled />
                </td>
                {retrieveTrainingData(training)}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <h1>Add some trainings</h1>
      {/* TRAINING CREATION FORM */}
      <form className="template-form" onSubmit={handleSubmit}>
        <select>
          {/* GET ALL <option> FIELDS */}
          {renderTemplates()}
        </select>

        {/* GET ALL <input> FIELDS */}
        {getInputFields(handleInputChange)}

        <button type="submit">Submit</button>
      </form>

      {/* GET TABLE FOR USER TO VISUALIZE TRAINING DATA */}
      {renderTrainings()}
    </>
  );
}
