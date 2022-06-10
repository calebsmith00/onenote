import { callMyAPI } from ".";

export const getPages = async (userId, sid) => {
  const options = {
    userId,
    endpoint: `api/user/${userId}/section/${sid}/retrieve-pages`,
  };

  const response = await callMyAPI(options);
  const json = await response.json();

  return json;
};
