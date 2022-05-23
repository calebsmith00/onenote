import { callMyAPI } from "./graph";

export async function createNotebook(userId, template) {
  if (!template[0]) return;

  const response = await callMyAPI({
    userId,
    endpoint: `api/admin/${userId}/create-notebook`,
    method: "POST",
    body: template[0],
  });

  return response;
}

export async function createSection(userId, notebookId, template) {
  if (!template[0]) return;

  const response = await callMyAPI({
    userId,
    endpoint: `api/admin/${userId}/create-section`,
    method: "POST",
    body: {
      ...template[0],
      notebookId,
    },
  });

  return response;
}

export async function createPage(userId, sectionId, template) {
  if (!template[0]) return;

  const response = await callMyAPI({
    userId,
    endpoint: `api/admin/${userId}/section/${sectionId}/create-page`,
    method: "POST",
    body: template[0],
  });

  return response;
}
