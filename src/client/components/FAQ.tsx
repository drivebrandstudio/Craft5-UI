import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { cn } from "../utils/cn";

const questions = [
	{
		question: "Are there even real questions here?",
		answer: `No. But something really long may appear here and I wanted to make sure I gave a somewhat realistic example of something being put in here. So maybe I should stop typeing at some point but I'm guessing our clients wont respect that so why should I? Did i ask a question in an FAQ answer? yikes... twice....`,
	},
	{
		question: "Example question?",
		answer: "IDK figure it out",
	},
	{
		question: "Who is behind this project?",
		answer: "Dan",
	},
];

const FAQ = () => {
	return (
		<div className="flex flex-col mx-auto w-full max-w-[850px] items-start justify-center my-12">
			<h1
				className="text-5xl dark:text-white font-bold mb-4 text-center tracking-tight"
				style={{ opacity: 1, transform: "none" }}
			>
				Frequently Asked Questions
			</h1>
			<p
				className="text-lg dark:text-gray-300 mb-20 text-center tracking-tight"
				style={{ opacity: 1, transform: "none" }}
			>
				Find answers to some of the most commonly asked questions below.
				Click on a question to see the answer.
			</p>
			<div className="w-full text-gray-900 dark:text-gray-200">
				<Accordion>
					{questions.map((e, i) => {
						return (
							<Tab key={i}>
								<Trigger>{e.question}</Trigger>
								<Content>{e.answer}</Content>
							</Tab>
						);
					})}
				</Accordion>
			</div>
		</div>
	);
};

export const Accordion: React.FC<{
	children: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	return (
		<dl className={cn("flex flex-col items-start justify-start", className)}>
			{children}
		</dl>
	);
};

const TabContext = createContext<{
	isOpen: boolean;
	setOpenState: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const Tab: React.FC<{
	children: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	const [isOpen, setOpenState] = useState(false);

	return (
		<TabContext.Provider value={{ isOpen, setOpenState }}>
			<div className={cn("bg-bg w-full p-6", className)}>{children}</div>
		</TabContext.Provider>
	);
};

export const Trigger: React.FC<{
	children: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	const { setOpenState, isOpen } = useContext(TabContext)!;

	return (
		<dt>
			<button
				aria-expanded={isOpen}
				onClick={() => setOpenState((e) => !e)}
				className={cn(
					"flex w-full items-center justify-between gap-2 text-start text-xl font-normal",
					className
				)}
			>
				<span>{children}</span>
				<span
					className={twMerge(
						isOpen ? "-rotate-90" : "rotate-90",
						"min-w-[20px] transition-all duration-300"
					)}
				>
					&gt;
				</span>
			</button>
		</dt>
	);
};

export const Content: React.FC<{
	children: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	const { isOpen } = useContext(TabContext)!;
	return (
		<motion.dd
			layout
			aria-hidden={isOpen}
			className={cn("overflow-hidden dark:text-white", className)}
			initial={{ height: 0, pointerEvents: "none" }}
			animate={
				isOpen
					? {
							height: "fit-content",
							pointerEvents: "auto",
							marginTop: "1rem",
					  }
					: { height: 0, pointerEvents: "none" }
			}
			transition={{ duration: 0.2 }}
		>
			{children}
		</motion.dd>
	);
};

export default FAQ;
