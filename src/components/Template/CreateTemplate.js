import { useState } from "react";
import { Link } from "react-router-dom";
import "./Template.scss";

export default function CreateTemplate() {
  const [template, setTemplate] = useState({});
  const [templateCreated, setTemplateCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTemplate({
      ...template,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentSession =
      sessionStorage.getItem("template") || JSON.stringify("");

    sessionStorage.setItem(
      "template",
      JSON.stringify([...JSON.parse(currentSession), template])
    );

    setTemplate({});
    setTemplateCreated(true);
  };

  return (
    <>
      {templateCreated ? (
        <>
          <p>Nice! Your template has been created.</p>
          <p>
            Go ahead and add some&nbsp;
            <Link to="/admin/onenote/template/add/trainings">trainings.</Link>
          </p>
        </>
      ) : (
        <>
          <form className="template-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Template Name"
              className="template-input"
              onChange={handleChange}
              name="template-title"
            />
            <input
              type="text"
              placeholder="Number of Sections"
              className="template-input"
              onChange={handleChange}
              name="template-sections"
            />

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}
