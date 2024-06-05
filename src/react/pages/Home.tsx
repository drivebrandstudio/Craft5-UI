import React, { useState, useEffect } from "react";

import Loading from "../components/Loading.js";

import { apiFetch } from "../utils/api.ts";

function Home() {
  const [response, setResponse] = useState<
    {} & {
      data: {};
    }
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (document.title != "HOME_TITLE") {
    //   document.title = "HOME_TITLE";
    // }

    apiFetch(``)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
    }
  }, [loading]);

  return (
    <>
      <Loading loading={loading} />
      {!loading && <></>}
    </>
  );
}

export default Home;
