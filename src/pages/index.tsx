import React from "react";

import { GetStaticProps } from "next";

import cmsClient from "@/helpers/cmsClient";
import { HomeEntryQuery } from "@/server/gql/home.gql";
import { pageQueries } from "@/server/gql/page.gql";

import Home from "@/client/layouts/Home";

export interface IPageProps {
	[k: string]: any;
}

function Index(props: IPageProps): JSX.Element {
	return <Home data={props.data} />;
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

	// const nav = await client.request(NavQuery);

	return {
		props: {
			seo: seoReq.entry?.seo || null,
			// routes: nav.navEntries,
			data,
		},
	};
};
