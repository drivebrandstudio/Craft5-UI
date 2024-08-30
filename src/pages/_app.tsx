import React from "react";

import type { AppProps } from "next/app";

import { ThemeProvider } from "@/client/components/atoms/theme-provider";
import CenteredFooter from "@/client/components/CenteredFooter";
import NavBar, { NavBar2, NavBar3 } from "@/client/components/library/NavBar";
import Seo from "@/client/components/Seo";

import "../client/scss/main.scss";

import Image from "next/image";

import { AiOutlineProduct } from "react-icons/ai";
import { CgComponents } from "react-icons/cg";
import { FaExchangeAlt, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiGooglehome } from "react-icons/si";

import { FloatingDock } from "@/client/components/library/FloatingDock";
import ResizeNavBar from "@/client/components/ResizeNavbar";

export default function AppRoot({
	Component,
	pageProps,
}: AppProps): JSX.Element {
	const { seo, routes, ...props } = pageProps;

	// TODO STARTUP: Replace these with routes
	const links = [
		{
			title: "Home",
			icon: (
				<SiGooglehome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "#",
		},

		{
			title: "Products",
			icon: (
				<AiOutlineProduct className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "#",
		},
		{
			title: "Components",
			icon: (
				<CgComponents className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "#",
		},
		{
			title: "Aceternity UI",
			icon: (
				<Image
					src="https://assets.aceternity.com/logo-dark.png"
					width={20}
					height={20}
					alt="Aceternity Logo"
				/>
			),
			href: "#",
		},
		{
			title: "Changelog",
			icon: (
				<FaExchangeAlt className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "#",
		},

		{
			title: "Twitter",
			icon: (
				<FaTwitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "#",
		},
		{
			title: "Instagram",
			icon: (
				<FaInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "#",
		},
	];

	return (
		<>
			<Seo {...seo} />
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{/* NAVIGATION COMPONENTS start */}
				{/* <NavBar routes={routes} /> */}
				<div className="hidden md:block">
					<NavBar2 routes={routes} />
				</div>
				{/* <NavBar3 /> */}
				{/* <ResizeNavBar /> */}
				<div className="md:hidden fixed inset-x-0 bottom-[15px] flex items-center justify-center z-50">
					<FloatingDock items={links} />
				</div>
				{/* NAVIGATION COMPONENTS end */}

				{/* SRC > CLIENT > LAYOUTS start */}
				<Component {...props} />
				{/* SRC > CLIENT > LAYOUTS end */}

				{/* FOOTER COMPONENTS start */}
				{/* <Footer /> */}
				<CenteredFooter />
				{/* <SplitFooter /> */}
				{/* FOOTER COMPONENTS end */}
			</ThemeProvider>
		</>
	);
}
