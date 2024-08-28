"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { IconMenu } from "@tabler/icons-react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export function BlogContentWithToc() {
	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 md:flex-row md:px-8">
			<Toc />
			<div className="flex max-w-2xl flex-1 flex-col">
				<Image
					src={blog.thumbnail}
					alt={blog.title}
					className="h-60 w-full rounded-3xl object-cover md:h-[30rem]"
					height={720}
					width={1024}
				/>
				<h2 className="mb-2 mt-6 text-2xl font-bold tracking-tight text-black dark:text-white">
					{blog.title}
				</h2>

				<div className="prose prose-sm mt-10 dark:prose-invert">
					<ReactMarkdown>{blog.content}</ReactMarkdown>
				</div>

				<div className="mt-10 max-w-2xl">
					<div className="h-px w-full bg-neutral-200 dark:bg-neutral-900" />
					<div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />
				</div>
				<div className="mt-10 flex items-center">
					<Image
						src={blog.authorImage}
						alt={blog.author}
						className="h-5 w-5 rounded-full"
						height={20}
						width={20}
					/>
					<p className="pl-2 text-sm text-neutral-600 dark:text-neutral-400">
						{blog.author}
					</p>
					<div className="mx-2 h-1 w-1 rounded-full bg-neutral-200 dark:bg-neutral-700" />
					<p className="pl-1 text-sm text-neutral-600 dark:text-neutral-400">
						{format(new Date(blog.date), "LLLL d, yyyy")}
					</p>
				</div>
			</div>
		</div>
	);
}

const Toc = () => {
	const links = [
		{ title: "Introduction", href: "#introduction" },
		{
			title: "Key Areas of AI Development",
			href: "#key-areas-of-ai-development",
		},
		{ title: "Ethical Considerations", href: "#ethical-considerations" },
		{ title: "Conclusion", href: "#conclusion" },
	];
	const [hovered, setHovered] = useState<number | null>(null);
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="sticky left-0 top-20 hidden max-w-xs flex-col self-start pr-10 md:flex">
				{links.map((link, index) => (
					<Link
						className="group/toc-link relative rounded-lg px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200"
						key={link.href}
						href={link.href}
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
							{link.title}
						</span>
					</Link>
				))}
			</div>
			<div className="sticky right-2 top-20 flex w-full flex-col items-end justify-end self-start md:hidden">
				<button
					onClick={() => setOpen(!open)}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-900"
				>
					<IconMenu className="h-6 w-6 text-black dark:text-white" />
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
									key={link.href}
									href={link.href}
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
										{link.title}
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

const dummyContentMarkdown = `

## Introduction

Artificial Intelligence (AI) has been rapidly evolving, transforming various aspects of our lives. From voice assistants to autonomous vehicles, AI is becoming increasingly integrated into our daily routines.

### Key Areas of AI Development

1. **Machine Learning**
   - Deep Learning
   - Neural Networks
   - Reinforcement Learning

2. **Natural Language Processing**
   - Language Translation
   - Sentiment Analysis
   - Chatbots and Virtual Assistants

3. **Computer Vision**
   - Image Recognition
   - Facial Recognition
   - Autonomous Vehicles

## Ethical Considerations

As AI continues to advance, it's crucial to address ethical concerns:

- Privacy and data protection
- Bias in AI algorithms
- Job displacement due to automation

## Conclusion

The future of AI is both exciting and challenging. As we continue to push the boundaries of what's possible, it's essential to balance innovation with responsible development and implementation.

> "The development of full artificial intelligence could spell the end of the human race." - Stephen Hawking

*This quote reminds us of the importance of careful consideration in AI advancement.*

![AI Concept Image](https://images.unsplash.com/photo-1719716136369-59ecf938a911?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

For more information, visit [AI Research Center](https://example.com/ai-research).
`;

type Blog = {
	title: string;
	summary?: string;
	date: string;
	author: string;
	authorImage: string;
	thumbnail: string;
	content: string;
};
const blog: Blog = {
	title: "The Future of Artificial Intelligence",
	summary:
		"Artificial Intelligence (AI) has been rapidly evolving, transforming various aspects of our lives. From voice assistants to autonomous vehicles, AI is becoming increasingly integrated into our daily routines.",
	date: "2024-02-14",
	author: "John Doe",
	authorImage: "https://assets.aceternity.com/manu.png",
	thumbnail:
		"https://images.unsplash.com/photo-1713869782573-3a6eee95c834?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	content: dummyContentMarkdown,
};
