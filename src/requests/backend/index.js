export const callMyAPI = async ({
  userId,
  base = "http://localhost:3001",
  endpoint = "",
  contentType = "application/json",
  method = "GET",
  body = undefined,
}) => {
  return await fetch(`${base}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": contentType,
    },
    body: JSON.stringify(body),
  });
};
