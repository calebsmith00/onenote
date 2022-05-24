import { Link } from "react-router-dom";

export default function TemplateCreated() {
  return (
    <>
      <p>Nice! Your template has been created.</p>
      <p>
        Go ahead and add some&nbsp;
        <Link to="/admin/onenote/template/add/trainings">trainings.</Link>
      </p>
    </>
  );
}
