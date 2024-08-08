import React from "react";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@/client/components/atoms/theme-provider";
import Footer from "@/client/components/Footer";
import Nav, { NavBar2, NavBar3 } from "@/client/components/library/NavBar";
import Seo from "@/client/components/Seo";

import "../client/scss/main.scss";

import CenteredFooter from "@/client/components/CenteredFooter";
import ResizeNavBar from "@/client/components/ResizeNavbar";
import SplitFooter from "@/client/components/SplitFooter";

export default function AppRoot({
	Component,
	pageProps,
}: AppProps): JSX.Element {
	const { seo, routes, ...props } = pageProps;

	return (
		<>
			<Seo {...seo} />

			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{/* NAVIGATION COMPONENTS start */}
				{/* <Nav routes={routes} /> */}
				{/* <NavBar2 routes={routes} /> */}
				{/* <NavBar3 /> */}
				<ResizeNavBar />
				{/* NAVIGATION COMPONENTS end */}

				{/* SRC > CLIENT > LAYOUTS start */}
				<Component {...props} />
				{/* SRC > CLIENT > LAYOUTS end */}

				{/* FOOTER COMPONENTS start */}
				{/* <Footer /> */}
				{/* <CenteredFooter /> */}
				<SplitFooter />
				{/* FOOTER COMPONENTS end */}
			</ThemeProvider>
		</>
	);
}
