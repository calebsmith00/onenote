import { validateToken } from "../validation.js";
import { callMsGraph } from "../graph/index.js";
import { loginRequest } from "../graph/authConfig.js";
import { callMyAPI } from "../backend/index.js";

// export async function getPage(instance, account, pageId, sectionId = "") {
//   try {
//     const token = await instance.acquireTokenSilent({
//       ...loginRequest,
//       account,
//     });
//     validateToken(token);

//     const parameters = `includeIDs=true&preAuthenticated=true`;
//     const pageEndpoint = `pages/${pageId}/content?${parameters}`;
//     const endpoint = sectionId
//       ? `/onenote/sections/${sectionId}/${pageEndpoint}`
//       : `/onenote/${pageEndpoint}`;
//     const graph = await callMsGraph({
//       accessToken: token.accessToken,
//       endpoint,
//     });

//     const response = await graph.text();
//     if (!response) throw new Error("There was no valid response from MSGraph.");

//     const parser = new DOMParser();
//     const doc = parser.parseFromString(response, "text/html");

//     return doc;
//   } catch (err) {
//     console.error(`ERROR: ${err}`);
//   }
// }

export async function getPage({ userId, pid }) {
  try {
    const backendAPICall = await callMyAPI({
      userId,
      endpoint: `api/user/${userId}/retrieve-page/${pid}`,
    });

    if (backendAPICall) return backendAPICall;
  } catch (err) {
    console.error(`[ERROR]: ${err}`);
  }
}
