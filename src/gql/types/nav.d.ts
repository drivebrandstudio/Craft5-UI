export interface NavQueryType {
    entries: ApiRouteType[]
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