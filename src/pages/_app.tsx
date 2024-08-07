import React from "react";
import type { AppProps } from "next/app";

import Seo from "@/client/components/Seo";
import { ThemeProvider } from "@/client/components/atoms/theme-provider";
import Footer from "@/client/components/Footer";
import Nav from "@/client/components/library/NavBar";

import "../client/scss/main.scss";

export default function AppRoot({
  Component,
  pageProps,
}: AppProps): JSX.Element {
  const { seo, routes, ...props } = pageProps;

  return (
    <>
      <Seo {...seo} />

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Nav routes={routes} />
        <Component {...props} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
