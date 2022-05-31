import { callMyAPI } from "./index.js";

export async function createSection(
  userId,
  notebookId,
  template,
  sectionName = undefined
) {
  if (!template[0]) return;

  const response = await callMyAPI({
    userId,
    endpoint: `api/admin/${userId}/create-section`,
    method: "POST",
    body: {
      ...template[0],
      notebookId,
      sectionName,
    },
  });

  return response;
}
