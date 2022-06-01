import { Trainings, SubmitTrainings } from "./TrainingList";
import AddTrainingSuccess from "./AddTrainingSuccess";
import { useTemplateSession } from "../../hooks/useTemplateSession";
import { useActiveTemplate } from "../../hooks/useActiveTemplate";

/*
  OVERALL FORM
*/

export default function ModifyTemplateForm({
  activeTemplate,
  trainingList,
  finished,
  updateFinished,
}) {
  const { createTemplate } = useTemplateSession();
  const { template, updateActiveTemplate } = useActiveTemplate(activeTemplate);
  // const modifyTemplate = (e) => {
  //   e.preventDefault();

  //   const currentTemplates = JSON.parse(sessionStorage.getItem("template"));
  //   const newTemplates = currentTemplates.map((template) => {
  //     const title = template["template-title"];
  //     if (title !== activeTemplate) return template;

  //     return {
  //       ...template,
  //       trainings: trainingList,
  //     };
  //   });

  //   sessionStorage.setItem("template", JSON.stringify(newTemplates));

  //   updateFinished(true);
  // };

  const modifyTemplate = (e) => {
    e.preventDefault();
    const getActive = updateActiveTemplate(activeTemplate);

    createTemplate({
      ...getActive,
      trainings: trainingList,
    });
  };

  return (
    <>
      {/* GET TABLE FOR USER TO VISUALIZE TRAINING DATA */}
      {finished ? (
        <AddTrainingSuccess />
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
