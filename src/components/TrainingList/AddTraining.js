import { useEffect, useState } from "react";
import {
  useTemplateSession,
  useTemplateHTML,
} from "../../hooks/useTemplateSession";
import { useTrainingSession } from "../../hooks/useTrainingSession";
import CreateTrainingForm from "./CreateTrainingForm";
import ModifyTemplateForm from "./ModifyTemplateForm";
import "./Training.scss";

export default function AddTraining() {
  const [trainingList, setTrainingList] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState("");
  const [finished, setFinished] = useState(false);
  const { templates } = useTemplateSession();
  const foundTrainingList = useTrainingSession(activeTemplate);

  useEffect(() => {
    if (templates.length <= 0) return;
    if (foundTrainingList.length > 0) setTrainingList(foundTrainingList);
    if (!activeTemplate) setActiveTemplate(templates[0]["template-title"]);
  }, [templates, foundTrainingList, activeTemplate]);

  const updateActiveTemplate = (active) => {
    setActiveTemplate(active);
  };

  const updateTrainingList = (list) => {
    return setTrainingList([...trainingList, list]);
  };

  const updateFinished = (done) => {
    setFinished(done);
  };

  return templates.length > 0 ? (
    <>
      <h1>Add some trainings</h1>
      <CreateTrainingForm
        updateTemplate={updateActiveTemplate}
        updateTrainingList={updateTrainingList}
        updateFinished={updateFinished}
      />

      <ModifyTemplateForm
        activeTemplate={activeTemplate}
        trainingList={trainingList}
        updateTrainingList={updateTrainingList}
        finished={finished}
        updateFinished={updateFinished}
      />
    </>
  ) : (
    <p>Uh oh! No templates could be found.</p>
  );
}
