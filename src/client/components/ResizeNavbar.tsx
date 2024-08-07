"use client";

import React, { ReactNode, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import { IoIosClose, IoIosMenu } from "react-icons/io";

import { Button } from "@/client/components/atoms/Button";
import { cn } from "@/client/utils/cn";

type Props = {
	navItems: {
		link: string;
		title: string;
		target?: "_blank";
	}[];
};

const DesktopNavbar = ({ navItems }: Props) => {
	const { scrollY } = useScroll();

	const [showBackground, setShowBackground] = useState(false);

	useMotionValueEvent(scrollY, "change", (value) => {
		if (value > 100) {
			setShowBackground(true);
		} else {
			setShowBackground(false);
		}
	});
	return (
		<motion.div
			className={cn(
				"w-full flex relative justify-between px-4 py-3 rounded-md  transition duration-200 bg-transparent mx-auto"
			)}
			animate={{
				width: showBackground ? "80%" : "100%",
				background: showBackground ? "var(--neutral-900)" : "transparent",
			}}
			transition={{
				duration: 0.4,
			}}
		>
			<AnimatePresence>
				{showBackground && (
					<motion.div
						key={String(showBackground)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 1,
						}}
						className="absolute inset-0 h-full w-full bg-neutral-900 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent,white)] rounded-full"
					/>
				)}
			</AnimatePresence>
			<div className="flex flex-row gap-2 items-center">
				{/* <Logo /> */}
				<div className="flex items-center gap-1.5">
					{navItems.map((item) => (
						<NavBarItem
							href={item.link}
							key={item.title}
							target={item.target}
						>
							{item.title}
						</NavBarItem>
					))}
				</div>
			</div>
			<div className="flex space-x-2 items-center">
				<Button variant="simple" as={Link} href="/register">
					Register
				</Button>
				<Button>Book a demo</Button>
			</div>
		</motion.div>
	);
};

const navItems = [
	{
		title: "Features",
		link: "/features",
	},
	{
		title: "Pricing",
		link: "/pricing",
	},

	{
		title: "Blog",
		link: "/blog",
	},
	{
		title: "Contact",
		link: "/contact",
	},
];

function ResizeNavBar() {
	return (
		<motion.nav
			initial={{
				y: -80,
			}}
			animate={{
				y: 0,
			}}
			transition={{
				ease: [0.6, 0.05, 0.1, 0.9],
				duration: 0.8,
			}}
			className="max-w-7xl  fixed top-4  mx-auto inset-x-0 z-50 w-[95%] lg:w-full"
		>
			<div className="hidden lg:block w-full">
				<DesktopNavbar navItems={navItems} />
			</div>
			<div className="flex h-full w-full items-center lg:hidden ">
				<MobileNavbar navItems={navItems} />
			</div>
		</motion.nav>
	);
}

const MobileNavbar = ({ navItems }: any) => {
	const [open, setOpen] = useState(false);

	const { scrollY } = useScroll();

	const [showBackground, setShowBackground] = useState(false);

	useMotionValueEvent(scrollY, "change", (value) => {
		if (value > 100) {
			setShowBackground(true);
		} else {
			setShowBackground(false);
		}
	});

	return (
		<div
			className={cn(
				"flex justify-between bg-transparent items-center w-full rounded-md px-2.5 py-1.5 transition duration-200",
				showBackground &&
					" bg-neutral-900  shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
			)}
		>
			{/* <Logo /> */}
			<IoIosMenu
				className="text-white h-6 w-6"
				onClick={() => setOpen(!open)}
			/>
			{open && (
				<div className="fixed inset-0 bg-black z-50 flex flex-col items-start justify-start space-y-10  pt-5  text-xl text-zinc-600  transition duration-200 hover:text-zinc-800">
					<div className="flex items-center justify-between w-full px-5">
						{/* <Logo /> */}
						<div className="flex items-center space-x-2">
							<IoIosClose
								className="h-8 w-8 text-white"
								onClick={() => setOpen(!open)}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start justify-start gap-[14px] px-8">
						{navItems.map((navItem: any, idx: number) => (
							<>
								{navItem.children && navItem.children.length > 0 ? (
									<>
										{navItem.children.map(
											(childNavItem: any, idx: number) => (
												<Link
													key={`link=${idx}`}
													href={childNavItem.link}
													onClick={() => setOpen(false)}
													className="relative max-w-[15rem] text-left text-2xl"
												>
													<span className="block text-white">
														{childNavItem.title}
													</span>
												</Link>
											)
										)}
									</>
								) : (
									<Link
										key={`link=${idx}`}
										href={navItem.link}
										onClick={() => setOpen(false)}
										className="relative"
									>
										<span className="block text-[26px] text-white">
											{navItem.title}
										</span>
									</Link>
								)}
							</>
						))}
					</div>
					<div className="flex flex-row w-full items-start gap-2.5  px-8 py-4 ">
						<Button>Book a demo</Button>
						<Button
							variant="simple"
							as={Link}
							href="/register"
							onClick={() => {
								setOpen(false);
							}}
						>
							Register
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

type NavBarItemProps = {
	href: string;
	children: ReactNode;
	active?: boolean;
	className?: string;
	target?: "_blank";
};

export function NavBarItem({
	children,
	href,
	active,
	target,
	className,
}: NavBarItemProps) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center justify-center  text-sm leading-[110%] px-4 py-2 rounded-md  hover:bg-neutral-800 hover:text-white/80 text-white hover:shadow-[0px_1px_0px_0px_#FFFFFF20_inset] transition duration-200",
				(active || pathname?.includes(href)) && "bg-transparent text-white",
				className
			)}
			target={target}
		>
			{children}
		</Link>
	);
}

export default ResizeNavBar;
