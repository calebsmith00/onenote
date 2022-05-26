import { graphConfig } from "./authConfig.js";

export const callMsGraph = async ({
  accessToken,
  base = `${graphConfig.graphMeEndpoint}`,
  endpoint = "",
  contentType = "text/html",
  method = "GET",
  body = undefined,
}) => {
  try {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("Content-Type", contentType);

    const options = {
      method,
      headers: headers,
      body,
    };

    if (base === "userSelector") base = `${graphConfig.graphUserEndpoint}`;

    return await fetch(`${base}${endpoint}`, options);
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
};
