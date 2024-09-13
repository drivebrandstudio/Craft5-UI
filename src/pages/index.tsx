import React from "react";

import { GetStaticProps } from "next";

import { HomeEntryQuery } from "@/gql/home.gql";
import { NavQuery } from "@/gql/nav.gql";
import { pageQueries } from "@/gql/page.gql";
import { HomeQueryType } from "@/gql/types/home";
import { NavQueryType } from "@/gql/types/nav";
import { SeoTypes } from "@/gql/types/page";
import cmsClient from "@/helpers/cmsClient";

import Home from "@/client/layouts/Home";

export interface IPageProps {
	[k: string]: any;
}

function Index(
	props: SeoTypes & { data: HomeQueryType } & NavQueryType
): JSX.Element {
	return <Home data={props.data} />;
}

export default Index;

export const getStaticProps: GetStaticProps = async ({
	params,
	preview,
	previewData,
}) => {
	const client = cmsClient(preview, previewData?.token);
	const data: HomeQueryType = await client.request(HomeEntryQuery, {
		uri: "__home__",
	});

	const seoReq: { entry: SeoTypes } = await client.request(
		pageQueries.landingPages,
		{
			uri: "__home__",
		}
	);

	const nav: NavQueryType = await client.request(NavQuery);

	return {
		props: {
			seo: seoReq.entry?.seo || null,
			routes: nav.navEntries,
			data,
		},
	};
};
