import { callMsGraph } from "../graph";
import { loginRequest } from "../graph/authConfig";

export async function getSectionPages(instance, account, sectionId) {
  try {
    const { accessToken } = await instance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    if (!accessToken) return;

    const options = {
      accessToken,
      endpoint: `/onenote/sections/${sectionId}/pages?$select=title,id`,
      contentType: "application/json",
    };

    const response = await callMsGraph(options);
    const json = await response.json();

    if (json.value.length <= 0) return;
    return json.value;
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}
