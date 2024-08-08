"use client";

import React from "react";

import { cn } from "../utils/cn";

// Not all loading screens should take up 100% height (EG. weather widget)
const Loading = ({ fullScreen }: { fullScreen?: boolean }) => {
	return (
		<section
			className={cn(
				"flex justify-center items-center",
				fullScreen && "h-screen "
			)}
		>
			<div className="loadingContainer">
				<div className="ring"></div>
				<div className="ball-context-layer ball-context-layer--1">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--2">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--3">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--4">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--5">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--6">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--7">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--8">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--9">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
				<div className="ball-context-layer ball-context-layer--10">
					<div className="ball-container">
						<div className="ball"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Loading;
