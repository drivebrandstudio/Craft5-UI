import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../library/animated/Footer.tsx";
import Header from "../../library/animated/Header.tsx";

function Root() {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer footerClass="home dark:bg-slate-950" />
    </>
  );
}

export default Root;
