export interface ApiRouteType {
    sectionHandle: string;
    typeHandle: string;
    title: string;
    slug: string;
    uri: string;
    descendants: apiRouteType[];
    level: number;
}