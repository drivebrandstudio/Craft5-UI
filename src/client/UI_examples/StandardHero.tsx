import React from "react";

import FAQ from "../components/FAQ";
import CtaContent from "../components/library/CtaContent";
import GridContent from "../components/library/GridContent";

const StandardHero = () => {
	return (
		<>
			<section className="dark:text-white dark:bg-zinc-800">
				<div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
					<div className="flex flex-col w-full mb-12 text-center">
						<div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-blue-600 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-10 h-10 icon icon-tabler icon-tabler-aperture"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								></path>
								<circle cx="12" cy="12" r="9"></circle>
								<line x1="3.6" y1="15" x2="14.15" y2="15"></line>
								<line
									x1="3.6"
									y1="15"
									x2="14.15"
									y2="15"
									transform="rotate(72 12 12)"
								></line>
								<line
									x1="3.6"
									y1="15"
									x2="14.15"
									y2="15"
									transform="rotate(144 12 12)"
								></line>
								<line
									x1="3.6"
									y1="15"
									x2="14.15"
									y2="15"
									transform="rotate(216 12 12)"
								></line>
								<line
									x1="3.6"
									y1="15"
									x2="14.15"
									y2="15"
									transform="rotate(288 12 12)"
								></line>
							</svg>
						</div>
						<h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
							Long headline to turn <br className="hidden lg:block" />
							your visitors into users
						</h1>

						<p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
							Free and Premium themes, UI Kit's, templates and landing
							pages built with Tailwind CSS, HTML &amp; Next.js.
						</p>

						<a
							className="mx-auto mt-8 text-sm font-semibold text-blue-600 hover:text-neutral-600"
							title="read more"
						>
							Read more about the offer »
						</a>
					</div>
				</div>
			</section>
			<CtaContent />
			<GridContent />
			<FAQ />
		</>
	);
};

export default StandardHero;
