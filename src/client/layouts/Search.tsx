"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Loading from "../components/Loading";
import { useApiFetch } from "../utils/api";

const Search = () => {
  // TODO: Verify this still works, changed line 12 to use next/navigation instead of react-router useLocation;
  const pathname = usePathname();

  const { response, loading } =
    useApiFetch(`{query: entries(search: "${pathname.search.replace(
      "?",
      ""
    )}", orderBy: "score") {
    title
    uri
  }
}`);

  if (loading) return <Loading fullScreen />;

  return (
    <div className="">
      {response.map((result) => (
        <article
          className="border w-2/4 mx-auto border-gray-400 rounded-lg md:p-4 bg-white sm:py-3 py-4 px-2 m-10"
          data-article-path="#"
          data-content-user-id="112962"
          key={result.uri}
        >
          <div role="presentation">
            <div className="pl-12 md:pl-10 xs:pl-10">
              <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 leading-7">
                <Link href={`/${result.uri}`}>{result.title}</Link>
              </h2>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Search;
