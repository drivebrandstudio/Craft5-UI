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
  }

};
 
export default nextConfig