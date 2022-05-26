import { useTemplateHTML } from "../../hooks/useTemplateSession";

export default function Template() {
  const templateHTML = useTemplateHTML();

  return <div>{templateHTML && templateHTML}</div>;
}
