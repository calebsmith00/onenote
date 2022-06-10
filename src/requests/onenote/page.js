import { callMyAPI } from "../backend/index.js";

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
