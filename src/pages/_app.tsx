import React from "react";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@/client/components/atoms/theme-provider";
import Footer from "@/client/components/Footer";
import Nav, { NavBar2, NavBar3 } from "@/client/components/library/NavBar";
import Seo from "@/client/components/Seo";

import "../client/scss/main.scss";

import ResizeNavBar from "@/client/components/ResizeNavbar";

export default function AppRoot({
	Component,
	pageProps,
}: AppProps): JSX.Element {
	const { seo, routes, ...props } = pageProps;

	return (
		<>
			<Seo {...seo} />

			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{/* <Nav routes={routes} /> */}
				{/* <NavBar2 routes={routes} /> */}
				<NavBar3 />
				{/* <ResizeNavBar /> */}
				<Component {...props} />
				<Footer />
			</ThemeProvider>
		</>
	);
}
