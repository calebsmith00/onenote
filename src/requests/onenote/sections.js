import { callMsGraph } from "../graph";
import { loginRequest } from "../graph/authConfig";

export async function getSectionPages(instance, account, sectionId) {
  const { accessToken } = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  });
  if (!accessToken) return;

  const options = {
    accessToken,
    endpoint: `/onenote/sections/${sectionId}/pages`,
    contentType: "application/json",
  };

  const response = await callMsGraph(options);
  const json = await response.json();

  if (json.value.length <= 0) return;
  return json.value;
}
