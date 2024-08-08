"use client";

import React, { useRef } from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";
import { ReactLenis } from "lenis/react";

import CtaContent from "../components/library/CtaContent";
import GridContent from "../components/library/GridContent";
import VideoHero from "../components/library/VideoHero";

function Home() {
	return <PlaceholderHome />;
}

export default Home;

const PlaceholderHome = () => {
	return (
		<div className="dark:text-white dark:bg-zinc-800">
			{/* Hero component */}
			<VideoHero />
			{/* Content area */}
			<GridContent />
		</div>
	);
};

export const SmoothScrollHero = () => {
	return (
		<div className="bg-zinc-950">
			<ReactLenis
				root
				options={{
					// Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
					lerp: 0.05,
					//   infinite: true,
					//   syncTouch: true,
				}}
			>
				<Hero />
				<div className="h-screen">
					<CtaContent />
				</div>
			</ReactLenis>
		</div>
	);
};

const SECTION_HEIGHT = 2700;

const Hero = () => {
	return (
		<div
			style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
			className="relative w-full"
		>
			<CenterImage />

			<ParallaxImages />

			<div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
		</div>
	);
};

const CenterImage = () => {
	const { scrollY } = useScroll();

	const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
	const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

	const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

	const backgroundSize = useTransform(
		scrollY,
		[0, SECTION_HEIGHT + 500],
		["170%", "100%"]
	);
	const opacity = useTransform(
		scrollY,
		[SECTION_HEIGHT, SECTION_HEIGHT + 500],
		[1, 0]
	);

	return (
		<motion.div
			className="sticky top-0 h-screen w-full"
			style={{
				clipPath,
				backgroundSize,
				opacity,
				backgroundImage:
					"url(https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		/>
	);
};

const ParallaxImages = () => {
	return (
		<div className="mx-auto max-w-5xl px-4 pt-[200px]">
			<ParallaxImg
				src="https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="And example of a space launch"
				start={-200}
				end={200}
				className="w-1/3"
			/>
			<ParallaxImg
				src="https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="An example of a space launch"
				start={200}
				end={-250}
				className="mx-auto w-2/3"
			/>
			<ParallaxImg
				src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Orbiting satellite"
				start={-200}
				end={200}
				className="ml-auto w-1/3"
			/>
			<ParallaxImg
				src="https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Orbiting satellite"
				start={0}
				end={-500}
				className="ml-24 w-5/12"
			/>
		</div>
	);
};

const ParallaxImg = ({
	className,
	alt,
	src,
	start,
	end,
}: {
	className?: string;
	alt: string;
	src: string;
	start: number;
	end: number;
}) => {
	const ref = useRef(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		// @ts-ignore
		offset: [`${start}px end`, `end ${end * -1}px`],
	});

	const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
	const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

	const y = useTransform(scrollYProgress, [0, 1], [start, end]);
	const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

	return (
		<motion.img
			src={src}
			alt={alt}
			className={className}
			ref={ref}
			style={{ transform, opacity }}
		/>
	);
};
