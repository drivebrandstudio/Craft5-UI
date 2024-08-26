"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { motion } from "framer-motion";

import { cn } from "@/client/utils/cn";

import { ApiRouteType } from "../../../server/gql/types/navItems";
import { Button } from "../atoms/Button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../atoms/drawer";
import { ModeToggle } from "../atoms/mode-toggle";
import MobileNav from "../MobileNav";
import { CardBody, CardContainer, CardItem } from "./3dCard";

// import { debounce } from "../utils/debounce";

const transition = {
	type: "spring",
	mass: 0.5,
	damping: 11.5,
	stiffness: 100,
	restDelta: 0.001,
	restSpeed: 0.001,
};

const Marquee = () => {
	return (
		<div className="relative flex overflow-x-hidden">
			<div className="py-12 animate-marquee whitespace-nowrap">
				<span className="text-4xl mx-4">Marquee Item 1</span>
				<span className="text-4xl mx-4">Marquee Item 2</span>
				<span className="text-4xl mx-4">Marquee Item 3</span>
				<span className="text-4xl mx-4">Marquee Item 4</span>
				<span className="text-4xl mx-4">Marquee Item 5</span>
			</div>

			<div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
				<span className="text-4xl mx-4">Marquee Item 1</span>
				<span className="text-4xl mx-4">Marquee Item 2</span>
				<span className="text-4xl mx-4">Marquee Item 3</span>
				<span className="text-4xl mx-4">Marquee Item 4</span>
				<span className="text-4xl mx-4">Marquee Item 5</span>
			</div>
		</div>
	);
};

