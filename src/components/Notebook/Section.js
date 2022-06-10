import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSectionPages } from "../../hooks/useSectionPages";

const LoadingComponent = ({ isLoading }) => {
  const [loadingString, setLoadingString] = useState(
    "We are loading the list of pages. This generally takes about 20 seconds. Please wait a few moments."
  );
  const [loadingTime, setLoadingTime] = useState(0);

  const incrementDots = () => {
    if (!isLoading) return;

    setTimeout(() => {
      setLoadingString(`${loadingString}.`);
      setLoadingTime(loadingTime + 1);
    }, 1000);

    return loadingString;
  };

  return (
    <>
      <p>{incrementDots()}</p>
      <p>({loadingTime} seconds)</p>
    </>
  );
};

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
    <LoadingComponent isLoading={loading} />
  ) : (
    <div className="notebook-links">{displayPages()}</div>
  );
};

export default Section;
