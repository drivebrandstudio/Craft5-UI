import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { useLocation } from "react-router";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  console.log(location);
  console.log(location.search.replace("?", "").replace("%20", " "));

  useEffect(() => {
    !loading && setLoading(true);

    apiFetch(`{query: entries(search: "${location.search.replace(
      "?",
      ""
    )}", orderBy: "score") {
    title
    uri
  }
}`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res);
        console.log(res);
        setLoading(false);
      });
  }, [location]);

  if (loading) return <Loading />;

  return (
    <div className="">
      {searchResults.data.query.map((result) => (
        <article
          className="border w-2/4 mx-auto border-gray-400 rounded-lg md:p-4 bg-white sm:py-3 py-4 px-2 m-10"
          data-article-path="#"
          data-content-user-id="112962"
        >
          <div role="presentation">
            <div className="pl-12 md:pl-10 xs:pl-10">
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 leading-7">
                <Link to={`/${result.uri}`}>{result.title}</Link>
              </h2>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Search;
