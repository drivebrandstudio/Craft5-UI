// pages/server-sitemap-index.xml/index.tsx
import { GetServerSideProps } from "next";

import { NavQuery } from "@/server/gql/nav.gql";
import { getServerSideSitemapIndexLegacy } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT + "api",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN}`,
			},
			body: JSON.stringify({
				query: NavQuery,
			}),
		}
	).then((res) => res.json());

	return getServerSideSitemapIndexLegacy(
		ctx,
		response.data.navEntries
			.filter((entry) => entry.enabled)
			.map((entry) => process.env.SITEMAP_URL + "/" + entry.uri)
		// response.data.entries.map((entry) => ({
		// 	uri: process.env.SITEMAP_URL + "/" + entry.url,
		// 	lastModified: entry.dateUpdated,
		// 	changeFrequency: "weekly",
		// 	priority: 1,
		// }))
	);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
