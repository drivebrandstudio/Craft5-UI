export interface NavQueryType {
    navEntries: { entries: ApiRouteType[] }
}

export interface ApiRouteType {
    sectionHandle: string;
    typeHandle: string;
    title: string;
    slug: string;
    uri: string;
    descendants: ApiRouteType[];
    level: number;
}