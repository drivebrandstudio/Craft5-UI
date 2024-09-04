/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "export", // Outputs a Single-Page Application (SPA).
	// distDir: "./dist", // Changes the build output directory to `./dist/`.
	// basePath: '', // Sets the base path to `/some-base-path`.

	// !! WARN !!
	// Dangerously allow production builds to successfully complete even if
	// your project has type errors.
	// !! WARN !!
	eslint: {
		ignoreDuringBuilds: true,
	},
	// !! WARN !!
	// Dangerously allow production builds to successfully complete even if
	// your project has type errors.
	// !! WARN !!
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "[website_name].com",
				port: "",
				pathname: "/[filesystem_name]/**",
			},
			{
				protocol: "https",
				hostname: "craft.ddev.site",
				port: "",
				pathname: "/public/**",
			},
		],
	},
	async redirects() {
		return [
			// EXAMPLE REDIRECTS
			// Basic redirect
			// {
			// 	source: "/about",
			// 	destination: "/",
			// 	permanent: true,
			// },
			// Wildcard path matching
			// {
			// 	source: "/blog/:slug",
			// 	destination: "/news/:slug",
			// 	permanent: false,
			// },
		];
	},
};

export default nextConfig;
