export interface NavQueryType {
    entries: {
        level: number;
        slug: string;
        uri: string;
        typeHandle: string;
        sectionHandle: string;
        title: string;
        children: {
            slug: string;
            uri: string;
            typeHandle: string;
            sectionHandle: string;
            title: string;
        }
    }
}
