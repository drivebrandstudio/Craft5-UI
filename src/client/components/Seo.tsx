import * as React from "react";
import Head from "next/head";

type Meta = { content: string; [k: string]: any };

export interface ISeoProps {
  title: string;
  meta: Meta[];
  links: Meta[];
  jsonLd: Meta[];
  description: string;
  social?: {
    facebook?: {
      title: string;
      description: string;
      image: {url: string}
    };
    twitter: {
      title: string;
      description: string;
      image: {url: string}
    }
  }
}

function Seo({ title, description, social }: ISeoProps): JSX.Element {

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:url" content="https://ui.craft5.drivedev.net/"/>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={social?.twitter?.image?.url}/>
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Cannon Mountain"/>
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@cannonmountain" />
	<meta name="twitter:url" content="https://www.cannonmt.com/" />
	<meta name="twitter:title" content={social?.twitter?.title} />
	<meta name="twitter:description" content={social?.twitter?.description} />
	<meta name="twitter:image" content={social?.twitter?.image?.url} />
    </Head>
  );
}

export default Seo;
