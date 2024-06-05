import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

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
