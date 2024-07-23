import React from "react";
import { GetStaticProps } from "next";
import cmsClient from "../server/cmsClient";
import getPreviewToken from "../server/getPreviewToken";
import parseSEO from "../server/parseSEO";
import dynamic from "next/dynamic";
import { gql } from "graphql-request";
import { HomeEntryQuery } from "@/server/gql/home.gql";

export interface IPageProps {
  [k: string]: any;
}

const App = dynamic(import("../client/layouts/Home"));

function Index(props: IPageProps): JSX.Element {
  return <App data={props.data} />;
}

export default Index;

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("index token");
  console.log(context);

  const client = cmsClient(context?.preview, context?.previewData?.token);
  const data = await client.request(HomeEntryQuery, {
    uid: context?.previewData?.entryUid || null,
  });
 
  console.log("INDEX HELLO");
  console.log(data.homeEntry);
  return {
    props: {
      data: data.homeEntry,
    },
  };
};
