import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import cmsClient from "../server/cmsClient";
import getPreviewToken from "../server/getPreviewToken";
import getEntryType from "../server/getEntryType";
import writeDataToDisk from "../server/writeDataToDisk";
import { PagePathQuery, pageQueries } from "../server/gql/page.gql";
import { gql } from "graphql-request";
import InsidePage from "@/client/layouts/InsidePage";
import Home from "@/client/layouts/Home";

export interface IPageProps {
  type: "post" | "pagination";
  [k: string]: any;
}

function Page(props: IPageProps): JSX.Element {
  switch (props.entryType) {
    case "home":
      return <Home />;
    case "news":
      return <div>news</div>;
    case "newsListing":
      return <div>news listing</div>;
    case "newsCategories":
      return <div>news Categories</div>;
    case "contactPage":
      return <div>contact page</div>;
    case "userGuide":
      return <div>user guide</div>;
    case "pages":
      return <InsidePage />;
    default:
      return <div>Unknown template</div>;
  }
}

export default Page;

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
}) => {
  // no params.. go home
  // if (!params || !params?.page) {
  //   console.log("not found");
  //   return {
  //     notFound: true,
  //   };
  // }

  // if we are in preview mode, get the token from the previewData
  const { token, typeHandle } = getPreviewToken(
    preview,
    previewData as {
      token: string;
      typeHandle: string;
    }
  );
  const client = cmsClient(preview, token);

  const entryType = await client.request(
    gql`
      query EntryType($uri: [String]) {
        entry(uri: $uri) {
          typeHandle
        }
      }
    `,
    { uri: params.page.join("/") }
  );

  const page = params.page as string[];
  const uri = page.join("/");

  // if it's preview mode, use the typeHandle passed from the preview api
  // if we're building/dev mode, find the typeHandle from the data written to file
  const type = entryType.entry.typeHandle || "pages";
  const query = pageQueries[type];

  let entry;
  try {
    entry = await client.request(query, {
      uri,
      seo: uri,
    });
  } catch (err) {
    throw new Error(err);
  }

  const seoReq = await client.request(pageQueries.landingPages, {
    uri: params.page.join("/"),
  });

  const nav = await client.request(gql`
    {
      navEntries: entries(level: 1) {
        level
        slug
        uri
        typeHandle
        sectionHandle
        title
        children {
          slug
          uri
          typeHandle
          sectionHandle
          title
        }
      }
    }
  `);

  return {
    props: {
      ...entry,
      seo: seoReq.entry.seo,
      routes: nav.navEntries,
      entryType: entryType.entry.typeHandle,
    },
  };
};

type TEntry = {
  uri: string;
};

type TResponse = {
  entries: TEntry[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = cmsClient();
  const { entries }: TResponse = await client.request(PagePathQuery);

  const paths = entries
    .filter((entry) => entry.uri)
    .map((entry) => ({
      params: { page: entry.uri.split("/") },
    }));

  await writeDataToDisk(JSON.stringify(entries), "pages.data");

  return {
    paths,
    fallback: false,
  };
};
