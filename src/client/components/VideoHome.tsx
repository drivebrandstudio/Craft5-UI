import React from "react";

import FAQ from "./FAQ";
import CtaContent from "./library/CtaContent";
import GridContent from "./library/GridContent";
import VideoHero from "./library/VideoHero";

const VideoHome = () => {
	return (
		<div className="dark:text-white dark:bg-zinc-800">
			{/* Hero component */}
			<VideoHero />
			{/* Content area */}
			<CtaContent />
			<GridContent />
			<FAQ />
		</div>
	);
};

export default VideoHome;
