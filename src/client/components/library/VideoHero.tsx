"use client";

import React from "react";

const VideoHero = () => {
	return (
		<section
			className="aspect-square md:aspect-video relative rounded-lg
			flex flex-col items-center 
			justify-center text-center md:mt-[.5em] md:mx-[7%] mb-[3em]
			text-white overflow-hidden"
		>
			<div className="video-docker absolute inset-0 -mx-[40%]">
				<iframe
					className="w-full h-full"
					src="https://www.youtube.com/embed/jJN3amHlaKQ?playsinline=1&autoplay=1&loop=1&rel=0&showinfo=0&mute=1&controls=0&enablejsapi=1&iv_load_policy=3&origin=https%3A%2F%2Fwww.settlersgreen.com&widgetid=1"
					autoPlay
					muted
					loop
				></iframe>
			</div>
			<div className="video-content space-y-2 z-10">
				<h1 className="font-light text-6xl">full Hero Video</h1>
				<h3 className="font-light text-3xl">with TailwindCSS</h3>
			</div>
		</section>
	);
};

export default VideoHero;
