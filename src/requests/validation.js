export function validateToken({ accessToken }) {
  if (!accessToken) throw new Error("Invalid access token submitted!");
}
