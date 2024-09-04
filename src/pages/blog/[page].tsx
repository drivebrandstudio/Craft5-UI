import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import cmsClient from "@/server/cmsClient";
import getPreviewToken from "@/server/getPreviewToken";
import { NavQuery } from "@/server/gql/nav.gql";
import { pageQueries } from "@/server/gql/page.gql";
import { gql } from "graphql-request";

import NewsArticle from "../../client/layouts/NewsArticle";

export default function Page({ blogEntries }) {
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return <NewsArticle data={blogEntries} />;
}

export const getStaticProps: GetStaticProps = async ({
	params,
	preview,
	previewData,
}) => {
	console.log("params");
	console.log(params);

	// no params.. go home
	if (!params || !params?.page) {
		return {
			notFound: true,
		};
	}

	// if we are in preview mode, get the token from the previewData
	const { token, typeHandle } = getPreviewToken(
		preview,
		previewData as {
			token: string;
			typeHandle: string;
		}
	);
	const client = cmsClient(preview, token);
	const page = params?.page as string[];
	const uri = "blog/" + page;

	const entryType = await client.request(
		gql`
			query EntryType($uri: [String]) {
				entry(uri: $uri) {
					typeHandle
				}
			}
		`,
		{ uri }
	);

	// if it's preview mode, use the typeHandle passed from the preview api
	// if we're building/dev mode, find the typeHandle from the data written to file
	const type = entryType.entry?.typeHandle || "blog";
	const query = pageQueries[type];

	let entry;
	try {
		entry = await client.request(query, {
			uri,
		});
	} catch (err) {
		throw new Error(err);
	}

	const seoReq = await client.request(pageQueries.landingPages, {
		uri,
	});

	const nav = await client.request(NavQuery);

	return {
		props: {
			...entry,
			seo: seoReq.entry?.seo || null,
			routes: nav.navEntries,
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
	const { entries }: TResponse = await client.request(pageQueries.pages);

	// console.log("news entries");
	// console.log(entries);
	const paths = entries
		.filter((entry) => !!entry.uri && entry.uri.includes("blog"))
		.map((entry) => ({
			params: {
				page: entry.uri.split("/")[1],
			},
		}));

	// console.log("paths news");
	// console.log(paths);

	return {
		paths,
		fallback: false,
	};
};