function Notice() {
	return (
		<Drawer noBodyStyles>
			<DrawerTrigger className="ml-auto mr-2 relative inline-flex items-center justify-center w-10 h-10 text-lg text-white rounded bg-emerald-500">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
					/>
				</svg>
				<span className="absolute inline-flex items-center justify-center gap-1 p-1 text-sm text-white bg-pink-500 border-2 border-white rounded-full -top-1 -right-1">
					<span className="sr-only"> New Alerts </span>
				</span>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Announcements</DrawerTitle>
				</DrawerHeader>

				<div className="p-4 pb-0">test announcment</div>

				<DrawerFooter>
					<DrawerClose>
						<Button variant="outline">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export const MenuItem = ({
	setActive,
	active,
	item,
	children,
	to,
	uuid,
}: {
	setActive: (item: string) => void;
	active: string | null;
	item: string;
	children?: React.ReactNode;
	to?: string;
	uuid?: string;
}) => {
	return (
		<div
			onMouseEnter={() => setActive(item)}
			className="relative z-50 px-2 py-6"
			key={uuid || null}
		>
			<motion.p
				transition={{ duration: 0.3 }}
				className="cursor-default text-black hover:opacity-[0.9] dark:text-white"
			>
				{item}
			</motion.p>
			{active !== null && (
				<motion.div
					initial={{ opacity: 0, scale: 0.85, y: 10, borderRadius: "6px" }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={transition}
					className=""
				>
					{active === item && (
						<div className="absolute left-1/2 transform -translate-x-1/2 pt-4">
							<motion.div
								transition={transition}
								layoutId="active" // layoutId ensures smooth animation
								className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-md overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
							>
								<motion.div
									layout // layout ensures smooth animation
									className="w-max h-full p-4"
								>
									{children}
								</motion.div>
							</motion.div>
						</div>
					)}
				</motion.div>
			)}
		</div>
	);
};

export const Menu = ({
	setActive,
	children,
}: {
	setActive: (item: string | null) => void;
	children: React.ReactNode;
}) => {
	return (
		<div className="relative w-full border border-transparent dark:bg-gray-800 dark:border-white/[0.2] bg-white shadow-input flex justify-center">
			<div
				onMouseLeave={() => setActive(null)} // resets the state
				className="flex justify-center items-center px-1 lg:w-full my-4"
			>
				{children}
			</div>
		</div>
	);
};

export const ThreeDProductItem = ({
	title,
	description,
	href,
	src,
	...rest
}: {
	title: string;
	description: string;
	href: string;
	src: string;
}) => {
	return (
		<CardContainer containerClassName="flex space-x-2 p-4" {...rest}>
			<CardBody className="h-24 w-24">
				<CardItem translateZ={400}>
					<img
						src={src}
						width={70}
						height={35}
						alt={title}
						className="flex-shrink-0 rounded-md shadow-2xl object-cover"
					/>
				</CardItem>
				<CardItem>
					<h4 className="text-xl font-bold mb-1 text-black dark:text-white">
						{title}
					</h4>
					<p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
						{description}
					</p>
				</CardItem>
			</CardBody>
		</CardContainer>
	);
};

export const ProductItem = ({
	title,
	description,
	href,
	src,
	...rest
}: {
	title: string;
	description: string;
	href: string;
	src: string;
}) => {
	return (
		<div className="flex space-x-2" {...rest}>
			<img
				src={src}
				width={70}
				height={35}
				alt={title}
				className="flex-shrink-0 rounded-md shadow-2xl object-cover"
			/>
			<div>
				<h4 className="text-xl font-bold mb-1 text-black dark:text-white">
					{title}
				</h4>
				<p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
					{description}
				</p>
			</div>
		</div>
	);
};

export const HoveredLink = ({ children, ...rest }: any) => {
	return (
		<Link
			{...rest}
			prefetch={false}
			className="text-neutral-700 dark:text-neutral-200 hover:text-black "
		>
			{children}
		</Link>
	);
};

const NavBar = ({
	routes,
	announcement = true,
}: {
	routes: ApiRouteType[];
}) => {
	const [selected, setSelected] = useState(null);
	const [hovered, setHovered] = useState(null);

	const checkDescendants = (route: any) => {
		return route.descendants.map((routeDescendant: any) => {
			if (
				!!routeDescendant.descendants &&
				!!routeDescendant.descendants.length
			) {
				return (
					<div key={routeDescendant.slug}>
						<p>
							{routeDescendant.title}
							<span className={""}>&gt;</span>
						</p>
						{routeDescendant.descendants.map(checkDescendants)}
					</div>
				);
			}

			// Only render routes directly below the header route
			return route.level + 1 === routeDescendant.level ? (
				<HoveredLink
					href={`/${routeDescendant.uri}`}
					key={routeDescendant.slug}
					onMouseEnter={() => setHovered(routeDescendant)}
				>
					{routeDescendant.title}
				</HoveredLink>
			) : null;
		});
	};

	return (
		<div className="dark:text-white relative z-50">
			<MobileNav />
			<header className="hidden md:block">
				<Menu setActive={setSelected}>
					{routes
						?.filter(
							(route) => route.level === 1 || route.typeHandle === "home"
						)
						?.map((route) => {
							return !!route.children.length ||
								route.typeHandle === "newsListing" ? (
								<MenuItem
									to={route.slug}
									item={route.title}
									setActive={setSelected}
									active={selected}
									uuid={route.slug}
								>
									<div className="flex">
										{hovered?.headerImage?.[0] ? (
											<img src={hovered?.headerImage[0].url} />
										) : (
											<div
												role="status"
												className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
											>
												<div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
													<svg
														className="w-10 h-10 text-gray-200 dark:text-gray-600"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														fill="currentColor"
														viewBox="0 0 20 18"
													>
														<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
													</svg>
												</div>
											</div>
										)}
										<div className="text-sm grid grid-cols-3 md:grid-cols-4 gap-5 p-4">
											{route.typeHandle === "newsListing"
												? routes
														.filter(
															(route) =>
																route.typeHandle === "news"
														)
														.map((item) => (
															<HoveredLink
																href={`/${item.uri}`}
																key={item.slug}
																onMouseEnter={() =>
																	setHovered(item)
																}
															>
																{item.title}
															</HoveredLink>
														))
												: route.children.map((item) => (
														<HoveredLink
															href={`/${item.uri}`}
															key={item.slug}
															onMouseEnter={() =>
																setHovered(item)
															}
														>
															{item.title}
														</HoveredLink>
												  ))}{" "}
										</div>
									</div>
								</MenuItem>
							) : (
								<Link
									prefetch={false}
									href={
										route.typeHandle === "home"
											? "/"
											: `/${route.uri}`
									}
									key={route.slug}
									onMouseEnter={() => {
										setHovered(null);
										setSelected(null);
									}}
									className="mx-2"
								>
									{route.title}
								</Link>
							);
						})}
					<Link
						prefetch={false}
						href={"https://www.admin.example.drivedev.net/access"}
						key={"admin"}
						onMouseEnter={() => {
							setHovered(null);
							setSelected(null);
						}}
						className="mx-2"
					>
						Admin
					</Link>
					<Notice />
					<div
						onMouseEnter={() => {
							setHovered(null);
							setSelected(null);
						}}
					>
						<ModeToggle />
					</div>
				</Menu>
			</header>
			{/* <LightBoard
        text={"A message for the viewer. what happens if this gets really long though?"}
        rows={15}
        lightSize={2}
        gap={0}
        font="default"
        updateInterval={1500}
        colors={{
          background: "#1a1a1a",
          textDim: "#ff9999",
          drawLine: "#ffff99",
          textBright: "#99ffff",
        }}
      /> */}
		</div>
	);
};

export const NavBar2 = ({ routes }: { routes: ApiRouteType[] }) => {
	const [isToggleOpen, setIsToggleOpen] = useState(false);

	const router = useRouter();

	return (
		<header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
			<div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
				<nav
					aria-label="main navigation"
					className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
					role="navigation"
				>
					{/*      <!-- Brand logo --> */}
					<a
						id="WindUI"
						aria-label="WindUI logo"
						aria-current="page"
						className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
						href="javascript:void(0)"
					>
						<svg
							width="300"
							height="300"
							viewBox="0 0 300 300"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12 bg-emerald-500"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M88.1121 88.1134L150.026 150.027L150.027 150.027L150.027 150.027L150.028 150.027L150.027 150.026L88.1133 88.1122L88.1121 88.1134ZM273.878 273.877C272.038 274.974 196.128 319.957 165.52 289.349L88.1124 211.942L26.1434 273.911C26.1434 273.911 -20.3337 196.504 10.651 165.519L88.1121 88.1134L26.1417 26.1433C26.1417 26.1433 69.6778 0.00338007 104.519 0H0V300H300V0H104.533C116.144 0.00112664 126.789 2.90631 134.534 10.651L211.941 88.1123L273.877 26.177C274.974 28.0159 319.957 103.926 289.349 134.535L211.942 211.942L273.878 273.877ZM273.878 273.877L273.912 273.857V273.911L273.878 273.877ZM273.877 26.177L273.911 26.1429H273.857C273.857 26.1429 273.863 26.1544 273.877 26.177Z"
								fill="white"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M0 0H300V300H0V0ZM150.026 150.025C121.715 99.731 88.1131 88.1122 88.1131 88.1122L10.6508 165.519C10.6508 165.519 26.143 150.027 150.026 150.027H150.027C150.026 150.027 150.026 150.027 150.026 150.027L150.026 150.027C99.731 178.339 88.1124 211.941 88.1124 211.941L165.52 289.348C165.52 289.348 150.032 273.86 150.027 150.027H150.029C178.341 200.323 211.944 211.942 211.944 211.942L289.352 134.535C289.352 134.535 273.864 150.023 150.027 150.027V150.027L150.027 150.027C200.322 121.715 211.941 88.1125 211.941 88.1125L134.534 10.651C134.534 10.651 150.026 26.1431 150.026 150.025ZM150.027 150.027L150.026 150.027C150.026 150.026 150.026 150.026 150.026 150.025C150.026 150.025 150.027 150.026 150.027 150.027ZM150.027 150.027L150.027 150.026L150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027L150.027 150.027ZM150.027 150.027C150.027 150.027 150.027 150.027 150.027 150.027H150.027L150.027 150.027Z"
								fill="rgba(255,255,255,.2)"
							/>
						</svg>
						Brand
					</a>
					{/*      <!-- Mobile trigger --> */}
					<button
						className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
							isToggleOpen
								? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
								: ""
						}
              `}
						onClick={() => setIsToggleOpen(!isToggleOpen)}
						aria-expanded={isToggleOpen ? "true" : "false"}
						aria-label="Toggle navigation"
					>
						<div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
							></span>
						</div>
					</button>
					{/*      <!-- Navigation links --> */}
					<ul
						role="menubar"
						aria-label="Select page"
						className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
							isToggleOpen
								? "visible opacity-100 backdrop-blur-sm"
								: "invisible opacity-0"
						}`}
					>
						{/* {routes
							?.filter(
								(route) =>
									route.level === 1 || route.typeHandle === "home"
							)
							?.map((route) => {
								return !!route.children.length ||
									route.typeHandle === "newsListing" ? (
									<li
										key={route.slug}
										role="none"
										className="flex items-stretch"
									>
										<Link
											role="menuitem"
											aria-haspopup="false"
											className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
											href={route.uri}
										>
											<span>{route.title}</span>
										</Link>
									</li>
								) : (
									<li
										key={route.slug}
										role="none"
										className="flex items-stretch"
									>
										<Link
											prefetch={false}
											href={
												route.typeHandle === "home"
													? "/"
													: `/${route.uri}`
											}
											key={route.slug}
											className={cn(
												"flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8",
												{
													"text-emerald-400":
														route.uri === router.pathname ||
														(route.uri === "winter" &&
															router.pathname === "/"),
												}
											)}
										>
											{route.title}
										</Link>
									</li>
								);
							})} */}

						<li role="none" className="flex items-stretch">
							<Link
								role="menuitem"
								aria-haspopup="false"
								className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
								href={"/#"}
							>
								<span>route 1</span>
							</Link>
						</li>
						<li role="none" className="flex items-stretch">
							<Link
								role="menuitem"
								aria-haspopup="false"
								className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
								href={"/#"}
							>
								<span>route 2</span>
							</Link>
						</li>
						<li role="none" className="flex items-stretch">
							<Link
								role="menuitem"
								aria-haspopup="false"
								className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
								href={"/#"}
							>
								<span>route 3</span>
							</Link>
						</li>
					</ul>
					<ModeToggle className="self-center" />
				</nav>
			</div>
		</header>
	);
};

export const NavBar3 = () => {
	return (
		<nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
			<div className="text-black dark:text-white">logo</div>
			<section className="flex gap-2">
				<button
					// onClick={() => {
					//   document.getElementById("launch-schedule")?.scrollIntoView({
					//     behavior: "smooth",
					//   });
					// }}
					className="flex items-center gap-1 text-xs hover:text-pink-900 dark:hover:text-pink-300 text-zinc-900 dark:text-zinc-400"
				>
					Nav Button
				</button>
				<ModeToggle />
			</section>
		</nav>
	);
};
export default NavBar;
