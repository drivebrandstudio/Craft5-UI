import React from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

import cmsClient from "@/server/cmsClient";
import { HomeEntryQuery } from "@/server/gql/home.gql";
import { pageQueries } from "@/server/gql/page.gql";
import { NavQuery } from "@/server/gql/nav.gql";

export interface IPageProps {
  [k: string]: any;
}

const App = dynamic(import("../client/layouts/Home"));

function Index(props: IPageProps): JSX.Element {
  return <App data={props.data} />;
}

export default Index;

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
}) => {
  const client = cmsClient(preview, previewData?.token);
  const data = await client.request(HomeEntryQuery, {
    uri: "__home__",
  });

  const seoReq = await client.request(pageQueries.landingPages, {
    uri: "__home__",
  });

  const nav = await client.request(NavQuery);

  return {
    props: {
      seo: seoReq.entry?.seo || null,
      routes: nav.navEntries,
      data: data.homeEntry,
    },
  };
};
