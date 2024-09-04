import React from "react";

import FAQ from "../components/FAQ";
import CtaContent from "../components/library/CtaContent";
import GridContent from "../components/library/GridContent";
import { LinkPreview } from "../components/library/LinkPreview";
import { TextHoverEffect } from "../components/library/TextHover";
import VideoHero from "../components/library/VideoHero";

const VideoHome = ({ data }) => {
	return (
		<main className="dark:text-white dark:bg-zinc-800">
			{/* Hero component */}
			<VideoHero />
			{/* Content area */}
			<CtaContent />
			<GridContent />
			<FAQ />
			{/* <div className="h-[40rem] flex items-center justify-center">
				<TextHoverEffect text="DRIVE" />
			</div> */}
			{/* TODO STARTUP: uncomment once home entry has images field values */}
			{/* <div className="flex justify-center items-center h-[40rem] flex-col px-4">
				<p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left mb-10">
					Visit
					<LinkPreview
						url="https://google.com"
						imageSrc={data.assets[0].url}
						className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
					>
						Google
					</LinkPreview>
					and for amazing Tailwind and Framer Motion components.
				</p>

				<p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left ">
					I listen to{" "}
					<LinkPreview
						url="https://google.com"
						imageSrc={data.assets[1].url}
						className="font-bold"
					>
						this guy
					</LinkPreview>
					and I watch
				</p>
			</div> */}
		</main>
	);
};

export default VideoHome;
