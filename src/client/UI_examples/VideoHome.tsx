import React from "react";

import FAQ from "../components/FAQ";
import CtaContent from "../components/library/CtaContent";
import GridContent from "../components/library/GridContent";
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
		</main>
	);
};

export default VideoHome;
