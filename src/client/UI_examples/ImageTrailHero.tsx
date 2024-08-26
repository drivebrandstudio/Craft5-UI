"use client";

import React from "react";

import FAQ from "../components/FAQ";
import CtaContent from "../components/library/CtaContent";
import GridContent from "../components/library/GridContent";
import { MouseImageTrail } from "../components/library/MouseImageTrail";

function ImageTrailHero({ data }) {
	return (
		<div className="dark:text-white dark:bg-zinc-800">
			<MouseImageTrail
				response={data.assets}
				renderImageBuffer={200}
				rotationRange={undefined}
			>
				<h1 className="h-screen w-screen text-center content-center">
					whats this?
				</h1>
			</MouseImageTrail>
			<CtaContent />
			<GridContent />
			<FAQ />
		</div>
	);
}

export default ImageTrailHero;
