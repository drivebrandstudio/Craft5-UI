import React, { Suspense } from "react";

import { GetStaticProps } from "next";

import cmsClient from "@/helpers/cmsClient";
import { HomeEntryQuery } from "@/gql/home.gql";
import { NavQuery } from "@/gql/nav.gql";
import { pageQueries } from "@/gql/page.gql";

import Search from "@/client/layouts/Search";

function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	return (
		<div>
			<h1>search page</h1>
			<Suspense key={query + currentPage} fallback={<div>coming soon</div>}>
				<Search searchQuery={query} />
			</Suspense>
		</div>
	);
}

export default Page;

export const getStaticProps: GetStaticProps = async ({
	params,
	preview,
	previewData,
}) => {
	const client = cmsClient(preview, previewData?.token);
	const data = await client.request(HomeEntryQuery, {
		uid: previewData?.entryUid || null,
		slug: previewData?.entryUid ? null : "home",
	});

	const seoReq = await client.request(pageQueries.landingPages, {
		uri: params?.page,
	});

	const nav = await client.request(NavQuery);

	return {
		props: {
			seo: seoReq.entry?.seo || null,
			routes: nav.navEntries,
			data,
		},
	};
};
