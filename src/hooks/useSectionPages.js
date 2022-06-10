import { useEffect, useState } from "react";
import { getPages } from "../requests/exports.js";

export const useSectionPages = (userId, sid) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (!userId || !sid) return;

    async function getPagesFromSection() {
      try {
        const response = await getPages(userId, sid);

        setPages(response);
        return response;
      } catch (err) {
        console.error(`[ERROR]: ${err}`);
      }
    }

    getPagesFromSection();
  }, [userId, sid]);

  return pages;
};
