import React, { useEffect } from "react";

import videojs from "video.js";

// https://tailwindflex.com/@samuel33/hero-with-video-background

const VideoPlayer = ({
	firstLine,
	secondLine,
}: {
	firstLine: string;
	secondLine: string;
}) => {
	useEffect(() => {
		!!document.getElementById("home-video") && videojs("#home-video");
	}, []);

	return (
		<>
			<video
				id="home-video"
				className="home-video video-js vjs-big-play-centered object-cover object-left-top rounded-lg inset-0 h-full w-full"
				controls="controls"
				preload="auto"
				poster="public/BuildSomethingMeaningful.png"
				data-setup="{}"
			>
				<source src="/public/DriveReel_compressed.mp4" type="video/mp4" />
				<source src="/public/DriveReel_compressed.webm" type="video/webm" />
				<p className="vjs-no-js">
					To view this video please enable JavaScript, and consider
					upgrading to a web browser that
					<a
						href="https://videojs.com/html5-video-support/"
						target="_blank"
					>
						supports HTML5 video
					</a>
				</p>
			</video>
			<span className="line first">{firstLine}</span>
			<span className="line second">{secondLine}</span>
		</>
	);
};

export default VideoPlayer;
