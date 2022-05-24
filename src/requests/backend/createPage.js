import { callMyAPI } from "./index.js";

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
