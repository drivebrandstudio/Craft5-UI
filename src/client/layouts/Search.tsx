"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import Loading from "../components/Loading";
import { useApiFetch } from "../utils/api";
import { PlaceholdersAndVanishInput } from "../components/library/Searchbar";

// TODO: Replace these
const placeholders = [
  "Searching for something?",
  "Find all your hopes and dreams here...",
];

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Debounce example, but this is in the wrong spot
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   debounce(() => console.log(e.target.value), 300)();
  // };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, value: any) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const { response, loading } = useApiFetch(
    searchParams.get("query")
      ? `{query: entries(search: "${searchParams.get(
          "query"
        )}", orderBy: "score") {
              title
              uri
            }
          }`
      : null
  );

  if (loading) return <Loading fullScreen />;

  return (
    <div className="mb-40 dark:text-white dark:bg-slate-700 h-screen">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        // onChange={handleChange}
        onSubmit={onSubmit}
      />
      {response &&
        response?.query.map((result) => (
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
