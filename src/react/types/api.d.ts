export interface apiRouteType {
    sectionHandle: string;
    typeHandle: string;
    title: string;
    slug: string;
    uri: string;
    children: apiRouteType[];
    level: number;
}