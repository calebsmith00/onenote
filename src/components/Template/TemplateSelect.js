import { useTemplateSession } from "../../hooks/useTemplateSession";

function Templates() {
  const { templates } = useTemplateSession();

  return templates.map((template, index) => (
    <option key={index}>{template["template-title"]}</option>
  ));
}

export default function TemplateSelect({ updateTemplate }) {
  return (
    <span>
      <label htmlFor="templates">Select a template: </label>
      <select name="templates" id="templates" onChange={updateTemplate}>
        <Templates />
      </select>
    </span>
  );
}
