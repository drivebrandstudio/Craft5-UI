"use client";

import React from "react";

import ImageTrailHero from "../UI_examples/ImageTrailHero";
import { ScrollHome } from "../UI_examples/ScrollHome";
import StandardHero from "../UI_examples/StandardHero";
import VideoHome from "../UI_examples/VideoHome";

function Home({ data }) {
	return (
		// <ScrollHome />
		<VideoHome data={data} />
		// <ImageTrailHero data={data} />
		// <StandardHero data={data} />
	);
}

export default Home;
