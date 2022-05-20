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
