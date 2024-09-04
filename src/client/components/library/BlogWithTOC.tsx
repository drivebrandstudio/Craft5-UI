"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

// https://pro.aceternity.com/products/blog-content-sections

export function BlogContentWithToc({ blog }) {
	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 md:flex-row md:px-8">
			<Toc
				links={blog[0]?.articleContent?.filter((entry) => !!entry.summary)}
			/>
			<div className="flex max-w-2xl flex-1 flex-col">
				<Image
					src={blog[0]?.thumbnail[0].url}
					alt={blog[0]?.title}
					className="h-60 w-full rounded-3xl object-cover md:h-[30rem]"
					height={720}
					width={1024}
				/>
				<h2 className="mb-2 mt-6 text-2xl font-bold tracking-tight text-black dark:text-white">
					{blog[0]?.title}
				</h2>

				<div className="prose prose-sm mt-10 dark:prose-invert">
					{blog[0]?.articleContent?.map((element) =>
						element.summary ? (
							<h2 id={element.id}>{element.summary}</h2>
						) : (
							<p>{element.articleText}</p>
						)
					)}
				</div>

				<div className="mt-10 max-w-2xl">
					<div className="h-px w-full bg-neutral-200 dark:bg-neutral-900" />
					<div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />
				</div>
				<div className="mt-10 flex items-center">
					<Image
						src={blog[0]?.authorImage}
						alt={blog[0]?.author}
						className="h-5 w-5 rounded-full"
						height={20}
						width={20}
					/>
					<p className="pl-2 text-sm text-neutral-600 dark:text-neutral-400">
						{blog[0]?.author}
					</p>
					<div className="mx-2 h-1 w-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
					<p className="pl-1 text-sm text-neutral-600 dark:text-neutral-400">
						{blog[0]?.data &&
							format(new Date(blog[0].date), "LLLL d, yyyy")}
					</p>
				</div>
			</div>
		</div>
	);
}

const Toc = ({ links }) => {
	const [hovered, setHovered] = useState<number | null>(null);
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="sticky left-0 top-20 hidden max-w-xs flex-col self-start pr-10 md:flex">
				{links?.map((link, index) => (
					<Link
						className="group/toc-link relative rounded-lg px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200"
						key={link.id}
						href={"#" + link.id}
						onMouseEnter={() => setHovered(index)}
						onMouseLeave={() => setHovered(null)}
					>
						{hovered === index && (
							<motion.span
								layoutId="toc-indicator"
								className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
							/>
						)}
						<span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
							{link.summary}
						</span>
					</Link>
				))}
			</div>
			<div className="sticky right-2 top-20 flex w-full flex-col items-end justify-end self-start md:hidden">
				<button
					onClick={() => setOpen(!open)}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-900"
				>
					Button
				</button>
				<AnimatePresence>
					x
					{open && (
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}
							transition={{
								duration: 0.2,
							}}
							className="mt-2 flex flex-col items-end rounded-3xl border border-neutral-100 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900"
						>
							{links.map((link, index) => (
								<Link
									className="group/toc-link relative rounded-lg px-2 py-1 text-right text-sm text-neutral-700 dark:text-neutral-200"
									key={link.id}
									href={"#" + link.id}
									onMouseEnter={() => setHovered(index)}
									onMouseLeave={() => setHovered(null)}
								>
									{hovered === index && (
										<motion.span
											layoutId="toc-indicator"
											className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
										/>
									)}
									<span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
										{link.summary}
									</span>
								</Link>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};
