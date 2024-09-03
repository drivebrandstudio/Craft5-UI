// https://www.npmjs.com/package/next-sitemap

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITEMAP_URL,
	generateRobotsTxt: true,
	sitemapSize: 7000,
	exclude: ["/server-sitemap.xml"],
	robotsTxtOptions: {
		additionalSitemaps: [
			"localhost:3000/server-sitemap-index.xml", // TODO STARTUP: Update this url for sitemap
		],
	},
};
