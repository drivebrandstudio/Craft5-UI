export interface PageEntryTypes {
    entries: {
        id: string;
        uri: string;
    }[]
};

export interface SeoTypes {
    seo: {
        title: string;
        description: string;
        social: {
            twitter: {
                title: string;
                description: string;
                image: {
                    url: string;
                }[];
            };
            facebook: {
                title: string;
                description: string;
                image: {
                    url: string;
                }[];
            }
        }
    }
}

export interface BlogsTypes {
    summary: string;
    thumbnail: { url: string; }[];
    title: string;
    date: string;
    articleContent: {
        summary: string;
        id: string;
        articleText: string;
    }
}