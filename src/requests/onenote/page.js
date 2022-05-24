import { validateToken } from "../validation.js";
import { callMsGraph } from "../graph/index.js";
import { loginRequest } from "../graph/authConfig.js";

export async function getPage(instance, account, pageId) {
  let response = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  });
  validateToken(response);

  let graphResponse = await callMsGraph({
    accessToken: response.accessToken,
    endpoint: `/onenote/pages/${pageId}/content?includeIDs=true`,
  });

  graphResponse = await graphResponse.text();
  if (!graphResponse)
    throw new Error("There was no valid response from MSGraph.");

  let parser = new DOMParser();
  let doc = parser.parseFromString(graphResponse, "text/html");

  return doc;
}
