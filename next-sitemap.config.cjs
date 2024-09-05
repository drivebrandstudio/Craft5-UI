// https://www.npmjs.com/package/next-sitemap

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITEMAP_URL,
	generateRobotsTxt: true,
	sitemapSize: 7000,
	generateIndexSitemap: false,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				disallow: ["/cpresources", "/vendor", "/.env"],
			},
		],
	},
};
