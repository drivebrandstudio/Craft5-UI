export interface apiRouteType {
    sectionHandle: string;
    typeHandle: string;
    title: string;
    slug: string;
    uri: string;
    descendants: apiRouteType[];
    level: number;
}