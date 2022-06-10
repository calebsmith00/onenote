import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSectionPages } from "../../hooks/useSectionPages";

const Section = () => {
  const { userId, nid, sid } = useParams();
  const [loading, setLoading] = useState(true);
  const pages = useSectionPages(userId, sid);
  const urlConstructor = `/user/${userId}/onenote/notebook/${nid}/section/${sid}/page`;

  useEffect(() => {
    if (pages.length < 1) return;

    console.log(pages);
    setLoading(false);
  }, [pages]);

  const displayPages = () => {
    if (pages.length < 1) return;

    return pages.map((page) => {
      return (
        <Link key={page.id} to={`${urlConstructor}/${page.id}`}>
          {page.title}
        </Link>
      );
    });
  };

  return loading ? (
    <p>We are loading your pages! Please wait a few moments.</p>
  ) : (
    <div className="notebook-links">{displayPages()}</div>
  );
};

export default Section;
