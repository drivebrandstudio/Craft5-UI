import React from "react";

import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

import cmsClient from "@/server/cmsClient";
import { HomeEntryQuery } from "@/server/gql/home.gql";
import { NavQuery } from "@/server/gql/nav.gql";
import { pageQueries } from "@/server/gql/page.gql";

export interface IPageProps {
	[k: string]: any;
}

const News = dynamic(import("../../client/layouts/News"));

function Index(props: IPageProps): JSX.Element {
	console.log(props);
	return <News />;
}

export default Index;

export const getStaticProps: GetStaticProps = async ({
	params,
	preview,
	previewData,
}) => {
	const client = cmsClient(preview, previewData?.token);
	const data = await client.request(HomeEntryQuery, {
		uri: params?.page?.join("/"),
	});

	const seoReq = await client.request(pageQueries.landingPages, {
		uri: params?.page?.join("/"),
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
