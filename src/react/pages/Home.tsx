import React, { useState, useEffect } from "react";

import { apiFetch } from "../utils/api.ts";
import Loading from "../components/Loading.tsx";

function Home() {
  const [response, setResponse] = useState<null>();
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

        console.log(res)
      });
  }, []);

  // REMOVE THIS ONCE STARTING ON PROJECT
  useEffect(() => {
    setLoading(false);
  }, [loading]);

  if (loading) return <Loading />;

  return <div className="h-screen">coming soon</div>;
}

export default Home;
