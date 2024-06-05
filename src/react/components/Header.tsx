import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import NavBar from "./NavBar";

const Header = () => {
  const [response, setResponse] = useState<
    {} & {
      data: {};
    }
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(``)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResponse(res);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      setupHeaderItems();
    }
  }, [loading]);

  return loading ? (
    <></>
  ) : (
    <NavBar />
  );
};

export default Header;
