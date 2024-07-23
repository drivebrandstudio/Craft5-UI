import React from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";

import Seo from "@/client/components/Seo";
import { ThemeProvider } from "@/client/components/library/ui/theme-provider";
import Footer from "@/client/components/Footer";

import "../client/scss/main.scss";
import { GetStaticProps } from "next";
import getPreviewToken from "@/server/getPreviewToken";
import cmsClient from "../server/cmsClient";
import { gql } from "graphql-request";

const Nav = dynamic(() => import("@/client/components/NavBar"), { ssr: false });

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

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("_app getpreview");
  console.log(context);
  const { token } = getPreviewToken(
    preview,
    previewData as {
      token: string;
      typeHandle: string;
    }
  );
  console.log("run app root");

  const client = cmsClient(context?.preview, token);
  const data = await client.request(
    gql`
      {
        seoEntries: entries {
          ... on home_home_Entry {
            id
            seo {
              description
              title
              social {
                facebook {
                  description
                  title
                  image {
                    url
                  }
                }
                twitter {
                  description
                  title
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    { uri: params.page.join("/") }
  );

  const nav = await client.request(gql`
    {
      navEntries: entries(level: 1, showInMenu: true) {
        level
        slug
        uri
        typeHandle
        sectionHandle
        title
        descendants(showInMenu: true) {
          level
          slug
          uri
          typeHandle
          sectionHandle
          title
          descendants(showInMenu: true) {
            level
            slug
            uri
            typeHandle
            sectionHandle
            title
          }
        }
      }
    }
  `);
  const { seo, ...pageProps } = data.seoEntries.find((item) => !!item.id);

  console.log("HELLO");
  return {
    props: {
      seo,
      routes: nav.navEntries,
      data: data.homeEntry[0],
      ...pageProps,
    },
  };
};
