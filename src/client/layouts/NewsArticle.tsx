"use client";

import React from "react";

import { BlogContentWithToc } from "../components/library/BlogWithTOC";

const NewsArticle = ({ data }) => {
	return <BlogContentWithToc blog={data} />;
};

export default NewsArticle;
