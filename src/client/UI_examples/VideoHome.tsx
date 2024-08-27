import React from "react";

import FAQ from "../components/FAQ";
import CtaContent from "../components/library/CtaContent";
import GridContent from "../components/library/GridContent";
import { TextHoverEffect } from "../components/library/TextHover";
import VideoHero from "../components/library/VideoHero";

const VideoHome = () => {
	return (
		<main className="dark:text-white dark:bg-zinc-800">
			{/* Hero component */}
			<VideoHero />
			{/* Content area */}
			<CtaContent />
			<GridContent />
			<FAQ />
			<div className="h-[40rem] flex items-center justify-center">
				<TextHoverEffect text="DRIVE" />
			</div>
		</main>
	);
};

export default VideoHome;
