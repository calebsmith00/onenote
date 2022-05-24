import { callMsGraph } from ".";
import { validateToken } from "../validation.js";
import { loginRequest, graphConfig } from "../graph/authConfig.js";

export async function getMemberOf(instance, account) {
  let response = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  });
  validateToken(response);

  let graphResponse = await callMsGraph({
    accessToken: response.accessToken,
    base: "userSelector",
    endpoint: `/${account.localAccountId}/memberOf?$select=displayName`,
  });
  graphResponse = await graphResponse.json();
  if (!graphResponse)
    throw new Error("There was no valid response from MSGraph.");

  graphResponse.map((member) => {
    if (!member.displayName === "Global Administrator") return undefined;
    return member.displayName;
  });
}

export async function getUsers(instance, account) {
  const response = await instance.acquireTokenSilent({
    ...loginRequest,
    account,
  });
  validateToken(response);

  const graphResponse = await callMsGraph({
    accessToken: response.accessToken,
    base: graphConfig.graphUserEndpoint,
    contentType: "application/json",
  });

  const parsedResponse = await graphResponse.json();
  if (!graphResponse)
    throw new Error("There was no valid response from MSGraph.");

  return parsedResponse.value;
}
